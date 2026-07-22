import fs from "fs";
import path from "path";

export interface PushSubscriptionKeys {
  p256dh: string;
  auth: string;
}

export interface PushSubscriptionItem {
  endpoint: string;
  expirationTime?: number | null;
  keys: PushSubscriptionKeys;
  subscribedAt: string;
}

const FILE_PATH = path.join("/tmp", "kpr_push_subscriptions.json");

// Helper to ensure file exists and read it
function readLocalSubscriptions(): PushSubscriptionItem[] {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data) as PushSubscriptionItem[];
  } catch (error) {
    console.error("Failed to read push subscriptions from file:", error);
    return [];
  }
}

// Helper to write to file
function writeLocalSubscriptions(subscriptions: PushSubscriptionItem[]): void {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(subscriptions, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write push subscriptions to file:", error);
  }
}

export async function addSubscription(sub: Omit<PushSubscriptionItem, "subscribedAt">): Promise<void> {
  const newItem: PushSubscriptionItem = {
    ...sub,
    subscribedAt: new Date().toISOString()
  };

  // 1. Save locally (always fallback)
  const localList = readLocalSubscriptions();
  const filteredList = localList.filter((item) => item.endpoint !== sub.endpoint);
  filteredList.push(newItem);
  writeLocalSubscriptions(filteredList);

  // 2. Try Supabase if configured
  try {
    const { supabase } = await import("@/lib/supabase");
    if (
      supabase &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
    ) {
      // Check if table exists by trying to insert. If table doesn't exist, it will fail gracefully.
      const { error } = await supabase
        .from("kpr_push_subscriptions")
        .upsert([{ 
          endpoint: newItem.endpoint,
          keys: newItem.keys,
          subscribed_at: newItem.subscribedAt
        }], { onConflict: "endpoint" });

      if (error) {
        console.warn("Supabase push subscription insert skipped or failed:", error.message);
      }
    }
  } catch (error) {
    console.warn("Supabase import or save skipped for push subscription:", error);
  }
}

export async function removeSubscription(endpoint: string): Promise<void> {
  // 1. Remove locally
  const localList = readLocalSubscriptions();
  const filteredList = localList.filter((item) => item.endpoint !== endpoint);
  writeLocalSubscriptions(filteredList);

  // 2. Try Supabase if configured
  try {
    const { supabase } = await import("@/lib/supabase");
    if (
      supabase &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
    ) {
      const { error } = await supabase
        .from("kpr_push_subscriptions")
        .delete()
        .eq("endpoint", endpoint);

      if (error) {
        console.warn("Supabase push subscription delete failed:", error.message);
      }
    }
  } catch (error) {
    console.warn("Supabase delete skipped for push subscription:", error);
  }
}

export async function getSubscriptions(): Promise<PushSubscriptionItem[]> {
  // 1. Read locally as baseline
  let subscriptions = readLocalSubscriptions();

  // 2. If Supabase is configured, we can merge or fetch from Supabase to stay updated
  try {
    const { supabase } = await import("@/lib/supabase");
    if (
      supabase &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
    ) {
      const { data, error } = await supabase
        .from("kpr_push_subscriptions")
        .select("*");

      if (!error && data) {
        // Map database fields to our item type
        const dbSubscriptions: PushSubscriptionItem[] = (data as Array<{
          endpoint: string;
          keys: PushSubscriptionKeys;
          subscribed_at?: string;
        }>).map((row) => ({
          endpoint: row.endpoint,
          keys: row.keys,
          subscribedAt: row.subscribed_at || new Date().toISOString()
        }));

        // Merge keeping unique endpoints
        const mergedMap = new Map<string, PushSubscriptionItem>();
        subscriptions.forEach(item => mergedMap.set(item.endpoint, item));
        dbSubscriptions.forEach(item => mergedMap.set(item.endpoint, item));
        
        subscriptions = Array.from(mergedMap.values());
        writeLocalSubscriptions(subscriptions); // Sync back locally
      }
    }
  } catch (error) {
    console.warn("Supabase sync skipped for push subscriptions:", error);
  }

  return subscriptions;
}

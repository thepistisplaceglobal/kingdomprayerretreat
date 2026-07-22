import fs from "fs";
import path from "path";

export interface PartnershipCommitment {
  id: string;
  name: string;
  email: string;
  phone: string;
  currency: "NGN" | "USD" | "EUR";
  tier: string;
  amountRange: string;
  reminderFrequency: "weekly" | "monthly" | "one-time";
  reminderChannel: "email" | "sms" | "whatsapp";
  createdAt: string;
}

const FILE_PATH = path.join("/tmp", "kpr_partnership_commitments.json");

function readLocalPartnerships(): PartnershipCommitment[] {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    return JSON.parse(data) as PartnershipCommitment[];
  } catch (error) {
    console.error("Failed to read partnerships from file:", error);
    return [];
  }
}

function writeLocalPartnerships(partnerships: PartnershipCommitment[]): void {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(partnerships, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed to write partnerships to file:", error);
  }
}

export async function addPartnership(partnership: Omit<PartnershipCommitment, "id" | "createdAt">): Promise<PartnershipCommitment> {
  const newCommitment: PartnershipCommitment = {
    ...partnership,
    id: Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString()
  };

  const localList = readLocalPartnerships();
  localList.push(newCommitment);
  writeLocalPartnerships(localList);

  // Try Supabase if configured
  try {
    const { supabase } = await import("@/lib/supabase");
    if (
      supabase &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
    ) {
      const { error } = await supabase
        .from("kpr_partnerships")
        .insert([{ 
          id: newCommitment.id,
          name: newCommitment.name,
          email: newCommitment.email,
          phone: newCommitment.phone,
          currency: newCommitment.currency,
          tier: newCommitment.tier,
          amount_range: newCommitment.amountRange,
          reminder_frequency: newCommitment.reminderFrequency,
          reminder_channel: newCommitment.reminderChannel,
          created_at: newCommitment.createdAt
        }]);

      if (error) {
        console.warn("Supabase partnership insert skipped or failed:", error.message);
      }
    }
  } catch (error) {
    console.warn("Supabase insert skipped for partnership:", error);
  }

  return newCommitment;
}

export async function getPartnerships(): Promise<PartnershipCommitment[]> {
  let partnerships = readLocalPartnerships();

  try {
    const { supabase } = await import("@/lib/supabase");
    if (
      supabase &&
      process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://placeholder.supabase.co"
    ) {
      const { data, error } = await supabase
        .from("kpr_partnerships")
        .select("*");

      if (!error && data) {
        const dbPartnerships: PartnershipCommitment[] = (data as Array<{
          id: string;
          name: string;
          email: string;
          phone: string;
          currency: string;
          tier: string;
          amount_range: string;
          reminder_frequency: string;
          reminder_channel: string;
          created_at?: string;
        }>).map((row) => ({
          id: row.id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          currency: row.currency as "NGN" | "USD" | "EUR",
          tier: row.tier,
          amountRange: row.amount_range,
          reminderFrequency: row.reminder_frequency as "weekly" | "monthly" | "one-time",
          reminderChannel: row.reminder_channel as "email" | "sms" | "whatsapp",
          createdAt: row.created_at || new Date().toISOString()
        }));

        const mergedMap = new Map<string, PartnershipCommitment>();
        partnerships.forEach(item => mergedMap.set(item.id, item));
        dbPartnerships.forEach(item => mergedMap.set(item.id, item));
        
        partnerships = Array.from(mergedMap.values());
        writeLocalPartnerships(partnerships);
      }
    }
  } catch (error) {
    console.warn("Supabase sync skipped for partnerships:", error);
  }

  return partnerships;
}

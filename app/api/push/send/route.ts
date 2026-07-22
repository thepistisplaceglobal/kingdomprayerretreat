import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { getSubscriptions, removeSubscription } from "@/lib/subscription-store";

// Use environment variables or our pre-generated robust fallback keys
const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "BJad0XkSxJp14zJ16ZXD6hFkaUQQYTS3UJMetL20idfzumg09lGTglSKbxKn-HwqV8bDgmir77nA47ryki--N2I";
const privateKey = process.env.VAPID_PRIVATE_KEY || "FQVNtUkvjaVtMZLknTaB_Dfzk1jmaP-8Wy4rqGnDzA4";
const subject = process.env.VAPID_SUBJECT || "mailto:pistisglobal@gmail.com";

try {
  webpush.setVapidDetails(subject, publicKey, privateKey);
} catch (err) {
  console.error("Error setting VAPID details:", err);
}

export async function POST(req: NextRequest) {
  try {
    const { title, body, url, adminCode } = await req.json();

    if (!title || !body) {
      return NextResponse.json(
        { error: "Title and Body are required fields" },
        { status: 400 }
      );
    }

    // Optional admin verification code to prevent unauthorized spamming
    const expectedAdminCode = process.env.KPR_ADMIN_CODE || "kpr2026";
    if (adminCode && adminCode !== expectedAdminCode) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid Organizer Code" },
        { status: 401 }
      );
    }

    const subscriptions = await getSubscriptions();
    
    if (subscriptions.length === 0) {
      return NextResponse.json({
        success: true,
        sentCount: 0,
        message: "No active push notification subscriptions found."
      });
    }

    const payload = JSON.stringify({
      title,
      body,
      url: url || "/KPR",
      icon: "/KPR_logo.png",
      badge: "/KPR_logo.png"
    });

    let successCount = 0;
    let failedCount = 0;

    const sendPromises = subscriptions.map(async (sub) => {
      try {
        await webpush.sendNotification({
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.keys.p256dh,
            auth: sub.keys.auth
          }
        }, payload);
        successCount++;
      } catch (err: unknown) {
        failedCount++;
        const pushErr = err as { statusCode?: number; message?: string };
        // Remove subscription if expired or inactive (status 410 or 404)
        if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
          console.log(`Subscription has expired or is no longer valid, deleting endpoint: ${sub.endpoint}`);
          await removeSubscription(sub.endpoint);
        } else {
          console.error(`Error delivering push to endpoint ${sub.endpoint}:`, pushErr.message || pushErr);
        }
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json({
      success: true,
      message: `Notifications processed. Sent: ${successCount}, Failed/Cleaned: ${failedCount}`,
      sentCount: successCount,
      totalCount: subscriptions.length
    });
  } catch (error: unknown) {
    console.error("Error in push send API:", error);
    const errObj = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: errObj.message },
      { status: 500 }
    );
  }
}

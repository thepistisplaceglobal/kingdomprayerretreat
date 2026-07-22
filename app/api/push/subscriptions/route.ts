import { NextResponse } from "next/server";
import { getSubscriptions } from "@/lib/subscription-store";

export async function GET() {
  try {
    const subscriptions = await getSubscriptions();
    return NextResponse.json({
      count: subscriptions.length
    });
  } catch (error: unknown) {
    console.error("Error in get subscriptions count API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

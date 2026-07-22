import { NextRequest, NextResponse } from "next/server";
import { addSubscription, removeSubscription } from "@/lib/subscription-store";

export async function POST(req: NextRequest) {
  try {
    const subscription = await req.json();
    
    if (!subscription || !subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: "Invalid subscription payload" },
        { status: 400 }
      );
    }

    await addSubscription(subscription);
    return NextResponse.json({ success: true, message: "Subscription added successfully" });
  } catch (error: unknown) {
    console.error("Error in subscribe POST API:", error);
    const errObj = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: errObj.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { endpoint } = await req.json();
    
    if (!endpoint) {
      return NextResponse.json(
        { error: "Endpoint is required for unsubscription" },
        { status: 400 }
      );
    }

    await removeSubscription(endpoint);
    return NextResponse.json({ success: true, message: "Subscription removed successfully" });
  } catch (error: unknown) {
    console.error("Error in subscribe DELETE API:", error);
    const errObj = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: errObj.message },
      { status: 500 }
    );
  }
}

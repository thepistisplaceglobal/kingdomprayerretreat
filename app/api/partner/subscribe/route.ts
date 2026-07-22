import { NextRequest, NextResponse } from "next/server";
import { addPartnership } from "@/lib/partner-store";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, currency, tier, amountRange, reminderFrequency, reminderChannel } = body;

    if (!name || !email || !currency || !tier || !reminderFrequency || !reminderChannel) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const commitment = await addPartnership({
      name,
      email,
      phone: phone || "",
      currency,
      tier,
      amountRange: amountRange || "",
      reminderFrequency,
      reminderChannel
    });

    return NextResponse.json({
      success: true,
      message: "Partnership commitment saved successfully!",
      commitment
    });
  } catch (error: unknown) {
    console.error("Error in partner subscription API:", error);
    const errObj = error as Error;
    return NextResponse.json(
      { error: "Internal server error", details: errObj.message },
      { status: 500 }
    );
  }
}

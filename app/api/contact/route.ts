import { NextResponse } from "next/server";
import { Resend } from "resend";

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY || "mock-key-for-build";
    resendClient = new Resend(apiKey);
  }
  return resendClient;
}

const OWNER_EMAIL = "pistisglobal@gmail.com";
const FROM = "The Pistis Place Global <noreply@thepistisplaceglobal.org>";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Save to Supabase if credentials are configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("placeholder")) {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { error: dbError } = await supabase
         .from("contact_submissions")
         .insert([{ name, email, phone, subject, message }]);
      if (dbError) console.error("Supabase insert error:", dbError);
    }

    const submittedAt = new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
      dateStyle: "full",
      timeStyle: "short",
    });

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Mocking success.");
      return NextResponse.json({ success: true, mocked: true }, { status: 200 });
    }

    const resend = getResendClient();

    // Notify owner
    const { error: ownerEmailError } = await resend.emails.send({
      from: FROM,
      to: [OWNER_EMAIL],
      subject: `New Inquiry: ${subject}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e5e7eb; border-radius: 8px;">
          <h2 style="color: #300460; margin-top: 0;">New Contact Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #6b7280; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #300460;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>
            <tr><td style="padding: 8px 0; color: #6b7280;">Submitted</td><td style="padding: 8px 0;">${submittedAt}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #f9fafb; border-radius: 6px;">
            <p style="color: #6b7280; margin: 0 0 8px; font-size: 13px;">MESSAGE</p>
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    if (ownerEmailError) {
      console.error("Owner notification email error:", ownerEmailError);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    // Confirmation to submitter — non-fatal if it fails
    const { error: confirmEmailError } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: "We received your message — The Pistis Place Global",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #300460;">Hi ${name},</h2>
          <p>Thank you for reaching out to us. We have received your message and will get back to you shortly.</p>
          <p style="color: #6b7280; font-size: 13px;">Your inquiry: <em>${subject}</em></p>
          <br />
          <p>Blessings,<br /><strong>The Pistis Place Global</strong></p>
        </div>
      `,
    });

    if (confirmEmailError) {
      console.error("Confirmation email error:", confirmEmailError);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

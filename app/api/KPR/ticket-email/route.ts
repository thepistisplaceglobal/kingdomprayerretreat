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

const FROM = "The Pistis Place Global <noreply@thepistisplaceglobal.org>";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { ticket } = body;

    if (!ticket || !ticket.email || !ticket.fullName || !ticket.id) {
      return NextResponse.json(
        { error: "Invalid ticket details" },
        { status: 400 }
      );
    }

    const { id, email, fullName, phone, joiningMode, residence, accommodation, tshirt } = ticket;

    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is missing. Mocking email delivery success.");
      return NextResponse.json({ success: true, mocked: true }, { status: 200 });
    }

    const resend = getResendClient();

    // Send beautiful official pass email to the user
    const { error: emailError } = await resend.emails.send({
      from: FROM,
      to: [email],
      subject: `Your KPR 2026 Official Entry Pass [ID: ${id}]`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #06040b; color: #ffffff; padding: 40px 20px; text-align: center; margin: 0 auto; max-width: 600px; border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
          <!-- Logo / Header -->
          <div style="margin-bottom: 30px;">
            <p style="color: #F21449; font-size: 11px; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 8px 0;">Official Entry Pass</p>
            <h2 style="font-size: 24px; font-weight: 900; color: #ffffff; margin: 0; letter-spacing: -0.02em; text-transform: uppercase;">Kingdom Prayer Retreat 2026</h2>
            <div style="width: 50px; height: 3px; background-color: #F21449; margin: 15px auto 0 auto; border-radius: 2px;"></div>
          </div>

          <div style="background-color: #0b0813; border: 1px solid rgba(242, 20, 73, 0.3); border-radius: 20px; padding: 30px; margin-bottom: 30px; text-align: left;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 15px; margin-bottom: 20px;">
              <span style="font-size: 11px; color: #F21449; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase;">Delegate Pass</span>
              <span style="font-size: 11px; background-color: rgba(242, 20, 73, 0.1); border: 1px solid rgba(242, 20, 73, 0.3); color: #F21449; padding: 3px 10px; border-radius: 999px; font-weight: bold;">KPR 2026</span>
            </div>

            <!-- Attendee Info -->
            <div style="margin-bottom: 20px;">
              <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 5px 0; font-weight: bold;">Attendee Name</p>
              <p style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.01em;">${fullName}</p>
            </div>

            <!-- Pass ID -->
            <div style="margin-bottom: 20px; background-color: rgba(255,255,255,0.02); padding: 12px 16px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
              <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 3px 0; font-weight: bold;">Pass Reference ID</p>
              <p style="font-family: monospace; font-size: 18px; font-weight: bold; color: #ffffff; margin: 0; letter-spacing: 0.1em;">${id}</p>
            </div>

            <!-- Grid details -->
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 15px;">
              <tr>
                <td style="padding: 8px 0; width: 50%;">
                  <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 3px 0; font-weight: bold;">Joining Mode</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 600; margin: 0;">${joiningMode}</p>
                </td>
                <td style="padding: 8px 0; width: 50%;">
                  <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 3px 0; font-weight: bold;">Residence Location</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 600; margin: 0;">${residence || "N/A"}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; width: 50%;">
                  <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 3px 0; font-weight: bold;">Accommodation</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 500; margin: 0;">${accommodation}</p>
                </td>
                <td style="padding: 8px 0; width: 50%;">
                  <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 3px 0; font-weight: bold;">T-Shirt Preference</p>
                  <p style="color: #F21449; font-size: 13px; font-weight: bold; margin: 0;">${tshirt}</p>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; width: 50%;">
                  <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 3px 0; font-weight: bold;">Contact Phone</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 600; margin: 0;">${phone}</p>
                </td>
                <td style="padding: 8px 0; width: 50%;">
                  <p style="color: rgba(255, 255, 255, 0.4); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 3px 0; font-weight: bold;">Retreat Dates</p>
                  <p style="color: #ffffff; font-size: 13px; font-weight: 600; margin: 0;">Aug 7 - 9, 2026</p>
                </td>
              </tr>
            </table>

            <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 15px; margin-top: 15px; text-align: center;">
              <p style="color: rgba(255,255,255,0.3); font-size: 9px; text-transform: uppercase; letter-spacing: 0.2em; margin: 0;">Validated KPR Delegate • Present at check-in</p>
            </div>
          </div>

          <p style="font-size: 14px; color: rgba(255, 255, 255, 0.6); line-height: 1.6; margin: 0 0 20px 0;">
            Hallelujah! Your registration is complete. Keep this email safe as your digital gate pass. 
            We look forward to birthing convictions and experiencing soul-transforming encounters together.
          </p>

          <p style="font-size: 12px; color: rgba(255, 255, 255, 0.4); margin: 30px 0 0 0;">
            Blessings,<br />
            <strong>The Pistis Place Global</strong><br />
            <a href="https://thepistisplace.org" style="color: #F21449; text-decoration: none;">thepistisplace.org</a>
          </p>
        </div>
      `,
    });

    if (emailError) {
      console.error("Resend error sending KPR ticket email:", emailError);
      return NextResponse.json(
        { error: "Failed to send entry pass email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("KPR Ticket Email API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

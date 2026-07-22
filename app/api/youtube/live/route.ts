import { NextRequest, NextResponse } from "next/server";

const CHANNEL_ID = "UCLOXg0upYF2qp87cgOyyu6g";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const forceLive = searchParams.get("forceLive") === "true";

    // 1. Check if manually forced for review/testing
    if (forceLive) {
      return NextResponse.json({
        isLive: true,
        title: "KPR 2026 Live Broadcast - Midday Prayers",
        videoId: "dQw4w9WgXcQ", // Placeholder for actual video ID
        forced: true,
      });
    }

    // 2. Check via YouTube API if the key exists
    const apiKey = process.env.YOUTUBE_API_KEY || process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;
    if (apiKey) {
      try {
        const liveResponse = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet&eventType=live&type=video&maxResults=1`,
          { next: { revalidate: 60 } } // Cache for 1 minute
        );

        if (liveResponse.ok) {
          const liveData = await liveResponse.json();
          if (liveData.items && liveData.items.length > 0) {
            const liveItem = liveData.items[0];
            return NextResponse.json({
              isLive: true,
              title: liveItem.snippet?.title || "Live Broadcast",
              videoId: liveItem.id?.videoId,
            });
          }
        }
      } catch (err) {
        console.error("YouTube API live status check failed:", err);
      }
    }

    // 3. Timezone-aware fallback (Nigeria/West Africa Time is UTC+1)
    // Sunday: 8:30 AM - 12:30 PM WAT (Sunday service)
    // Wednesday: 5:30 PM - 7:30 PM WAT (Midweek service)
    // Friday: 5:00 PM - 7:00 PM WAT (Power prayers)
    const now = new Date();
    // Convert current UTC time to West Africa Time (UTC+1)
    const watTime = new Date(now.getTime() + (1 * 60 * 60 * 1000));
    
    const day = watTime.getUTCDay(); // 0: Sunday, 1: Monday, ..., 3: Wednesday, 5: Friday
    const hours = watTime.getUTCHours();
    const minutes = watTime.getUTCMinutes();
    const timeInDecimal = hours + minutes / 60;

    let isLiveBySchedule = false;
    let scheduledTitle = "The Pistis Place Live Service";

    if (day === 0) { // Sunday
      if (timeInDecimal >= 8.5 && timeInDecimal <= 12.5) {
        isLiveBySchedule = true;
        scheduledTitle = "Sunday Worship & Anointing Service - Live";
      }
    } else if (day === 3) { // Wednesday
      if (timeInDecimal >= 17.5 && timeInDecimal <= 19.5) {
        isLiveBySchedule = true;
        scheduledTitle = "Midweek Communion & Word Encounter - Live";
      }
    } else if (day === 5) { // Friday
      if (timeInDecimal >= 17.0 && timeInDecimal <= 19.0) {
        isLiveBySchedule = true;
        scheduledTitle = "Friday Prophetic Prayer Altar - Live";
      }
    }

    return NextResponse.json({
      isLive: isLiveBySchedule,
      title: isLiveBySchedule ? scheduledTitle : "No ongoing service",
      videoId: isLiveBySchedule ? "live" : null,
      scheduled: true,
    });
  } catch (error) {
    console.error("Error in live-status route:", error);
    return NextResponse.json({ isLive: false, error: "Internal server error" }, { status: 500 });
  }
}

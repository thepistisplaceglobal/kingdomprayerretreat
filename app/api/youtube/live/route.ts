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

    // 3. Timezone-aware schedule information (Nigeria/West Africa Time is UTC+1)
    const now = new Date();
    const watTime = new Date(now.getTime() + (1 * 60 * 60 * 1000));
    const day = watTime.getUTCDay();

    let scheduledTitle = "The Pistis Place Live Service";
    if (day === 0) {
      scheduledTitle = "Sunday Worship & Anointing Service";
    } else if (day === 3) {
      scheduledTitle = "Midweek Communion & Word Encounter";
    } else if (day === 5) {
      scheduledTitle = "Friday Prophetic Prayer Altar";
    }

    // Only mark isLive as true if explicitly verified by API or forced. Otherwise return false so the header badge does not pulse falsely.
    return NextResponse.json({
      isLive: false,
      title: scheduledTitle,
      videoId: null,
      scheduledTitle,
    });
  } catch (error) {
    console.error("Error in live-status route:", error);
    return NextResponse.json({ isLive: false, error: "Internal server error" }, { status: 500 });
  }
}

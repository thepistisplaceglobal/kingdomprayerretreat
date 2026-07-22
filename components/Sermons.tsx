"use client";

import { useState, useEffect, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Play, Video, Headphones, X } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  TextReveal,
} from "@/components/Animations";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  isLive?: boolean;
  videoId: string;
}

interface YouTubeApiResponse {
  items: Array<{
    id: {
      videoId: string;
    };
    snippet: {
      title: string;
      description: string;
      thumbnails: {
        high: {
          url: string;
        };
      };
      publishedAt: string;
    };
  }>;
}

export const Sermon = memo(function Sermon() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  // YouTube channel ID for @thepistisplaceglobal
  const CHANNEL_ID = "UCLOXg0upYF2qp87cgOyyu6g"; // You'll need to get the actual channel ID
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchYouTubeVideos = async () => {
    if (!API_KEY) {
      setError("YouTube API key not configured");
      setLoading(false);
      return;
    }

    try {
      // Fetch recent videos from the channel
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=20&type=video`,
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("YouTube Search Error:", errorData);
        throw new Error("Failed to fetch videos");
      }

      const data: YouTubeApiResponse = await response.json();

      // Check for live videos
      const liveResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&eventType=live&type=video&maxResults=1`,
      );

      let liveVideo: YouTubeVideo | null = null;
      if (liveResponse.ok) {
        const liveData: YouTubeApiResponse = await liveResponse.json();
        if (liveData.items.length > 0) {
          const live = liveData.items[0];
          liveVideo = {
            id: live.id.videoId,
            title: live.snippet.title,
            description: live.snippet.description,
            thumbnail: live.snippet.thumbnails.high.url,
            publishedAt: live.snippet.publishedAt,
            isLive: true,
            videoId: live.id.videoId,
          };
        }
      }

      // Convert API response to our video format
      const videoList: YouTubeVideo[] = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        isLive: false,
        videoId: item.id.videoId,
      }));

      // Set featured video (live video if available, otherwise most recent)
      const featured = liveVideo || videoList[0];
      setFeaturedVideo(featured);

      // Remove featured video from the list and shuffle the remaining videos
      const remainingVideos = videoList.filter(
        (video) => video.id !== featured?.id,
      );
      const shuffledVideos = shuffleArray(remainingVideos).slice(0, 6); // Show 6 recent videos

      setVideos(shuffledVideos);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
      setError("Failed to load sermons");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYouTubeVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const watchVideo = (video: YouTubeVideo) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <p className="text-[#F21449] font-semibold text-base sm:text-lg">
              Latest Teachings
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Recent Sermons
            </h2>
            {/* Purple underline accent */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-1 sm:h-1.5 md:h-2 w-12 sm:w-16 md:w-20 bg-[#F21449] rounded-full" />
              <div className="h-1 sm:h-1.5 md:h-2 w-6 sm:w-8 md:w-10 bg-[#F21449]/80 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-2 sm:space-y-3 md:space-y-4">
            <p className="text-[#F21449] font-semibold text-base sm:text-lg">
              Latest Teachings
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Recent Sermons
            </h2>
            {/* Purple underline accent */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-1 sm:h-1.5 md:h-2 w-12 sm:w-16 md:w-20 bg-[#F21449] rounded-full" />
              <div className="h-1 sm:h-1.5 md:h-2 w-6 sm:w-8 md:w-10 bg-[#F21449]/80 rounded-full" />
            </div>
          </div>
          <div className="text-center text-white/80">
            <p className="text-base sm:text-lg md:text-xl">{error}</p>
            <button
              onClick={fetchYouTubeVideos}
              className="mt-4 px-6 sm:px-8 md:px-10 py-2 sm:py-3 md:py-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors text-sm sm:text-base md:text-lg"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        {/* Header with decorative lines */}
        <FadeIn delay={0.2}>
          <div className="space-y-2 sm:space-y-3 md:space-y-4 my-5 sm:my-8 md:my-10">
            <TextReveal delay={0.1}>
              <p className="text-[#F21449] font-semibold text-base sm:text-lg md:text-xl lg:text-2xl">
                Latest Teachings
              </p>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white">
                Recent Sermons
              </h2>
            </TextReveal>
            {/* Purple underline accent */}
            <FadeIn delay={0.3} direction="left" distance={50}>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="h-1 sm:h-1.5 md:h-2 w-12 sm:w-16 md:w-20 bg-[#F21449] rounded-full" />
                <div className="h-1 sm:h-1.5 md:h-2 w-6 sm:w-8 md:w-10 bg-[#F21449]/80 rounded-full" />
              </div>
            </FadeIn>
          </div>
        </FadeIn>

        <div className="max-w-7xl mx-auto mt-5 sm:mt-8 md:mt-10">
          {/* Featured sermon */}
          {featuredVideo && (
            <StaggerContainer delay={0.1}>
              <StaggerItem>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 mb-12 sm:mb-16 md:mb-20">
                  <HoverScale scale={1.02}>
                    <div className="relative rounded-3xl overflow-hidden aspect-video cursor-pointer group">
                      <Image
                        src={featuredVideo.thumbnail || "/placeholder.svg"}
                        alt={featuredVideo.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                        quality={70}
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <button
                          onClick={() => watchVideo(featuredVideo)}
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors group-hover:scale-110"
                        >
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6 text-white fill-white" />
                        </button>
                      </div>
                      {featuredVideo.isLive && (
                        <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 bg-red-600 text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm md:text-base font-semibold">
                          🔴 LIVE
                        </div>
                      )}
                    </div>
                  </HoverScale>

                  <div className="flex flex-col justify-center">
                    <div className="inline-block bg-white/20 px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 max-w-fit rounded-full text-white/80 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6">
                      {featuredVideo.isLive ? "Live Now" : "Featured"}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 line-clamp-2">
                      {featuredVideo.title}
                    </h3>
                    <p className="text-white/80 mb-4 sm:mb-6 md:mb-8 line-clamp-3 text-sm sm:text-base md:text-lg lg:text-xl">
                      {featuredVideo.description.length > 200
                        ? `${featuredVideo.description.substring(0, 200)}...`
                        : featuredVideo.description}
                    </p>

                    <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8">
                      <button
                        onClick={() => watchVideo(featuredVideo)}
                        className="flex items-center gap-2 hover:bg-white/5 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg transition-colors"
                      >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <Video className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white/70" />
                        </div>
                        <span className="text-white/80 cursor-pointer text-xs sm:text-sm md:text-base">
                          Watch
                        </span>
                      </button>
                      <button
                        onClick={() => watchVideo(featuredVideo)}
                        className="flex items-center gap-2 hover:bg-white/5 px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg transition-colors"
                      >
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-white/5 flex items-center justify-center">
                          <Headphones className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white/70" />
                        </div>
                        <span className="text-white/80 cursor-pointer text-xs sm:text-sm md:text-base">
                          Listen
                        </span>
                      </button>
                    </div>

                    <p className="text-white/60 text-xs sm:text-sm md:text-base lg:text-lg">
                      {formatDate(featuredVideo.publishedAt)}
                      {featuredVideo.isLive
                        ? " • Live Stream"
                        : " • Sunday Service"}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            </StaggerContainer>
          )}

          {/* Recent sermons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 mb-8 sm:mb-12 md:mb-16">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-[#141414] rounded-2xl overflow-hidden group cursor-pointer"
              >
                <div
                  className="relative aspect-video"
                  onClick={() => watchVideo(video)}
                >
                  <Image
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white fill-white" />
                    </button>
                  </div>
                </div>

                <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 md:mb-4 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm md:text-base mb-3 sm:mb-4 md:mb-6 line-clamp-2">
                    {video.description.length > 100
                      ? `${video.description.substring(0, 100)}...`
                      : video.description}
                  </p>
                  <p className="text-white/60 text-xs sm:text-sm md:text-base">
                    {formatDate(video.publishedAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* View all sermons button */}
          <div className="flex justify-center">
            <Link
              href="https://www.youtube.com/@thepistisplaceglobal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 md:py-5 bg-[#F21449] hover:bg-[#F21449]/80 text-white rounded-lg transition-colors hover:shadow-lg hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg lg:text-xl"
            >
              <span className="text-white/90">View All Sermons</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-6xl aspect-video">
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
              className="w-full h-full rounded-lg"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={selectedVideo.title}
            />
          </div>
        </div>
      )}
    </>
  );
});

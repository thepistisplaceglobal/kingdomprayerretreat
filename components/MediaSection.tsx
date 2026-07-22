"use client";

import { useState, useEffect, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Play, X, Youtube, Send, Music } from "lucide-react";
import {
  FadeIn,
  StaggerContainer,
  StaggerItem,
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

const mediaChannels = [
  {
    icon: <Youtube className="w-6 h-6 text-red-600" />,
    title: "Missed a Sermon?",
    subtitle: "Watch it here. Lessons that can change your life.",
    category: "The Pistis Place Global",
    link: "https://www.youtube.com/@thepistisplaceglobal",
  },
  {
    icon: <Send className="w-6 h-6 text-blue-400" />,
    title: "SUNDAY SERMONS",
    subtitle: "PST. Japheth Joseph",
    category: "Lessons that will transform your life",
    link: "https://t.me/thepistisplaceglobal",
  },
  {
    icon: <Youtube className="w-6 h-6 text-red-600" />,
    title: "STREAM KPR Sessions",
    subtitle: "KPR 2026 - Coming soon!",
    category: "KPR 2026",
    link: "https://www.youtube.com/@thepistisplaceglobal",
  },
  {
    icon: <Music className="w-6 h-6 text-green-500" />,
    title: "Audio Messages",
    subtitle: "PST. Japheth Joseph",
    category: "Audio Messages to listen on the go",
    link: "https://open.spotify.com/show/your_spotify_id",
  },
];

export const MediaSection = memo(function MediaSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);

  const CHANNEL_ID = "UCLOXg0upYF2qp87cgOyyu6g";
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const fetchYouTubeVideos = async () => {
    if (!API_KEY) {
      setError("YouTube API key not configured");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=10&type=video`,
      );

      if (!response.ok) throw new Error("Failed to fetch videos");
      const data: YouTubeApiResponse = await response.json();

      const videoList: YouTubeVideo[] = data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high.url,
        publishedAt: item.snippet.publishedAt,
        videoId: item.id.videoId,
      }));

      setFeaturedVideo(videoList[0]);
      setVideos(videoList.slice(1, 4));
      setLoading(false);
    } catch (err) {
      console.error("Error loading YouTube videos in MediaSection:", err);
      setError("Failed to load sermons");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchYouTubeVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const watchVideo = (video: YouTubeVideo) => setSelectedVideo(video);
  const closeVideo = () => setSelectedVideo(null);

  return (
    <section className="w-full bg-[#0D1216] py-16 md:py-24 px-4 sm:px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <FadeIn delay={0.2} direction="down">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-5 md:mb-12 bricolage uppercase tracking-tight">
            Access Our Media & <br />
            Sermons
          </h2>
        </FadeIn>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center mb-6 text-xs max-w-md">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Media Channels */}
          <div className="lg:col-span-5 space-y-4">
            <StaggerContainer delay={0.1}>
              {mediaChannels.map((channel, idx) => (
                <StaggerItem key={idx}>
                  <Link href={channel.link} target="_blank">
                    <div className="flex my-3 items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        {channel.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-xs md:text-sm tracking-wide">
                          {channel.title}
                        </h4>
                        <p className="text-white/40 text-[10px] md:text-xs uppercase mt-0.5">
                          {channel.subtitle}
                        </p>
                        <p className="text-white/60 text-[10px] md:text-xs mt-1 truncate italic">
                          {channel.category}
                        </p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right Column: Video Grid */}
          <div className="lg:col-span-7 space-y-6">
            {loading ? (
              <div className="aspect-video bg-white/5 animate-pulse rounded-3xl" />
            ) : featuredVideo ? (
              <FadeIn delay={0.4}>
                <div className="relative group cursor-pointer overflow-hidden rounded-3xl aspect-video">
                  <Image
                    src={featuredVideo.thumbnail}
                    alt={featuredVideo.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20" />

                  {/* Glassmorphism Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-sm">
                    <p className="text-white/60 text-[10px] uppercase font-bold tracking-widest mb-1">
                      Latest Video
                    </p>
                    <h3 className="text-white text-xl font-bold mb-4 line-clamp-1 bricolage">
                      {featuredVideo.title}
                    </h3>
                    <button
                      onClick={() => watchVideo(featuredVideo)}
                      className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/20 text-white text-sm font-semibold border border-white/30 hover:bg-white hover:text-black transition-all"
                    >
                      Watch
                    </button>
                  </div>
                </div>
              </FadeIn>
            ) : null}

            {/* Small Boxes Overlay/Grid */}
            <div className="grid grid-cols-3 gap-4">
              {loading
                ? [1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-video bg-white/5 animate-pulse rounded-2xl"
                    />
                  ))
                : videos.map((video, idx) => (
                    <FadeIn key={idx} delay={0.6 + idx * 0.1}>
                      <div
                        onClick={() => watchVideo(video)}
                        className="relative aspect-video rounded-2xl overflow-hidden cursor-pointer group"
                      >
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <Play className="w-6 h-6 text-white fill-white" />
                        </div>
                      </div>
                    </FadeIn>
                  ))}
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-5xl aspect-video">
            <button
              onClick={closeVideo}
              className="absolute -top-12 right-0 text-white hover:rotate-90 transition-transform duration-300"
            >
              <X size={32} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?autoplay=1`}
              className="w-full h-full rounded-2xl shadow-2xl"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
});

export default MediaSection;

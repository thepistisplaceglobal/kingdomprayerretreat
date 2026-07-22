"use client";

import type React from "react";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import YouTube from "react-youtube";
import {
  Play,
  Calendar,
  Share2,
  Search,
  Eye,
  ThumbsUp,
  Clock,
  X,
  Speaker,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import {
  FadeIn,
  SlideIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  HoverLift,
  TextReveal,
} from "@/components/Animations";

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  isLive: boolean;
  videoId: string;
}

interface YouTubeApiResponse {
  nextPageToken?: string;
  items: Array<{
    id: { videoId: string };
    snippet: {
      title: string;
      description: string;
      thumbnails: { high: { url: string }; medium: { url: string } };
      publishedAt: string;
    };
  }>;
}

interface VideoDetailsResponse {
  items: Array<{
    id: string;
    contentDetails: { duration: string };
    statistics: { viewCount: string; likeCount: string };
  }>;
}

export default function SermonsPage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [allVideos, setAllVideos] = useState<YouTubeVideo[]>([]);
  const [featuredVideo, setFeaturedVideo] = useState<YouTubeVideo | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (selectedVideoId !== null) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [selectedVideoId]);

  const CHANNEL_ID = "UCLOXg0upYF2qp87cgOyyu6g";
  const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const parseDuration = (duration: string): string => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return "0:00";
    const hours = Number.parseInt(match[1]?.replace("H", "") || "0");
    const minutes = Number.parseInt(match[2]?.replace("M", "") || "0");
    const seconds = Number.parseInt(match[3]?.replace("S", "") || "0");
    return hours > 0
      ? `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      : `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatViewCount = (count: string): string => {
    const num = Number.parseInt(count);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M views`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K views`;
    return `${num} views`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const fetchVideoDetails = async (
    videoIds: string[],
  ): Promise<VideoDetailsResponse> => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?key=${API_KEY}&id=${videoIds.join(
        ",",
      )}&part=contentDetails,statistics`,
    );
    if (!response.ok) {
      const errorData = await response
        .json()
        .catch(() => ({ message: response.statusText }));
      console.error("Failed to fetch video details:", errorData);
      throw new Error("Failed to fetch video details");
    }
    return response.json();
  };

  const fetchYouTubeVideos = async (
    pageToken?: string,
    searchQuery?: string,
  ) => {
    if (!API_KEY) {
      setError("YouTube API key not configured");
      setLoading(false);
      return;
    }
    try {
      setSearchLoading(true);
      let url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=12&type=video`;
      if (pageToken) url += `&pageToken=${pageToken}`;
      if (searchQuery) url += `&q=${encodeURIComponent(searchQuery)}`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({ message: response.statusText }));
        console.error("Failed to fetch videos:", errorData);
        throw new Error("Failed to fetch videos");
      }
      const data: YouTubeApiResponse = await response.json();
      const videoIds = data.items.map((item) => item.id.videoId);

      if (videoIds.length === 0) {
        setVideos([]);
        setAllVideos([]);
        setFeaturedVideo(null);
        setLoading(false);
        setSearchLoading(false);
        setHasMore(false);
        return;
      }

      const detailsData = await fetchVideoDetails(videoIds);
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
            duration: "LIVE",
            viewCount: "0",
            likeCount: "0",
            isLive: true,
            videoId: live.id.videoId,
          };
        }
      }
      const videoList = data.items
        .map((item) => {
          const details = detailsData.items.find(
            (d) => d.id === item.id.videoId,
          );
          if (!details) return null;
          return {
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
            publishedAt: item.snippet.publishedAt,
            duration: details
              ? parseDuration(details.contentDetails.duration)
              : "0:00",
            viewCount: details?.statistics.viewCount || "0",
            likeCount: details?.statistics.likeCount || "0",
            isLive: false as boolean,
            videoId: item.id.videoId,
          };
        })
        .filter((v): v is YouTubeVideo => v !== null) as YouTubeVideo[];

      if (!pageToken) {
        const featured = liveVideo || videoList[0];
        setFeaturedVideo(featured);
        const remainingVideos = videoList
          .filter((video) => video.id !== featured?.id)
          .slice(0, 8); // Enforce exactly 8 videos on the grid
        setVideos(remainingVideos);
        setAllVideos(remainingVideos);
      } else {
        const nextBatch = videoList.slice(0, 8); // Load exact batches of 8
        setVideos((prev) => [...prev, ...nextBatch]);
        setAllVideos((prev) => [...prev, ...nextBatch]);
      }
      setNextPageToken(data.nextPageToken || null);
      setHasMore(!!data.nextPageToken);
      setLoading(false);
      setSearchLoading(false);
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
      setError("Failed to load sermons");
      setLoading(false);
      setSearchLoading(false);
    }
  };

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        setNextPageToken(null);
        setHasMore(true);
        fetchYouTubeVideos(undefined, query);
      }, 500),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  function debounce<Args extends unknown[], Return>(
    func: (...args: Args) => Return,
    wait: number,
  ): (...args: Args) => void {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: Args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (query.trim()) {
      debouncedSearch(query.trim());
    } else {
      setVideos(allVideos);
      setNextPageToken(null);
      setHasMore(true);
    }
  };

  const loadMoreVideos = () => {
    if (nextPageToken && hasMore && !searchLoading) {
      fetchYouTubeVideos(nextPageToken, searchTerm || undefined);
    }
  };

  const playVideo = (videoId: string) => {
    setSelectedVideoId(videoId);
  };

  const closeVideo = () => {
    setSelectedVideoId(null);
  };

  const shareVideo = (video: YouTubeVideo) => {
    if (navigator.share) {
      navigator.share({
        title: video.title,
        text: video.description,
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
      });
    } else {
      navigator.clipboard.writeText(
        `https://www.youtube.com/watch?v=${video.videoId}`,
      );
      alert("Video link copied to clipboard!");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchYouTubeVideos();
    }, 0);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-[#300460]/20 border-t-[#300460] mx-auto mb-6" />
            <p className="text-gray-500 font-medium tracking-wide animate-pulse">
              Loading Library...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center bg-white rounded-lg p-6 shadow-md max-w-md mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Error</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => {
                setError(null);
                setLoading(true);
                fetchYouTubeVideos();
              }}
              className="px-4 py-2 bg-[#F21449] text-white rounded-lg hover:bg-[#d11240] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "radial-gradient(circle, rgba(0,0,0,0.2) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0"></div>

      {/* Content wrapper */}
      <div className="relative z-10 w-full">
        <Navbar />

        {/* Video Modal */}
        {selectedVideoId && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg p-4 max-w-4xl w-full mx-4">
              <button
                onClick={closeVideo}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="relative aspect-video">
                <YouTube
                  videoId={selectedVideoId}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: { autoplay: 1 },
                  }}
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <FadeIn delay={0.1}>
          <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1 h-[400px] md:h-[500px]">
            <div className="absolute inset-0">
              <Image
                src="/bannersermon.JPG"
                alt="Sermons background"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
                quality={85}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/20 to-black/90" />

            <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-12 bottom-6 sm:bottom-10 md:bottom-14 flex flex-col gap-2 z-10">
              <div className="flex flex-col md:justify-between gap-2">
                <div className="flex flex-col">
                  <FadeIn delay={0.2}>
                    <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 mb-2 w-fit">
                      <Speaker className="w-4 h-4 text-[#F21449]" />
                      <span className="text-white/90 font-medium text-sm">
                        Sermons
                      </span>
                    </div>
                  </FadeIn>
                  <TextReveal delay={0.3}>
                    <h1 className="text-3xl md:text-4xl font-semibold leading-tight max-w-3xl tracking-tight bricolage text-white">
                      Message Recap
                    </h1>
                  </TextReveal>
                </div>

                <div className="flex flex-col items-start gap-4">
                  <TextReveal delay={0.4}>
                    <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed">
                      Relive the message and deepen your faith. Browse our
                      library of past sermons and let the Word transform your
                      life.
                    </p>
                  </TextReveal>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Featured Sermon */}
        {featuredVideo && (
          <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn delay={0.2}>
              <div className="space-y-2 mb-8 w-full flex flex-col items-center justify-center">
                <TextReveal delay={0.1}>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    {featuredVideo.isLive ? "Live Stream" : "Featured Sermon"}
                  </h2>
                </TextReveal>
                <FadeIn delay={0.2} direction="left" distance={50}>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-1.5 w-16 bg-[#300460] rounded-full" />
                    <div className="h-1.5 w-6 bg-[#300460]/30 rounded-full" />
                  </div>
                </FadeIn>
              </div>
            </FadeIn>
            <div className="grid md:grid-cols-2 gap-8">
              <SlideIn direction="left" delay={0.4}>
                <HoverScale scale={1.02}>
                  <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src={featuredVideo.thumbnail || "/placeholder.svg"}
                      alt={featuredVideo.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      quality={85}
                    />
                    <button
                      onClick={() => playVideo(featuredVideo.videoId)}
                      className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
                    >
                      <Play className="w-12 h-12 text-white" />
                    </button>
                    {featuredVideo.isLive && (
                      <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                        LIVE
                      </div>
                    )}
                    {!featuredVideo.isLive && (
                      <div className="absolute bottom-4 right-4 bg-black/70 text-white uspx-2 py-1 rounded text-sm">
                        {featuredVideo.duration}
                      </div>
                    )}
                  </div>
                </HoverScale>
              </SlideIn>
              <SlideIn direction="right" delay={0.6}>
                <div className="flex flex-col justify-center">
                  <StaggerContainer delay={0.1}>
                    <StaggerItem>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {featuredVideo.title}
                      </h3>
                    </StaggerItem>
                    <StaggerItem>
                      <p className="text-gray-600 mb-6 line-clamp-3">
                        {featuredVideo.description}
                      </p>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex gap-4 mb-6 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />{" "}
                          {formatDate(featuredVideo.publishedAt)}
                        </span>
                        {!featuredVideo.isLive && (
                          <>
                            <span className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />{" "}
                              {formatViewCount(featuredVideo.viewCount)}
                            </span>
                            <span className="flex items-center gap-1">
                              <ThumbsUp className="w-4 h-4" />{" "}
                              {Number.parseInt(
                                featuredVideo.likeCount,
                              ).toLocaleString()}
                            </span>
                          </>
                        )}
                      </div>
                    </StaggerItem>
                    <StaggerItem>
                      <div className="flex gap-4">
                        <HoverLift>
                          <button
                            onClick={() => playVideo(featuredVideo.videoId)}
                            className="px-6 py-3 cursor-pointer bg-[#300460] text-white font-semibold rounded-xl hover:bg-[#300460]/90 transition-all shadow-lg hover:shadow-[#300460]/30 hover:-translate-y-0.5 flex items-center gap-2"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            {featuredVideo.isLive ? "Watch Live" : "Watch Now"}
                          </button>
                        </HoverLift>
                        <HoverLift>
                          <button
                            onClick={() => shareVideo(featuredVideo)}
                            className="px-5 py-3 border-2 cursor-pointer border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-[#300460]/30 hover:bg-gray-50 transition-all flex items-center gap-2"
                          >
                            <Share2 className="w-5 h-5" />
                          </button>
                        </HoverLift>
                      </div>
                    </StaggerItem>
                  </StaggerContainer>
                </div>
              </SlideIn>
            </div>
          </section>
        )}

        {/* Search Section */}
        <section className="pt-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#300460] transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search messages by title..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full pl-14 pr-12 py-4 bg-white border-0 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] ring-1 ring-gray-900/5 focus:ring-2 focus:ring-[#300460] outline-none transition-all duration-300 text-lg"
                />
                {searchLoading && (
                  <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-[#300460] border-t-transparent" />
                  </div>
                )}
              </div>
            </FadeIn>
            {searchTerm && (
              <TextReveal delay={0.3}>
                <p className="mt-2 text-sm text-gray-600 text-center">
                  {searchLoading
                    ? "Searching..."
                    : `Found ${videos.length} results for "${searchTerm}"`}
                </p>
              </TextReveal>
            )}
          </div>
        </section>

        {/* Sermons Grid */}
        <section className="pb-20 pt-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="space-y-2 mb-10 text-center md:text-left">
              <TextReveal delay={0.1}>
                <h2 className="text-4xl md:text-5xl mb-2 font-black text-gray-900 tracking-tight">
                  All Sermons
                </h2>
              </TextReveal>
              <FadeIn delay={0.2} direction="up" distance={20}>
                <div className="flex items-center justify-center md:justify-start gap-2 mt-4">
                  <div className="h-1.5 w-16 bg-[#300460] rounded-full" />
                  <div className="h-1.5 w-6 bg-[#300460]/30 rounded-full" />
                </div>
              </FadeIn>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {videos.map((video, index) => (
              <SlideIn key={video.id} direction="up" delay={0.1 * index}>
                <HoverScale scale={1.02}>
                  <div
                    className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 flex flex-col h-full group"
                    onClick={() => playVideo(video.videoId)}
                  >
                    <div className="relative h-[200px] overflow-hidden rounded-t-lg">
                      <Image
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        quality={85}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />

                      {/* Hover Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-5 h-5 text-white fill-current ml-1" />
                        </div>
                      </div>

                      <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-semibold tracking-wide">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-sm md:text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#300460] transition-colors leading-snug">
                        {video.title}
                      </h3>
                      <div className="flex justify-between text-[10px] md:text-xs font-medium text-gray-500 mb-3 mt-auto">
                        <span className="flex items-center gap-1 bg-gray-50 px-1.5 py-1 rounded-md">
                          <Eye className="w-3 h-3 text-[#300460]/70" />
                          {formatViewCount(video.viewCount)}
                        </span>
                        <span className="flex items-center gap-1 bg-gray-50 px-1.5 py-1 rounded-md">
                          <Clock className="w-3 h-3 text-[#300460]/70" />
                          {formatDate(video.publishedAt)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-900 group-hover:text-[#300460] flex items-center gap-1.5 transition-colors">
                          Watch Now
                          <Play className="w-3 h-3 fill-current" />
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            shareVideo(video);
                          }}
                          className="p-1.5 text-gray-400 hover:text-[#300460] hover:bg-[#300460]/5 rounded-lg transition-all"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </HoverScale>
              </SlideIn>
            ))}
          </div>
          {videos.length === 0 && !searchLoading && (
            <FadeIn delay={0.3}>
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">
                  No sermons found. Try different search terms.
                </p>
              </div>
            </FadeIn>
          )}
          {hasMore && videos.length > 0 && (
            <FadeIn delay={0.4}>
              <div className="text-center mt-6">
                <HoverLift>
                  <button
                    onClick={loadMoreVideos}
                    disabled={searchLoading}
                    className="px-6 py-2 bg-[#300460] text-white rounded-lg hover:bg-[#300460]/80 transition-colors disabled:bg-gray-400"
                  >
                    {searchLoading ? "Loading..." : "Load More"}
                  </button>
                </HoverLift>
              </div>
            </FadeIn>
          )}
        </section>

        {/* Call to Action */}
        <Cta />
        <Footer />
      </div>
    </div>
  );
}

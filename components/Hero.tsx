"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const [isLive, setIsLive] = useState(false);

  // Simulated live stream check (replace with actual API call or logic)
  // Live stream check
  useEffect(() => {
    const checkLiveStatus = async () => {
      // 1. Check environment variable override first
      const envOverride = process.env.NEXT_PUBLIC_IS_LIVE;
      if (envOverride !== undefined) {
        setIsLive(envOverride === "true");
        return;
      }

      // 2. Default logic: Live on Sundays between 10 AM - 12 PM
      const now = new Date();
      const day = now.getDay(); // 0 is Sunday
      const hours = now.getHours();

      const isSunday = day === 0;
      const isLiveTime = hours >= 10 && hours <= 12;

      setIsLive(isSunday && isLiveTime);
    };

    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative md:h-full overflow-hidden">
      {isLive ? (
        <section id="home" className="text-white">
          <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1 h-[500px] sm:h-[560px] md:h-[600px]">
            <iframe
              src="https://www.youtube.com/embed/live_stream?channel=UCLOXg0upYF2qp87cgOyyu6g"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Live Stream"
            />
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse z-10">
              🔴 LIVE
            </div>
          </div>
        </section>
      ) : (
        <section id="home" className="text-white">
          <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1">
            <div className="relative h-[500px] sm:h-[560px] md:h-[600px]">
              <Image
                src="/hero.jpg"
                alt="Public speaking coach addressing an audience"
                fill
                className="object-cover object-top sm:object-bottom-right"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-r from-[#06040B] via-[#06040B]/50 to-transparent" />

              <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-12 bottom-6 sm:bottom-10 md:bottom-14 flex flex-col gap-4 sm:gap-6 md:gap-8">
                {/* Top Row - Left and Right Content */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-8">
                  {/* Left Side - Name and Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.3,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      className="text-white/70 text-sm sm:text-base md:text-lg"
                    >
                      The Pistis Place Global
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight max-w-3xl tracking-tight bricolage"
                    >
                      Birthing Convictions in the Hearts of Men
                    </motion.h1>
                  </motion.div>

                  {/* Right Side - Description and Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="flex flex-col items-start md:items-end gap-4 md:max-w-md"
                  >
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                      className="text-white/80 text-xs sm:text-sm max-w-xl md:text-right leading-relaxed"
                    >
                      As you come to him, a living stone rejected by men but in
                      the sight of God chosen and precious, you yourselves like
                      living stones are being built up as a spiritual house, to
                      be a holy priesthood, to offer spiritual sacrifices
                      acceptable to God through Jesus Christ.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                      className="flex flex-wrap items-center gap-3 sm:gap-4"
                    >
                      <Link href="/contact">
                        <button className="inline-flex items-center gap-2 rounded-lg bg-white text-[#050409] font-semibold px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm md:text-base shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#F7F6FF] hover:shadow-lg active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06040B] bricolage">
                          Join Family{" "}
                          <ArrowRight size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </Link>
                      <Link href="https://linktr.ee/thepistisplaceglobal">
                        <button className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm md:text-base text-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06040B] bricolage">
                          Quick Links
                        </button>
                      </Link>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Stats Section - Remains below left side */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    className="bg-white/10 hidden rounded-2xl sm:rounded-3xl border border-white/10 px-4 py-3 sm:px-5 sm:py-4 md:flex items-center gap-3 sm:gap-4 backdrop-blur"
                  >
                    <div className=" flex items-center justify-center text-base sm:text-lg font-semibold">
                      50K+
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-white/60">
                        Lives Transformed
                      </p>
                      <p className="text-sm sm:text-base font-semibold">
                        And Counting
                      </p>
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                    className="bg-white/10 max-w-2xl rounded-2xl sm:rounded-3xl border border-white/10 px-4 py-3 sm:px-5 sm:py-4 flex-1 backdrop-blur"
                  >
                    <p className="text-xs sm:text-base font-semibold">
                      This is the right place for you. Give us three months, and
                      see undeniable change in your life.
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

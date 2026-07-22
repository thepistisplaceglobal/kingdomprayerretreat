import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, TextReveal } from "@/components/Animations";
import { Users } from "lucide-react";

export default function HomeCellsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <FadeIn delay={0.1}>
        <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1 h-[400px] md:h-[500px]">
          <div className="absolute inset-0">
            <Image
              src="/cells.png"
              alt="Home Cells Background"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
              quality={85}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

          <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-12 bottom-6 sm:bottom-10 md:bottom-14 flex flex-col gap-4 sm:gap-6 md:gap-8 z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-8">
              <div className="flex flex-col">
                <FadeIn delay={0.2}>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4 w-fit">
                    <Users className="w-4 h-4 text-[#F21449]" />
                    <span className="text-white/90 font-medium text-sm">
                      Community
                    </span>
                  </div>
                </FadeIn>

                <TextReveal delay={0.3}>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight max-w-3xl tracking-tight bricolage text-white">
                    Home Cells
                  </h1>
                </TextReveal>
              </div>

              <div className="flex flex-col items-start md:items-end gap-4 md:max-w-md">
                <TextReveal delay={0.4}>
                  <p className="text-white/80 text-xs sm:text-sm max-w-xl md:text-right leading-relaxed">
                    Experience true fellowship in a neighborhood near you. Build
                    lasting relationships and grow together in your faith
                    journey.
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="flex-grow">{/* Placeholder for page content */}</div>

      <Footer />
    </div>
  );
}

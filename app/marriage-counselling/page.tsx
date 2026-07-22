import React from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FadeIn, TextReveal } from "@/components/Animations";
import { HeartHandshake } from "lucide-react";
import Calendly from "@/app/counselling/calendly";
import Cta from "@/components/Cta";

export default function MarriageCounsellingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <FadeIn delay={0.1}>
        <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1 h-[400px] md:h-[500px]">
          <div className="absolute inset-0">
            <Image
              src="/contactbanner.jpg"
              alt="Marriage Counselling Background"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
              quality={85}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

          <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-12 bottom-6 sm:bottom-10 flex flex-col gap-4 sm:gap-6 md:gap-8 z-10">
            <div className="flex flex-col md:justify-between gap-2 ">
              <div className="flex flex-col">
                <FadeIn delay={0.2}>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20 w-fit">
                    <HeartHandshake className="w-4 h-4 text-[#F21449]" />
                    <span className="text-white/90 font-medium text-sm">
                      Support for Couples
                    </span>
                  </div>
                </FadeIn>
                <TextReveal delay={0.3}>
                  <h1 className="text-3xl md:text-4xl font-semibold leading-tight max-w-3xl tracking-tight bricolage mt-1 text-white">
                    Marriage Counselling
                  </h1>
                </TextReveal>
              </div>

              <div className="flex flex-col items-start gap-4 md:max-w-md">
                <TextReveal delay={0.4}>
                  <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed">
                    Schedule a session with our pastoral team. We&apos;re here to
                    listen, pray with you, and offer biblical guidance for your marriage.
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      <div className="flex-grow py-12 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Calendly />
      </div>
      <Cta />
      <Footer />
    </div>
  );
}

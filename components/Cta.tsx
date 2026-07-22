"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { TextReveal, FadeIn, HoverLift } from "@/components/Animations";

export const Cta = memo(function Cta() {
  return (
    <section className="relative rounded-t-4xl w-full h-[250px] md:h-[350px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/shopfree.jpg"
          alt="Community giving and fellowship"
          fill
          className="object-cover object-center"
          priority
          quality={85}
        />
      </div>

      {/* Gradient Overlay - black at bottom fading to transparent at top */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0D1216] via-[#0D1216]/70 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 md:mt-[3%] flex items-end h-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="w-full max-w-4xl pb-8 sm:pb-10 md:pb-12 lg:pb-14 xl:pb-16">
          <TextReveal delay={0.1}>
            <h2 className="text-3xl bricolage sm:text-4xl md:text-5xl pb-2 font-bold text-white">
              Partner
            </h2>
          </TextReveal>
          {/* Purple underline accent */}
          <FadeIn delay={0.2} direction="left" distance={50}>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="h-1 sm:h-1.5 md:h-2 w-12 sm:w-16 md:w-20 bg-[#300460] rounded-full" />
              <div className="h-1 sm:h-1.5 md:h-2 w-6 sm:w-8 md:w-10 bg-[#300460]/40 rounded-full" />
            </div>
          </FadeIn>
          {/* Description Text */}
          <TextReveal delay={0.3}>
            <p className="text-white/90 text-sm sm:text-base md:text-xl my-4 md:my-6 max-w-2xl leading-relaxed">
              Your giving is an act of faith that helps us spread Christ’s love,
              support lives, and build a strong community at The Pistis Place.
            </p>
          </TextReveal>

          {/* Call to Action Button */}
          <FadeIn delay={0.4}>
            <HoverLift>
              <Link
                href="/partner"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:py-4 md:py-5  bg-[#300460] hover:bg-[#300460]/80 text-white rounded-lg transition-colors hover:shadow-lg hover:scale-105 active:scale-95 text-sm sm:text-base md:text-lg"
              >
                <span className="text-white/90">Partner with us</span>
              </Link>
            </HoverLift>
          </FadeIn>
        </div>
      </div>
    </section>
  );
});

export default Cta;

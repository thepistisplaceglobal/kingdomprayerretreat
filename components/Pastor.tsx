"use client";

import { useEffect, useRef, useMemo, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  ScaleIn,
  HoverScale,
  SlideIn,
  TextReveal,
  FadeIn,
  StaggerContainer,
  StaggerItem,
  HoverLift,
} from "@/components/Animations";
import { TextRotate, TextRotateRef } from "@/components/ui/TextRotate";

export const Pastor = memo(function Pastor() {
  const quotes = useMemo(
    () => [
      "There's no self made man in the world, it is God in partnership with man that lifts people up.",
      "In the believer, God should be seen, God should be felt and God should be touched.",
      "God did not call man to have a prayer life, rather he called man to live a life of prayer.",
      "The weight of your gratitude after an endeavour shows the value you placed on that encounter.",
      "When a man comes to Christ, he has indeed entered the promised land, because the promised land is not a place, it's a person.",
    ],
    [],
  );

  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLElement | null)[]>([]);
  const textRotateRef = useRef<TextRotateRef>(null);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate text elements with staggered delay
            textRefs.current.forEach((el, index) => {
              if (el) {
                setTimeout(() => {
                  el.style.opacity = "1";
                  el.style.transform = "translateY(0)";
                }, index * 200);
              }
            });
          }
        });
      },
      { threshold: 0.2 },
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full bg-black py-10 pb-16 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20"
    >
      <div className="max-w-7xl mx-auto">
        {/* Profile section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 mb-8 sm:mb-12 md:mb-16 items-center">
          {/* Profile image */}
          <ScaleIn delay={0.2}>
            <HoverScale scale={1.02}>
              <div className="relative rounded-2xl overflow-hidden aspect-[6/7] shadow-2xl group">
                <Image
                  src="/pjay.png"
                  alt="Pastor Japheth Joseph"
                  fill
                  className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                  quality={70}
                />
                {/* Subtle overlay for better contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </HoverScale>
          </ScaleIn>

          {/* Profile info */}
          <SlideIn direction="right" delay={0.4}>
            <div className="flex flex-col justify-center space-y-4 md:space-y-8">
              {/* Header Section */}
              <div>
                <div className="md:space-y-4">
                  <TextReveal delay={0.1}>
                    <p className="text-[#F5F1F4] uppercase font-semibold text-small sm:text-lg">
                      Our lead pastor
                    </p>
                  </TextReveal>
                  <TextReveal delay={0.2}>
                    <h3 className="bricolage text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F1F4] transition-all duration-700">
                      Pastor Japheth Joseph
                    </h3>
                  </TextReveal>
                </div>
              </div>

              <StaggerContainer delay={0.1}>
                <StaggerItem>
                  <p className="text-white/80 text-sm sm:text-lg pb-2 leading-relaxed">
                    Pastor Japheth Joseph is a devoted shepherd and teacher
                    committed to raising believers grounded in sound doctrine,
                    demonstrating the power of the Holy Ghost whilst maintaining
                    a high level of conviction.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-white/80 text-sm sm:text-lg leading-relaxed">
                    His innovative approach to ministry and attention to detail
                    have made him a respected voice for believers worldwide,
                    with a passion for equipping the saints for the work of
                    ministry.
                  </p>
                </StaggerItem>
              </StaggerContainer>

              <FadeIn delay={0.6}>
                <div>
                  <HoverLift>
                    <Link
                      href="https://japhethjoseph.com/"
                      target="_blank"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-4 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm md:text-base text-white/90 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#06040B] bricolage"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </HoverLift>
                </div>
              </FadeIn>
            </div>
          </SlideIn>
        </div>

        {/* Quote slideshow section */}
        <div
          ref={addToRefs}
          className="text-center max-w-5xl mx-auto transition-all duration-700 opacity-0 translate-y-4"
        >
          <div className="relative">
            {/* Slideshow container */}
            <div className="relative border border-l-[#947CAC] pl-4 min-h-[80px] flex items-center justify-center">
              <TextRotate
                ref={textRotateRef}
                texts={quotes}
                rotationInterval={6000}
                staggerDuration={0.025}
                staggerFrom="first"
                splitBy="characters"
                mainClassName="text-base md:text-2xl font-light text-white/95 bricolage leading-relaxed text-center justify-center"
                elementLevelClassName="inline-block"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

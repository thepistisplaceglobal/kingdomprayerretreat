"use client";

import { useState, useEffect, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import {
  SlideIn,
  FadeIn,
  TextReveal,
  HoverLift,
  RotateIn,
} from "@/components/Animations";

export const Books = memo(function BooksSection() {
  const [currentMonth, setCurrentMonth] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const month = new Date().toLocaleString("default", { month: "long" });
    setCurrentMonth(month);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-16 w-full overflow-hidden"
    >
      <div className="relative z-6 w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
            {/* Left side - Text content */}
            <SlideIn direction="left" delay={0.2}>
              <div className="space-y-6">
                <FadeIn delay={0.1}>
                  <div className="flex items-center gap-2 md:gap-6">
                    <div className="h-8 md:h-12 lg:h-14 xl:h-16 w-1 bg-[#947CAC] rounded-full" />
                    <div>
                      <h2 className="text-3xl bricolage md:text-6xl font-bold text-[#300460]">
                        Books Available
                      </h2>
                      <p className="text-xl sm:text-2xl text-gray-700 font-light">
                        {currentMonth}
                      </p>
                    </div>
                  </div>
                </FadeIn>
                <TextReveal delay={0.3}>
                  <p className="text-[#8E8995] text-sm text-lg max-w-xl">
                    Discover transformative spiritual literature that will
                    deepen your faith and understanding of God&apos;s word.
                  </p>
                </TextReveal>
                <FadeIn delay={0.4}>
                  <HoverLift>
                    <Link
                      href="https://selar.com/m/pjresources"
                      target="_blank"
                      className="inline-flex items-center gap-2 bg-[#300460] hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group text-sm md:text-lg lg:text-xl"
                    >
                      View All Books
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </HoverLift>
                </FadeIn>
              </div>
            </SlideIn>

            {/* Right side - Shelf with Books */}
            <SlideIn direction="right" delay={0.4}>
              <RotateIn delay={0.6}>
                <div className="relative">
                  <Image
                    src="/bench.png"
                    alt="bookshelf"
                    width={300}
                    height={300}
                    className="w-full object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                    quality={85}
                  />
                </div>
              </RotateIn>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
});

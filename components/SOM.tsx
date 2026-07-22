"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import {
  FadeIn,
  SlideIn,
  ScaleIn,
  HoverLift,
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/Animations";

export function SOM() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-50 overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-purple-100/50 rounded-bl-full blur-[100px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-50/50 rounded-tr-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <SlideIn direction="left" delay={0.2}>
            <div className="space-y-8">
              <div className="space-y-2">
                <TextReveal delay={0.1}>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#300460]/10 text-[#300460] text-sm font-semibold mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#300460] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#300460]"></span>
                    </span>
                    Coming Soon
                  </div>
                </TextReveal>

                <TextReveal delay={0.2}>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-500 bricolage leading-tight">
                    School of <span className="text-[#300460]">Ministry</span>
                  </h2>
                </TextReveal>

                <FadeIn delay={0.3} direction="left" distance={50}>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-16 bg-[#300460] rounded-full" />
                    <div className="h-1 w-8 bg-[#300460]/40 rounded-full" />
                  </div>
                </FadeIn>
              </div>

              <StaggerContainer delay={0.2}>
                <StaggerItem>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Equipping believers for effective ministry and leadership.
                    Join our comprehensive program designed to deepen your
                    theological understanding and practical ministerial skills.
                  </p>
                </StaggerItem>
              </StaggerContainer>

              <StaggerContainer delay={0.4}>
                <div className="space-y-4">
                  <StaggerItem>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                        <Calendar className="w-6 h-6 text-[#300460]" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Starts On
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          8th April
                        </p>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                        <Tag className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">
                          Tuition
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          ₦50,000
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </div>
              </StaggerContainer>

              <FadeIn delay={0.6}>
                <HoverLift>
                  <Link
                    target="_blank"
                    href="https://bit.ly/PistisSOM_2026"
                    className="inline-flex items-center gap-2 bg-[#300460] hover:bg-[#300460]/90 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-purple-900/20 group hover:-translate-y-1"
                  >
                    Register Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </HoverLift>
              </FadeIn>
            </div>
          </SlideIn>

          {/* Right Content - Image */}
          <SlideIn direction="right" delay={0.4}>
            <div className="relative">
              <ScaleIn delay={0.6}>
                <div className="relative rounded-[2rem] overflow-hidden aspect-square lg:aspect-[3/4] shadow-2xl group">
                  <div className="absolute inset-0 bg-[#300460]/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
                  <Image
                    src="/som.jpg"
                    alt="School of Ministry"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dots-pattern opacity-10" />
                </div>
              </ScaleIn>

              {/* Floating Card */}
              <FadeIn delay={0.8} direction="up" distance={30}>
                <div className="absolute -bottom-6 -left-6 md:bottom-8 md:-left-12 bg-white p-6 pr-0 rounded-2xl shadow-xl border border-gray-100 max-w-[200px] z-20">
                  <div className="flex flex-col gap-2">
                    <span className="text-4xl font-black text-[#300460] bricolage">
                      100+
                    </span>
                    <span className="text-sm text-gray-600 font-medium leading-tight">
                      Graduates Empowered for Ministry
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}

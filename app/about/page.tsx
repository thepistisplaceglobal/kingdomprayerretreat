"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Globe,
} from "lucide-react";
import Footer from "@/components/Footer";
import Cta from "@/components/Cta";
import {
  FadeIn,
  SlideIn,
  ScaleIn,
  StaggerContainer,
  StaggerItem,
  HoverScale,
  HoverLift,
  TextReveal,
  RotateIn,
} from "@/components/Animations";
import Navbar from "@/components/Navbar";
import { Pastor } from "@/components/Pastor";
import Testimonials from "@/components/Testimonial";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section with enhanced animations */}
      <FadeIn delay={0.1}>
        <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1 h-[400px] md:h-[500px]">
          <div className="absolute inset-0">
            <Image
              src="/abbanner.jpg"
              alt="About background"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
              quality={85}
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />

          <div className="absolute inset-x-4 sm:inset-x-6 md:inset-x-12 bottom-6 sm:bottom-10 md:bottom-14 flex flex-col gap-4 sm:gap-6 md:gap-8 z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 md:gap-8">
              <div className="flex flex-col">
                <FadeIn delay={0.2}>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-4 w-fit">
                    <Globe className="w-4 h-4 text-[#F21449]" />
                    <span className="text-white/90 font-medium text-sm">
                      The Pistis Place Global
                    </span>
                  </div>
                </FadeIn>
                <TextReveal delay={0.3}>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight max-w-3xl tracking-tight bricolage text-white">
                    About The Church
                  </h1>
                </TextReveal>
              </div>

              <div className="flex flex-col items-start md:items-end gap-4 md:max-w-md">
                <TextReveal delay={0.4}>
                  <p className="text-white/80 text-xs sm:text-sm max-w-xl md:text-right leading-relaxed">
                    Advancing God&apos;s kingdom by birthing convictions in the heart
                    of men through the word and soul transforming encounters.
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* About Section */}
      <section className="py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[5%]">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <SlideIn direction="left" delay={0.2}>
              <div className="space-y-6">
                {/* Purple accent text */}
                <div className="space-y-2">
                  <TextReveal delay={0.1}>
                    <p className="text-[#300460] font-semibold text-base">
                      Who We Are
                    </p>
                  </TextReveal>
                  <TextReveal delay={0.2}>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                      About Us
                    </h2>
                  </TextReveal>
                  {/* Purple underline accent */}
                  <FadeIn delay={0.3} direction="left" distance={50}>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-16 bg-[#300460] rounded-full" />
                      <div className="h-1 w-8 bg-[#300460]/40 rounded-full" />
                    </div>
                  </FadeIn>
                </div>

                {/* Description text */}
                <StaggerContainer delay={0.1}>
                  <StaggerItem>
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                      The word &apos;Pistis&apos; is a Greek word that means Faith. The
                      ministry started 12 years ago as a fellowship on campus
                      known as &apos;Passion For Souls Outreach&apos;. Passion For Souls
                      Outreach had branches in over 28 higher institutions in
                      Nigeria. Additionally, we had an expression called &apos;In His
                      Presence,&apos; focused on bringing the light of the gospel to
                      secondary school students.
                    </p>
                  </StaggerItem>
                  <StaggerItem>
                    <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                      In 2017, God led us out of the school campus where we
                      operated as a fellowship into the city, where we now
                      function as an interdenominational church, advancing the
                      kingdom of Christ and reconciling people to God. The move
                      led to the change of name from &apos;Passion for Souls&apos; to &apos;the
                      Pistis Place&apos;, with a mandate of birthing convictions in
                      the heart of men, through the instrumentality of God&apos;s
                      Word and His Spirit.
                    </p>
                  </StaggerItem>
                </StaggerContainer>

                {/* Read More button */}
                <FadeIn delay={0.6}>
                  <div>
                    <HoverLift>
                      <Link
                        href="/about"
                        target="_blank"
                        className="inline-flex items-center gap-2 bg-[#300460] hover:bg-[#300460]/80 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 group"
                      >
                        Read More
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </HoverLift>
                  </div>
                </FadeIn>
              </div>
            </SlideIn>

            {/* Right side - Floating pentagon arrangement */}
            <SlideIn direction="right" delay={0.4}>
              <div className="relative">
                {/* Pentagon 3 - Bottom center */}
                <RotateIn delay={0.6}>
                  <div className="transform">
                    <Image
                      src="/ob.jpg"
                      alt="Pistis"
                      width={900}
                      height={300}
                      className="object-contain rounded-lg shadow-lg w-full h-auto"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      quality={85}
                    />
                  </div>
                </RotateIn>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Lead Pastor Section */}
      <Pastor />

      {/* Mission Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-[5%]">
          <FadeIn delay={0.2}>
            <div className="text-center mb-16">
              <div className="space-y-2 mb-8">
                <TextReveal delay={0.1}>
                  <p className="text-[#300460] font-semibold text-lg">
                    Our Mission
                  </p>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
                    BIRTHING CONVICTIONS IN
                    <br />
                    <span className="text-[#300460] mt-2">
                      THE HEARTS OF MEN
                    </span>
                  </h2>
                </TextReveal>
                <FadeIn delay={0.3} direction="left" distance={50}>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <div className="h-1 w-16 bg-[#300460] rounded-full" />
                    <div className="h-1 w-8 bg-[#300460]/40 rounded-full" />
                  </div>
                </FadeIn>
              </div>
            </div>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-6 text-sm md:text-base leading-relaxed text-gray-700">
            <SlideIn direction="left" delay={0.4}>
              <StaggerContainer delay={0.1}>
                <StaggerItem>
                  <p>
                    At The Pistis Place, our core values are rooted in God&apos;s
                    Word, which we believe is the catalyst for life change
                    (Hebrews 4:12).
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p>
                    We prioritize worship, recognizing the spiritual battle for
                    our minds, and anticipating God&apos;s wonders in our lives. We
                    value honour, restoration, and faith in God, who empowers us
                    through His anointing.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p>
                    We commit to loyalty to God, our leaders, and community,
                    while pursuing learning, intimacy, and impact in our
                    relationships. We believe in networking, love, and
                    leadership, and strive for organization, vision, and
                    excellence in all we do.
                  </p>
                </StaggerItem>
              </StaggerContainer>
            </SlideIn>
            <SlideIn direction="right" delay={0.6}>
              <StaggerContainer delay={0.2}>
                <StaggerItem>
                  <p>
                    Pastor Japheth Joseph, Shepherds the members of church with
                    a high level of commitment and is dedicated to raising
                    people who are taught accurate doctrine, demonstrating the
                    power of the Holy Ghost whilst maintaining a high level of
                    conviction.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p>
                    In addition to shepherding the Pistis Place flock, he is an
                    instructor at the Grace Family School of Holy Spirit, Uyo
                    and also a lecturer with the Department of History and
                    International Studies, University of Uyo, Uyo.
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p>
                    Through sound biblical teaching, passionate worship, and
                    genuine fellowship, we create an environment where believers
                    can grow in their relationship with God and discover their
                    divine purpose.
                  </p>
                </StaggerItem>
              </StaggerContainer>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Church Interior Image */}
      <ScaleIn delay={0.2}>
        <section className="relative h-[35vh] md:h-[60vh] overflow-hidden">
          <Image
            src="/fififi.jpg"
            alt="The Pistis Place sanctuary filled with worshippers"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, (max-width: 1280px) 100vw, (max-width: 2560px) 100vw, 100vw"
            quality={85}
          />
          <div className="absolute inset-0 bg-black/30" />
        </section>
      </ScaleIn>

      {/* Testimonials Section */}
      <Testimonials />

      {/* What We Believe */}
      <section className="py-12 text-left px-[5%]">
        <div className=" mx-auto">
          <div className="space-y-2 pb-8">
            <p className="text-[#300460] font-semibold text-lg">Value System</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              Our Core Values
            </h2>
            {/* Purple underline accent */}
            <div className="flex items-center gap-2 pt-3">
              <div className="h-1 w-16 bg-[#300460] rounded-full" />
              <div className="h-1 w-8 bg-purple-400 rounded-full" />
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col lg:flex-row  justify-between items-start">
            {/* Left Side Image */}
            <div className="md:w-1/2 pb-5 md:pb-0">
              <Image
                src="/value.jpg"
                width={700}
                height={500}
                alt="/church album"
                className="rounded-lg shadow-lg"
              />
            </div>

            {/* Right Side Values */}
            <div className="md:w-1/2 md:ml-[5%] space-y-4">
              <h2 className="text-3xl leading-10 md:text-4xl font-bold text-gray-500">
                Our values are encapsulated in <br />
                <span className="text-[#300460]">F.A.L.L. IN. L.O.V.E.</span>
              </h2>

              <ul className="text-lg space-y-2">
                <div className="md:flex space-x-3">
                  <li>
                    <span className="font-extrabold text-2xl text-orange-600">
                      F
                    </span>{" "}
                    - Faith
                  </li>
                  <li>
                    <span className="font-extrabold text-2xl text-blue-600">
                      A
                    </span>{" "}
                    - Anointing
                  </li>
                  <li>
                    <span className="font-extrabold text-2xl text-green-600">
                      L
                    </span>{" "}
                    - Loyalty
                  </li>
                  <li>
                    <span className="font-extrabold text-2xl text-yellow-600">
                      L
                    </span>{" "}
                    - Learning
                  </li>
                </div>

                <li>
                  <span className="font-extrabold text-2xl text-[#300460]">
                    I
                  </span>{" "}
                  - Intimacy and Impact
                </li>
                <li>
                  <span className="font-extrabold text-2xl text-cyan-600">
                    N
                  </span>{" "}
                  - Networking
                </li>
                <li>
                  <span className="font-extrabold text-2xl text-lime-600">
                    L
                  </span>{" "}
                  - Love and Leadership
                </li>
                <li>
                  <span className="font-extrabold text-2xl text-red-600">
                    O
                  </span>{" "}
                  - Organization and Order
                </li>
                <li>
                  <span className="font-extrabold text-2xl text-indigo-600">
                    V
                  </span>{" "}
                  - Visionary & Versatile
                </li>
                <li>
                  <span className="font-extrabold text-2xl text-teal-600">
                    E
                  </span>{" "}
                  - Excellence and Empowerment
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 px-[3%] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn delay={0.2}>
            <div className="space-y-6 text-center">
              {/* Purple accent text */}
              <div className=" text-center">
                <TextReveal delay={0.1}>
                  <p className="text-[#300460] font-semibold text-lg">
                    We are family
                  </p>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-500">
                    Home away from <br />
                    <span className="text-[#300460]">Home</span>
                  </h2>
                </TextReveal>
                {/* Purple underline accent */}
                <FadeIn delay={0.3} direction="left" distance={50}>
                  <div className="flex items-center text-center justify-center pt-3 gap-2">
                    <div className="h-1 w-16 bg-[#300460] rounded-full" />
                    <div className="h-1 w-8 bg-[#300460]/40 rounded-full" />
                  </div>
                </FadeIn>
              </div>
              <TextReveal delay={0.4}>
                <p className="text-base text-gray-400 max-w-3xl mx-auto mb-8">
                  Experience revival, meaningful connections, and life-changing
                  community.
                </p>
              </TextReveal>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-8">
            <SlideIn direction="left" delay={0.4}>
              <HoverScale scale={1.05}>
                <div className="group">
                  <div className="relative h-64 rounded-t-xl overflow-hidden mb-6">
                    <Image
                      src="/about4.jpg"
                      alt="Fellowship and Community"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#300460]">
                    Fellowship
                  </h3>
                  <p className="text-gray-600 text-sm md:text-[15px] pt-2 leading-relaxed">
                    Build lasting relationships through our small groups,
                    community events, and shared experiences in faith.
                  </p>
                </div>
              </HoverScale>
            </SlideIn>

            <SlideIn direction="up" delay={0.6}>
              <HoverScale scale={1.05}>
                <div className="group">
                  <div className="relative h-64 rounded-t-xl overflow-hidden mb-6">
                    <Image
                      src="/about3.jpg"
                      alt="Worship and Praise"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#300460]">Worship</h3>
                  <p className="text-gray-600 text-sm md:text-[15px] pt-2 leading-relaxed">
                    Experience powerful worship services that connect you with
                    God and inspire your spiritual journey.
                  </p>
                </div>
              </HoverScale>
            </SlideIn>

            <SlideIn direction="right" delay={0.8}>
              <HoverScale scale={1.05}>
                <div className="group">
                  <div className="relative h-64 rounded-t-xl overflow-hidden mb-6">
                    <Image
                      src="/about2.jpg"
                      alt="Service and Outreach"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#300460]">Service</h3>
                  <p className="text-gray-600 text-sm md:text-[15px] pt-2 leading-relaxed">
                    Make a difference in our community through various outreach
                    programs and service opportunities.
                  </p>
                </div>
              </HoverScale>
            </SlideIn>
          </div>
        </div>
      </section>

      {/*Call To Action*/}
      <Cta />
      <Footer />
    </div>
  );
}

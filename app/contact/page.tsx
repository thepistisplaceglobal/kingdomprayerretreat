"use client";

import Image from "next/image";
import type React from "react";
import { memo, useState } from "react";
import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  Send,
  LinkIcon,
  Phone,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {/* Hero Section */}
      <FadeIn delay={0.1}>
        <div className="rounded-lg mx-1 sm:rounded-[32px] md:rounded-[40px] overflow-hidden relative mt-1 h-[400px] md:h-[500px]">
          <div className="absolute inset-0">
            <Image
              src="/contactbanner.jpg"
              alt="Partnership background"
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
                    <Phone className="w-4 h-4 text-[#F21449]" />
                    <span className="text-white/90 font-medium text-sm">
                      Reach Out
                    </span>
                  </div>
                </FadeIn>
                <TextReveal delay={0.3}>
                  <h1 className="text-3xl md:text-4xl  font-semibold leading-tight max-w-3xl tracking-tight bricolage text-white">
                    Contact Us
                  </h1>
                </TextReveal>
              </div>

              <div className="flex flex-col items-start gap-4 ">
                <TextReveal delay={0.4}>
                  <p className="text-white/80 text-xs sm:text-sm max-w-xl leading-relaxed">
                    Join us in advancing God&apos;s kingdom through your faithful
                    partnership. Together, we can reach more souls, transform
                    communities, and demonstrate God&apos;s love to the world.
                  </p>
                </TextReveal>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Map Section */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-6xl mx-auto">
          <FadeIn delay={0.2}>
            <div className="space-y-1">
              <TextReveal delay={0.1}>
                <p className="text-[#300460] font-semibold text-lg">
                  Come Home
                </p>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Get Directions
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
          </FadeIn>
          <ScaleIn delay={0.4}>
            <div className="relative mt-7 w-full h-[40vh] md:h-[65vh] rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15223.630788753859!2d7.882198214471566!3d5.03720518149714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105d572805245ac7%3A0x4d1e36e876c4caca!2sThe%20Pistis%20Place!5e0!3m2!1sen!2snl!4v1751720472094!5m2!1sen!2snl"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <p className="text-center mt-4 text-gray-600">
                The Pistis Place Global
              </p>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <FadeIn delay={0.2}>
            <div className="space-y-1 mb-8">
              <TextReveal delay={0.1}>
                <p className="text-[#300460] font-semibold text-lg">
                  Get In Touch
                </p>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Send us a Message
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
          </FadeIn>

          <div className="grid lg:grid-cols-2 items-center bg-white rounded-xl shadow-xl border border-gray-200">
            {/* Image Section */}
            <SlideIn direction="left" delay={0.4}>
              <HoverScale scale={1.02}>
                <div className="order-2 lg:order-1">
                  <div className="relative w-full h-[400px] lg:h-[500px]">
                    <Image
                      src="/contactleft2.png"
                      alt="Contact us - The Pistis Place Global"
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                      quality={85}
                    />
                  </div>
                </div>
              </HoverScale>
            </SlideIn>

            {/* Form Section */}
            <SlideIn direction="right" delay={0.6}>
              <div className="order-1 lg:order-2">
                <div className="p-6 lg:p-8">
                  <form onSubmit={handleSubmit}>
                    <StaggerContainer delay={0.1}>
                      <StaggerItem>
                        <div className="mb-4">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-2"
                          >
                            Full Name *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className={`w-full border-none shadow-sm bg-gray-100 ${
                              errors.name ? "border-red-500 bg-red-50" : ""
                            }`}
                            required
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.name}
                            </p>
                          )}
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="mb-4">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email Address *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email address"
                            className={`w-full border-none shadow-sm bg-gray-100 ${
                              errors.email ? "border-red-500 bg-red-50" : ""
                            }`}
                            required
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="mb-4">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Phone Number *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className={`w-full border-none shadow-sm bg-gray-100 ${
                              errors.phone ? "border-red-500 bg-red-50" : ""
                            }`}
                            required
                          />
                          {errors.phone && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="mb-4">
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Subject *
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleInputChange}
                            placeholder="What is this regarding?"
                            className={`w-full border-none shadow-sm bg-gray-100 ${
                              errors.subject ? "border-red-500 bg-red-50" : ""
                            }`}
                            required
                          />
                          {errors.subject && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.subject}
                            </p>
                          )}
                        </div>
                      </StaggerItem>
                      <StaggerItem>
                        <div className="mb-4">
                          <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Message *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            placeholder="Tell us how we can help you..."
                            className={`w-full min-h-[120px] resize-none border-none shadow-sm bg-gray-100 ${
                              errors.message ? "border-red-500 bg-red-50" : ""
                            }`}
                            required
                          />
                          {errors.message && (
                            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                              <AlertCircle className="w-4 h-4" />
                              {errors.message}
                            </p>
                          )}
                        </div>
                      </StaggerItem>
                    </StaggerContainer>

                    {/* Success/Error Messages */}
                    {submitStatus === "success" && (
                      <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <p className="text-green-800 font-medium">
                          Message sent successfully! &apos;ll get back to you
                          soon.
                        </p>
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                        <p className="text-red-800 font-medium">
                          Failed to send message. Please try again or contact us
                          directly.
                        </p>
                      </div>
                    )}

                    <FadeIn delay={0.8}>
                      <HoverLift>
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#340168] hover:bg-[#280049] text-white py-3 text-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                      </HoverLift>
                    </FadeIn>

                    <TextReveal delay={0.9}>
                      <p className="text-sm animate-pulse text-gray-500 text-center mt-2">
                        We&apos;ll be with you shortly
                      </p>
                    </TextReveal>
                  </form>
                </div>
              </div>
            </SlideIn>
          </div>
        </div>
      </section>

      {/* Follow our handles section*/}
      <div className="px-5 md:px-[5%] pt-12 pb-16  flex flex-col lg:flex-row items-center gap-6 md:gap-0">
        <SlideIn direction="left" delay={0.2} className="w-full lg:w-1/2">
          <div>
            <FadeIn delay={0.3}>
              <div className="space-y-1">
                <TextReveal delay={0.1}>
                  <p className="text-[#300460] font-semibold text-lg">
                    Social Media
                  </p>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                    Follow us online
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
            </FadeIn>
            <div className="flex flex-col pt-5">
              <StaggerContainer delay={0.1}>
                <StaggerItem>
                  <div>
                    <div className="py-2">
                      <h2 className="font-semibold text-lg">
                        Connect with The Pistis Place Global
                      </h2>
                      <div className="flex items-center gap-0.5 mt-1">
                        <div className="h-1 w-8 bg-[#300460] rounded-full" />
                        <div className="h-1 w-4 bg-[#300460]/40 rounded-full" />
                      </div>
                      <div className="flex space-x-5 mt-4">
                        <SocialLink
                          href="https://www.instagram.com/thepistisplaceglobal?igsh=MWtsYmp0aXJwcmY2dw=="
                          icon={<Instagram className="w-5 h-5" />}
                        />
                        <SocialLink
                          href="https://www.facebook.com/thepistisplaceglobal"
                          icon={<Facebook className="w-5 h-5" />}
                        />
                        <SocialLink
                          href="https://www.youtube.com/@thepistisplaceglobal"
                          icon={<Youtube className="w-5 h-5" />}
                        />
                        <SocialLink
                          href="https://t.me/thepistisplaceglobal"
                          icon={<Send className="w-5 h-5" />}
                        />
                      </div>
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="py-4">
                    <h2 className="font-semibold text-lg">
                      Connect with Pastor Japheth Joseph
                    </h2>
                    <div className="flex items-center gap-0.5 mt-1">
                      <div className="h-1 w-8 bg-[#300460] rounded-full" />
                      <div className="h-1 w-4 bg-[#300460]/40 rounded-full" />
                    </div>
                    <div className="flex space-x-5 mt-4">
                      <SocialLink
                        href="https://www.instagram.com/_japhethjoseph?igsh=MXYwajU1aWxjdTVodg=="
                        icon={<Instagram className="w-5 h-5" />}
                      />
                      <SocialLink
                        href="https://www.facebook.com/PastorJaphethJoseph"
                        icon={<Facebook className="w-5 h-5" />}
                      />
                      <SocialLink
                        href="https://www.youtube.com/@pastorjaphethjoseph"
                        icon={<Youtube className="w-5 h-5" />}
                      />
                      <SocialLink
                        href="https://www.japhethjoseph.com/"
                        icon={<LinkIcon className="w-5 h-5" />}
                      />
                    </div>
                  </div>
                </StaggerItem>
                <StaggerItem>
                  <div className="py-2">
                    <h2 className="font-semibold text-lg">
                      Connect with Pastor Grace Japheth
                    </h2>
                    <div className="flex items-center gap-0.5 mt-1">
                      <div className="h-1 w-8 bg-[#300460] rounded-full" />
                      <div className="h-1 w-4 bg-[#300460]/40 rounded-full" />
                    </div>
                    <div className="flex space-x-5 mt-4">
                      <SocialLink
                        href="https://www.instagram.com/_heneovaigrace?igsh=MXF0dWg2NWxlOG9qNA=="
                        icon={<Instagram className="w-5 h-5" />}
                      />
                      <SocialLink
                        href="https://www.facebook.com/graceirem2"
                        icon={<Facebook className="w-5 h-5" />}
                      />
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </SlideIn>
        <SlideIn direction="right" delay={0.4} className="w-full lg:w-1/2">
          <RotateIn delay={0.6}>
            <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl">
              <Image
                src="/follow.jpg"
                alt="Follow Us Online"
                width={800}
                height={600}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                quality={85}
              />
            </div>
          </RotateIn>
        </SlideIn>
      </div>

      {/* Call to Action */}
      <Cta />
      <Footer />
    </div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

const SocialLink = memo(function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <HoverLift>
      <Link
        href={href}
        className="w-8 h-8 p-1 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
      >
        {icon}
      </Link>
    </HoverLift>
  );
});

"use client";

import type React from "react";
import type { Variants } from "framer-motion";

import { motion } from "framer-motion";
import { Instagram, Youtube, Send, Facebook, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.footer
      className="bg-[#06040B] text-white pt-20 pb-6 border-t border-white/5"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={staggerContainer}
    >
      <div className="max-w-7xl px-5 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <motion.div
            variants={fadeInUp}
            className="md:col-span-5 lg:col-span-4 flex flex-col"
          >
            <Link href="/" className="w-32 mb-6 block cursor-pointer">
              <Image
                src="/KPR_logo.png"
                width={300}
                height={100}
                alt="The Pistis Place Logo"
                className="w-full h-auto"
                priority
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
              Birthing convictions in the hearts of men. A global family of believers pursuing God&apos;s presence and purpose.
            </p>

            <div className="flex flex-col gap-3 text-sm text-white/50 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#F21449]" />
                <span>Emerald Event Center, 119 Edet Akpan Ave, Uyo</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#F21449]" />
                <span>hello@thepistisplace.org</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#F21449]" />
                <span>+234 901 810 5369</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <SocialLink
                href="https://www.instagram.com/thepistisplaceglobal/"
                icon={<Instagram className="w-4 h-4" />}
              />
              <SocialLink
                href="https://www.facebook.com/thepistisplaceglobal"
                icon={<Facebook className="w-4 h-4" />}
              />
              <SocialLink
                href="https://www.youtube.com/@thepistisplaceglobal"
                icon={<Youtube className="w-4 h-4" />}
              />
              <SocialLink
                href="https://t.me/thepistisplaceglobal"
                icon={<Send className="w-4 h-4" />}
              />
            </div>
          </motion.div>

          {/* Links Columns */}
          <div className="md:col-span-7 lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-10">
            <FooterLinkColumn
              title="THE CHURCH"
              links={[
                { label: "About Us", href: "/about" },
                { label: "Homecells", href: "/homecells" },
                { label: "Partner with Us", href: "/partner" },
                { label: "Contact Us", href: "/contact" },
              ]}
              variants={fadeInUp}
            />
            <FooterLinkColumn
              title="MINISTRIES"
              links={[
                { label: "Sermons & Media", href: "/sermons" },
                { label: "Marriage Counselling", href: "/marriage-counselling" },
                { label: "Prayer & Counselling", href: "/counselling" },
              ]}
              variants={fadeInUp}
            />
            <FooterLinkColumn
              title="GATHERINGS"
              links={[
                { label: "Kingdom Prayer Retreat", href: "/" },
                { label: "Virtual Church", href: "/sermons" },
              ]}
              variants={fadeInUp}
            />
          </div>
        </div>

        {/* Footer Bottom */}
        <motion.div variants={fadeInUp} className="mt-20 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} <span className="text-white/70">The Pistis Place Global</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/40">
            <Link href="#" className="hover:text-white/80 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white/80 transition-colors">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}

// Helper Components
interface FooterLinkColumnProps {
  title: string;
  links: Array<{ label: string; href: string }>;
  variants: Variants;
}

function FooterLinkColumn({ title, links, variants }: FooterLinkColumnProps) {
  return (
    <motion.div variants={variants} className="flex flex-col">
      <h3 className="text-[11px] font-bold tracking-[0.2em] text-white/40 uppercase mb-6">
        {title}
      </h3>
      <ul className="flex flex-col gap-4">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-sm text-white/60 hover:text-white hover:translate-x-1 transition-all duration-300 inline-block font-medium"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

function SocialLink({ href, icon }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#F21449] hover:border-[#F21449] transition-all duration-300"
    >
      {icon}
    </a>
  );
}

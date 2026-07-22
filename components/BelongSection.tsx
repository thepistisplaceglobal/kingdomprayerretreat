"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const communities = [
  {
    category: "WHO WE ARE",
    title: "About Us",
    image: "/au.png",
    link: "/about",
  },
  {
    category: "OUR FAMILY GROUP",
    title: "Join The Family",
    image: "/family.png",
    link: "/contact",
  },
  {
    category: "OUR TRYBE",
    title: "Home Cells",
    image: "/cells.png",
    link: "/homecells",
  },
  {
    category: "PLUG IN",
    title: "Pistis Expressions",
    image: "/ph.png",
    link: "#",
  },
];

export default function BelongSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-10 md:py-12 px-3 md:px-[5%] max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 md:gap-6 mb-6 md:mb-12">
        <div className="space-y-2">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl text-[#300460] md:text-5xl lg:text-6xl font-bold tracking-tight bricolage"
          >
            Welcome Home!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg mx-auto text-[#8E8995]/70 font-medium"
          >
            Real Word, Real People Relevant Relationships
          </motion.p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className="p-3 rounded-full bg-[#300460] text-white hover:bg-[#300460] transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-3 rounded-full border border-black/10 hover:text-white hover:bg-[#947CAC] transition-colors"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
      >
        {communities.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative min-w-[300px] md:min-w-[400px] h-[350px] rounded-lg overflow-hidden group snap-start"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div>
                <p className="text-white/80 text-xs font-bold tracking-widest">
                  {item.category}
                </p>
                <h3 className="text-white text-2xl md:text-3xl font-bold leading-tight bricolage">
                  {item.title}
                </h3>
              </div>

              <button className="flex items-center gap-2 text-white font-semibold group/btn">
                <span className="text-sm">Learn More</span>
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover/btn:translate-x-1"
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

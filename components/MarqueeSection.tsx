"use client";

import { useMemo, memo } from "react";
import Image from "next/image";
import {
  Marquee,
  MarqueeItem,
  MarqueeFade,
  MarqueeContent,
} from "@/components/ui/Marquee";

interface SlideImage {
  id: number;
  src: string;
  alt: string;
  width?: number;
}

export const MarqueeSection = memo(function MarqueeSection() {
  // Array of images for the slideshow
  const slideImages: SlideImage[] = useMemo(
    () => [
      {
        id: 1,
        src: "/image1.jpg",
        alt: "Church Ministry 1",
        width: 320,
      },
      {
        id: 2,
        src: "/image2.jpg",
        alt: "Church Ministry 2",
        width: 320,
      },
      {
        id: 3,
        src: "/image3.jpg",
        alt: "Church Ministry 3",
        width: 384,
      },
      {
        id: 4,
        src: "/image4.jpg",
        alt: "Church Ministry 4",
        width: 320,
      },
      {
        id: 5,
        src: "/image5.jpg",
        alt: "Church Ministry 5",
        width: 320,
      },
      {
        id: 6,
        src: "/image6.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 7,
        src: "/image7.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 8,
        src: "/image8.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 9,
        src: "/image9.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 10,
        src: "/image10.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 11,
        src: "/image11.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 12,
        src: "/image12.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 13,
        src: "/image13.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
      {
        id: 14,
        src: "/image14.jpg",
        alt: "Church Ministry 6",
        width: 384,
      },
    ],
    [],
  );

  return (
    <div className="w-full py-8 md:py-16">
      {/* Marquee with image cards */}
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />
        <MarqueeContent>
          {slideImages.map((image) => (
            <MarqueeItem
              key={image.id}
              className={`h-[400px]`}
              style={{ width: `${image.width}px` }}
            >
              <div className="group relative rounded-lg overflow-hidden h-full shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 300px, 384px"
                  quality={65}
                  loading="lazy"
                />
                {/* Subtle overlay for better image quality */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
              </div>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  );
});

export default MarqueeSection;

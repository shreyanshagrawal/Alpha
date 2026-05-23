"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Props {
  images: string[];
  title: string;
}

export default function ProductCarousel({
  images,
  title,
}: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="space-y-4 max-w-full">
      {/* Carousel Wrapper */}
      <div className="relative group overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index} className="flex justify-center items-center">
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  width={800}
                  height={800}
                  priority={index === 0}
                  className="h-[400px] w-full object-contain p-6 select-none pointer-events-none"
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <CarouselPrevious className="relative left-0 translate-y-0 h-9 w-9 pointer-events-auto border bg-background/80 backdrop-blur shadow hover:bg-background" />
            <CarouselNext className="relative right-0 translate-y-0 h-9 w-9 pointer-events-auto border bg-background/80 backdrop-blur shadow hover:bg-background" />
          </div>
        </Carousel>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => api?.scrollTo(index)}
            className={`flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-200 ${
              current === index
                ? "border-primary scale-[0.98] ring-1 ring-primary/20"
                : "border-transparent hover:opacity-90"
            }`}
          >
            <Image
              src={image}
              alt={`${title} thumb ${index + 1}`}
              width={80}
              height={80}
              className="h-20 w-20 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
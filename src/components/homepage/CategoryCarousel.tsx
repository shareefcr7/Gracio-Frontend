"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as motion from "framer-motion/client";
import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type Category = { _id: string; name: string; image?: string };

export default function CategoryCarousel() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const api = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!api) { setLoading(false); return; }
    fetch(`${api}/category`)
      .then(res => {
        if (!res.ok || !res.headers.get("content-type")?.includes("application/json")) {
          throw new Error("Invalid response from server");
        }
        return res.json();
      })
      .then(data => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(err => {
        console.error("Failed to fetch categories:", err);
      })
      .finally(() => setLoading(false));
  }, [api]);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="max-w-frame mx-auto text-center px-4 xl:px-0">
      <motion.h2
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn([integralCF.className, "text-[32px] md:text-5xl mb-8 md:mb-14 capitalize"])}
      >
        Explore for More
      </motion.h2>

      <motion.div
        initial={{ y: "100px", opacity: 0 }}
        whileInView={{ y: "0", opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-3 animate-pulse shrink-0">
                <div className="w-[160px] h-[160px] rounded-full bg-brand/10" />
                <div className="h-4 w-24 bg-brand/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel opts={{ align: "start" }} className="w-full mb-6 md:mb-9">
            <CarouselContent className="mx-4 xl:mx-0 space-x-6">
              {categories.map(cat => (
                <CarouselItem key={cat._id} className="pl-0 basis-auto">
                  <Link
                    href={`/shop?categories=${encodeURIComponent(cat.name)}`}
                    className="flex flex-col items-center gap-3 group"
                  >
                    <div className="relative w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rounded-full overflow-hidden bg-[#f5ede4] border-2 border-transparent group-hover:border-brand transition-all duration-300 shrink-0">
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-all duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-4xl">
                          🛍️
                        </div>
                      )}
                    </div>
                    <span className="text-sm sm:text-base font-medium text-brand group-hover:text-brand-dark transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Prev / Next chevron buttons */}
            <CarouselPrevious
              className="hidden sm:flex -left-5 xl:-left-8 border-brand/20 text-brand hover:bg-brand hover:text-white hover:border-brand disabled:opacity-20"
            />
            <CarouselNext
              className="hidden sm:flex -right-5 xl:-right-8 border-brand/20 text-brand hover:bg-brand hover:text-white hover:border-brand disabled:opacity-20"
            />
          </Carousel>
        )}

        <Link
          href="/shop"
          className="inline-block px-[54px] py-4 border rounded-full hover:bg-brand hover:text-white text-brand transition-all font-medium text-sm sm:text-base border-brand/20"
        >
          View All
        </Link>
      </motion.div>
    </section>
  );
}

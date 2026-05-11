"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
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

  const fetchCategories = useCallback(async () => {
    if (!api) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${api}/category`);
      if (!res.ok) throw new Error("Failed to fetch");
      
      const data = await res.json();
      if (data.categories) {
        setCategories(data.categories);
      }
    } catch (err) {
      console.error("CategoryCarousel: Fetch failed", err);
    } finally {
      setLoading(false);
    }
  }, [api]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (!loading && categories.length === 0) return null;

  return (
    <section className="max-w-frame mx-auto text-center px-4 xl:px-0 py-16 md:py-24">
      <motion.h2
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn([
          integralCF.className,
          "text-[32px] md:text-5xl mb-12 md:mb-20 capitalize tracking-tight"
        ])}
      >
        EXPLORE OUR COLLECTIONS
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {loading ? (
          <div className="flex gap-8 justify-center overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-4 animate-pulse shrink-0">
                <div className="w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-full bg-[#f5ede4]" />
                <div className="h-4 w-24 bg-[#f5ede4] rounded" />
              </div>
            ))}
          </div>
        ) : (
          <Carousel opts={{ align: "start" }} className="w-full mb-12">
            <CarouselContent className="-ml-4 md:-ml-8">
              {categories.map((cat) => (
                <CarouselItem key={cat._id} className="pl-4 md:pl-8 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <Link
                    href={`/shop?categories=${encodeURIComponent(cat.name)}`}
                    className="flex flex-col items-center gap-5 group"
                  >
                    <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden bg-[#f5ede4] shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-2 border border-transparent group-hover:border-[#4b3121]/10">
                      {cat.image ? (
                        <Image
                          src={cat.image}
                          alt={cat.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-5xl grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all">
                          👜
                        </div>
                      )}
                    </div>
                    <span className="text-sm md:text-base font-bold text-[#4b3121] tracking-wide uppercase group-hover:text-black transition-colors">
                      {cat.name}
                    </span>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-12 border-[#4b3121]/10 hover:bg-[#4b3121] hover:text-white" />
            <CarouselNext className="hidden md:flex -right-12 border-[#4b3121]/10 hover:bg-[#4b3121] hover:text-white" />
          </Carousel>
        )}

        <Link
          href="/shop"
          className="inline-block px-10 py-4 border border-[#4b3121] rounded-full text-[#4b3121] text-sm uppercase tracking-widest font-medium hover:bg-[#4b3121] hover:text-white transition-all duration-300"
        >
          View All Categories
        </Link>
      </motion.div>
    </section>
  );
}

import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import Link from "next/link";
import React, { Suspense } from "react";
import CartBtn from "./CartBtn";
import SearchInput from "../SearchInput";
import Image from "next/image";

const TopNavbar = () => {
  return (
    <nav className="sticky top-0 bg-background z-20 shadow-sm border-b border-brand/5">
      <div className="flex relative max-w-frame mx-auto items-center justify-between md:justify-start py-2 md:py-3 px-4 xl:px-0">
        <div className="flex items-center">
          <Link
            href="/"
            className={cn([
              integralCF.className,
              "text-2xl lg:text-[32px] mr-3 lg:mr-10",
            ])}
          >
          <Image
            src="/images/gracio-logo.jpg"
            alt="Gracio Logo"
            width={90}
            height={90}
            className="rounded-full"
          />
          </Link>
        </div>
        <Suspense fallback={<div className="w-full md:mr-3 lg:mr-10 h-10 bg-[#fdf5e6] rounded-full animate-pulse" />}>
          <SearchInput />
        </Suspense>
        <div className="flex items-center">
          <Suspense fallback={<div className="w-6 h-6 mr-[14px]" />}>
            <CartBtn />
          </Suspense>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;

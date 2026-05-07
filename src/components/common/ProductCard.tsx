import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product.types";

type ProductCardProps = {
  data: Product;
  priority?: boolean;
  isCircle?: boolean;
};

const ProductCard = ({ data, priority = false, isCircle = false }: ProductCardProps) => {
  return (
    <Link
      href={`/shop/product/${data.id}/${data.title.split(" ").join("-")}`}
      className="flex flex-col items-start aspect-auto"
    >
      <div
        className={
          isCircle
            ? "relative bg-[#f5ede4] rounded-full w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px] lg:w-[260px] lg:h-[260px] xl:w-[295px] xl:h-[295px] mx-auto mb-3 overflow-hidden"
            : "relative bg-[#f5ede4] rounded-[13px] lg:rounded-[20px] w-full lg:max-w-[295px] aspect-square mb-2.5 xl:mb-4 overflow-hidden"
        }
      >
        {/* <Image
          src={data.srcUrl}
          fill
          sizes="(max-width: 768px) 50vw, 295px"
          className={`${isCircle ? "object-cover" : "object-contain rounded-md"} hover:scale-110 transition-all duration-500`}
          alt={data.title}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        /> */}
         <Image
    src={data.srcUrl}
    fill
    sizes="(max-width: 768px) 50vw, 295px"
    className={`${
      isCircle ? "object-cover" : "object-contain"
    } hover:scale-110 transition-all duration-500`}
    alt={data.title}
    priority={priority}
  />
      </div>
      <strong className="text-brand xl:text-xl">{data.title}</strong>
      <p className="text-brand/60 text-sm xl:text-base">{data.category}</p>
      <div className="flex items-center space-x-[5px] xl:space-x-2.5">
        <span className="font-bold text-brand text-xl xl:text-2xl">
          ₹{data.price}
        </span>
      </div>
    </Link>
  );
};

export default React.memo(ProductCard);

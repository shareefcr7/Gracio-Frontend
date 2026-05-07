"use client";

import React, { useState } from "react";
import CartCounter from "@/components/ui/CartCounter";
import { useAppDispatch } from "@/lib/hooks/redux";
import { addToCart } from "@/lib/features/carts/cartsSlice";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product.types";
import AddToCartBtn from "./AddToCartBtn";

type Props = {
  data: Product;
  attributes?: string[];
};

const AddToCardSection = ({ data, attributes = [] }: Props) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: data.id,
        name: data.title,
        srcUrl: data.srcUrl,
        price: data.price,
        attributes: attributes,
        quantity: quantity,
        discount: data.discount || { percentage: 0, amount: 0 },
      })
    );
    router.push("/cart");
  };

  return (
    <div className="fixed md:relative w-full bg-background border-t md:border-none border-brand/5 bottom-0 left-0 p-4 md:p-0 z-10 flex flex-row items-center gap-3">
      <div className="flex items-center gap-2">
        <CartCounter onAdd={setQuantity} onRemove={setQuantity} />
      </div>
      
      <div className="flex flex-1 gap-5">
        <div className="flex-1">
          <AddToCartBtn data={{ ...data, quantity }} attributes={attributes} />
        </div>
        <button 
          onClick={handleBuyNow}
          className="flex-1 bg-brand text-white font-bold py-3.5 rounded-full hover:bg-brand-dark transition-all active:scale-[0.98] text-sm sm:text-base uppercase"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddToCardSection;

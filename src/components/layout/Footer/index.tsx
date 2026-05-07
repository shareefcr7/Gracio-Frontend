import { cn } from "@/lib/utils";
import { integralCF } from "@/styles/fonts";
import { SocialNetworks } from "./footer.types";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";
import LinksSection from "./LinksSection";
import LayoutSpacing from "./LayoutSpacing";

const socialsData: SocialNetworks[] = [
  { id: 1, icon: <FaTwitter />, url: "https://twitter.com" },
  { id: 2, icon: <FaFacebookF />, url: "https://facebook.com" },
  {
    id: 3,
    icon: <FaInstagram />,
    url: "https://www.instagram.com/auravault06?igsh=NzBudmE1YTlsemNo",
  },
];

const Footer = () => {
  return (
    <footer className="mt-6 border-t border-brand-light/20">
      <div className="pt-6 md:pt-10 bg-brand-dark px-4 pb-4">
        <div className="max-w-frame mx-auto">
          <nav className="lg:grid lg:grid-cols-12 mb-6">
            <div className="flex flex-col lg:col-span-3 lg:max-w-[248px]">
              <h1
                className={cn([
                  integralCF.className,
                  "text-[24px] lg:text-[28px] mb-4 text-brand-light",
                ])}
              >
                Gracio ORGANIC
              </h1>
              <p className="text-brand-light/80 text-xs mb-6">
                At Gracio Organic, we bring the finest, organically grown
                spices, herbs and wellness products from nature to your
                table. Purest flavors and nutrients, just as nature intended.
              </p>
              <div className="flex items-center">
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className="bg-brand-light/10 hover:bg-brand-light hover:text-brand-dark text-brand-light transition-all mr-3 w-7 h-7 rounded-full border border-brand-light/20 flex items-center justify-center p-1.5"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className="hidden lg:grid col-span-9 lg:grid-cols-4 lg:pl-10">
              <LinksSection />
            </div>
            <div className="grid lg:hidden grid-cols-2 sm:grid-cols-4 mt-6 lg:mt-0">
              <LinksSection />
            </div>
          </nav>
          <hr className="h-[1px] border-t-brand-light/20 mb-4" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-light/60 text-xs">
              Gracio Organic © 2024-2025. All Rights Reserved.
            </p>
            <p className="text-brand-light/80 font-bold text-[10px] uppercase tracking-[0.2em]">
              Grace in every taste
            </p>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
import React from "react";
import tshirtLogo from "../../public/tshirt-logo.png";
import logo from "../../public/logo.png";
import Image from "next/image";
import { Amiri } from "next/font/google";
const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
});
export default function Header() {
  return (
    <div className="flex items-center justify-between gap-2">
      <Image
        alt="لوجو الكلية"
        className="size-20 object-contain sm:size-30"
        src={logo}
      />
      <p className={`${amiri.className} text-2xl font-bold sm:text-4xl`}>
        مَبْرُوكُ التَّخَرُّجِ
      </p>

      <Image
        alt="لوجو التيشيرت"
        className="size-20 object-contain sm:size-30"
        src={tshirtLogo}
      />
    </div>
  );
}

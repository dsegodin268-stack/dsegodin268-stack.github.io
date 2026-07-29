"use client";

import dynamic from "next/dynamic";

// three.js (~150kB) вантажиться окремим чанком після гідрації,
// не блокуючи initial load головної; до того — резерв місця 4:3.
const Hero3D = dynamic(() => import("@/components/fx/Hero3D"), {
  ssr: false,
  loading: () => <div aria-hidden className="relative aspect-[4/3]" />,
});

export default Hero3D;

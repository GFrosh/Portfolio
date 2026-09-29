"use client";

import dynamic from "next/dynamic";
import { useCapabilities } from "@/lib/capabilities";
import { HeroPoster } from "@/components/three/hero-poster";

/**
 * next/dynamic + ssr:false means three.js never ships in the initial HTML or
 * the LCP critical path. The poster renders immediately; the canvas swaps in
 * afterwards only when the device can afford it.
 */
const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
  loading: () => <HeroPoster />,
});

export function HeroCanvas() {
  const { ready, canRender3D } = useCapabilities();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden [mask-image:radial-gradient(120%_110%_at_70%_35%,#000_35%,transparent_78%)]"
    >
      {ready && canRender3D ? <HeroScene /> : <HeroPoster />}
    </div>
  );
}

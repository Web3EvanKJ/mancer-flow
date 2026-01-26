"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/layout/HeroSection";
import { FeaturesSection } from "@/components/layout/FeaturesSection";
import { HowItWorksSection } from "@/components/layout/HowItWorksSection";
import { CTASection } from "@/components/layout/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
}

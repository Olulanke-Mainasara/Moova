"use client";

import { useSessionStorage } from "react-use";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Sparkles,
  Calendar,
  Plane,
  Hotel,
  Camera,
  Mountain,
  Coffee,
  Music,
  Star,
  ArrowRight,
} from "lucide-react";
import Splash from "@/components/Custom/Splash/Splash";
import { Link } from "next-view-transitions";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { steps, moods } from "@/lib/staticData";

export default function Home() {
  const [splashed, setSplashed] = useSessionStorage("splashed");

  useEffect(() => {
    const timeOut = setTimeout(() => setSplashed("true"), 2500);
    window.addEventListener("beforeunload", () => setSplashed(""));

    return () => {
      clearTimeout(timeOut);
      window.removeEventListener("beforeunload", () => setSplashed(""));
    };
  }, [setSplashed]);

  return (
    <>
      {splashed !== "true" ? <Splash /> : ""}
      <main className="min-h-screen">
        <div
          className="min-h-screen bg-slate-900 text-white
        overflow-x-hidden"
        >
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-slate-900 to-green-900">
              <div className="absolute inset-0 opacity-20 bg-gradient-to-r from-emerald-800/30 to-green-800/30" />
            </div>

            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute opacity-10"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  {(() => {
                    const Icon = [MapPin, Mountain, Coffee][
                      Math.floor(Math.random() * 3)
                    ];
                    return <Icon className="w-6 h-6 text-emerald-400" />;
                  })()}
                </div>
              ))}
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-transparent">
                  Travel by Vibe,
                </span>
                <br />
                <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                  Not by Guidebook
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                AI-powered mood-based travel curator that generates personalized
                destinations, itineraries, and seamless bookings based on how
                you want to feel.
              </p>

              <SignedIn>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg transition-colors duration-300"
                  >
                    <Link href={"/dashboard"}>
                      Explore Your Vibe <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white border-0 px-8 py-4 text-lg shadow-lg transition-colors duration-300"
                  >
                    <Link href={"/dashboard"}>
                      Start Your Vibe Journey <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </SignedOut>
            </div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="py-20 bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    How It Works
                  </span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Three simple steps to your perfect mood-matched adventure
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors duration-300"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="mb-6">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4">
                          <step.icon className={`w-8 h-8 ${step.color}`} />
                        </div>
                        <Badge
                          variant="outline"
                          className="text-slate-400 border-slate-600"
                        >
                          {step.step}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-semibold mb-3 text-white">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Moods Showcase */}
          <section id="moods" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    Choose Your Vibe
                  </span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  Every mood deserves the perfect destination
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moods.map((mood, index) => (
                  <Link
                    href={`/dashboard/moods/${mood.id}`}
                    key={index}
                    prefetch={false}
                  >
                    <Card
                      key={mood.id}
                      className="group cursor-pointer border-slate-700 bg-slate-800/30 backdrop-blur-sm hover:bg-slate-800/50 transition-colors duration-300"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`w-full h-32 ${mood.color} rounded-lg mb-4 flex items-center justify-center text-4xl`}
                        >
                          {mood.emoji}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-white">
                          {mood.name}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {mood.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* AI Curator Demo */}
          <section className="py-20 bg-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                      Curator in Action
                    </span>
                  </h2>
                  <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                    Watch our system analyze your mood and instantly generate
                    personalized itineraries with hidden gems, local
                    experiences, and perfect timing.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-slate-300">
                        Mood-based destination matching
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-slate-300">
                        Real-time availability and pricing
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                      <span className="text-slate-300">
                        Local insights and hidden gems
                      </span>
                    </div>
                  </div>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-emerald-600/20 text-emerald-400 border-emerald-600/30">
                        Relax & Recharge
                      </Badge>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2 text-white">
                      Bali Wellness Retreat
                    </h3>
                    <p className="text-slate-400 mb-4">
                      5 days of yoga, meditation, and spa treatments in Ubud
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Plane className="w-4 h-4 text-blue-400" />
                          <span className="text-sm text-slate-300">Flight</span>
                        </div>
                        <span className="text-sm text-white">$680</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Hotel className="w-4 h-4 text-emerald-400" />
                          <span className="text-sm text-slate-300">Resort</span>
                        </div>
                        <span className="text-sm text-white">$320</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-slate-300">
                            Activities
                          </span>
                        </div>
                        <span className="text-sm text-white">$180</span>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white border-0">
                      Book This Vibe
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section id="features" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    Everything You Need
                  </span>
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  From discovery to booking, we&apos;ve got your entire journey
                  covered
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: Sparkles,
                    title: "Smart Curation",
                    desc: "Smart recommendations based on your mood",
                  },
                  {
                    icon: Plane,
                    title: "One-Tap Booking",
                    desc: "Flights, hotels, activities bundled seamlessly",
                  },
                  {
                    icon: Music,
                    title: "Curated Playlists",
                    desc: "Mood-matched music for your journey",
                  },
                  {
                    icon: Camera,
                    title: "Local Insights",
                    desc: "Hidden gems and cultural experiences",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-slate-800/30 border-slate-700 backdrop-blur-sm hover:bg-slate-800/50 transition-colors duration-300"
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-emerald-500" />
                      </div>
                      <h3 className="font-semibold mb-2 text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-400">{feature.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-gradient-to-r from-emerald-700 via-green-700 to-emerald-800">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Travel by Vibe?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who&apos;ve discovered their perfect
                destinations through mood-based curation.
              </p>
              <Button
                size="lg"
                className="bg-white text-emerald-800 hover:bg-slate-100 px-8 py-4 text-lg font-semibold shadow-lg transition-colors duration-300"
              >
                Start Your Vibe Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-slate-900 border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-2 mb-4 md:mb-0">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                    GoByVibe
                  </span>
                </div>
                <div className="flex space-x-6 text-slate-400">
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    Support
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500">
                <p>
                  &copy; 2025 GoByVibe. All rights reserved. Travel by vibe, not
                  by guidebook.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

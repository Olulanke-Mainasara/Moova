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
import { motion } from "framer-motion";
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
        <div className="min-h-screen overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute opacity-30 dark:opacity-10"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                >
                  {(() => {
                    const Icon = [MapPin, Mountain, Coffee][
                      Math.floor(Math.random() * 3)
                    ];
                    return <Icon className="w-6 h-6 text-indigo-400" />;
                  })()}
                </div>
              ))}
            </div>

            <motion.div
              initial={splashed ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.1, ease: "easeOut" }}
              className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <h1 className="text-4xl md:text-7xl mb-6 text-balance leading-tight text-neutral-900 dark:text-white">
                Plan by Mood.
                <br />
                Travel Like It Matters.
              </h1>

              <p className="md:text-2xl text-neutral-700 dark:text-neutral-300 mb-8 max-w-xl mx-auto leading-relaxed">
                AI-powered mood-based travel curator that generates personalized
                destinations, itineraries, and seamless bookings based on how
                you want to feel.
              </p>

              <SignedIn>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg transition-colors duration-300"
                  >
                    <Link href={"/dashboard"}>
                      Start Planning <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </SignedIn>

              <SignedOut>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    asChild
                    className="bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-8 py-4 text-lg shadow-lg transition-colors duration-300"
                  >
                    <Link href={"/dashboard"}>
                      Start Planning <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </SignedOut>
            </motion.div>
          </section>

          {/* How It Works */}
          <section
            id="how-it-works"
            className="py-20 bg-neutral-900 dark:bg-slate-800/50 rounded-t-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                  How Moova Works
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                  From feeling to flight in three simple steps
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="w-full"
                  >
                    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-colors duration-300">
                      <CardContent className="p-8 text-center">
                        <div className="mb-6">
                          <div className="w-16 h-16 mx-auto rounded-full bg-slate-700 flex items-center justify-center mb-4">
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
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Moods Showcase */}
          <section id="moods" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                  Pick a Mood
                </h2>
                <p className="text-xl dark:text-neutral-300 max-w-2xl mx-auto">
                  Every feeling belongs somewhere
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {moods.map((mood, index) => (
                  <Link
                    href={`/dashboard/moods/${mood.slug}`}
                    key={index}
                    prefetch={false}
                  >
                    <Card
                      key={mood.slug}
                      className="group cursor-pointer bg-neutral-900 hover:bg-neutral-800 dark:border-slate-700 dark:bg-slate-800/30 backdrop-blur-sm dark:hover:bg-slate-800/50 transition-colors duration-300"
                    >
                      <CardContent className="p-6">
                        <div
                          className={`w-full h-32 ${mood.color} rounded-lg mb-4 flex items-center justify-center text-7xl`}
                        >
                          {mood.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {mood.title}
                        </h3>
                        <p className="text-slate-400">{mood.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* AI Curator Demo */}
          <section className="py-20 bg-neutral-900 dark:bg-slate-800/50 rounded-b-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
                    See the Curator Work
                  </h2>
                  <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                    Watch Moova read your vibe and spin up tailored itineraries
                    with local gems, can’t-miss moments, and timings that just
                    fit.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span className="text-slate-300">
                        Mood-first destination matching
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-slate-300">
                        Live availability and pricing
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                      <span className="text-slate-300">
                        Local insights and hidden corners
                      </span>
                    </div>
                  </div>
                </div>

                <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-indigo-600/20 text-indigo-400 border-indigo-600/30">
                        Relax and Recharge
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
                      Ubud Wellness Escape
                    </h3>
                    <p className="text-slate-400 mb-4">
                      Five days of yoga, meditation, and spa therapies in Ubud
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Plane className="w-4 h-4 text-sky-400" />
                          <span className="text-sm text-slate-300">Flight</span>
                        </div>
                        <span className="text-sm text-white">$680</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Hotel className="w-4 h-4 text-indigo-400" />
                          <span className="text-sm text-slate-300">Resort</span>
                        </div>
                        <span className="text-sm text-white">$320</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-purple-400" />
                          <span className="text-sm text-slate-300">
                            Activities
                          </span>
                        </div>
                        <span className="text-sm text-white">$180</span>
                      </div>
                    </div>

                    <Button
                      asChild
                      className="w-full bg-indigo-600 hover:bg-indigo-700 text-white border-0 text-lg"
                    >
                      <Link href={"/dashboard/moods/relax-and-recharge"}>
                        Book This Trip
                      </Link>
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
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
                  Built for Effortless Travel
                </h2>
                <p className="text-xl dark:text-neutral-300 max-w-2xl mx-auto">
                  From discovery to checkout, every step is smooth and connected
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
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: index * 0.06 }}
                    className="w-full"
                  >
                    <Card className="bg-neutral-900 dark:bg-slate-800/30 dark:border-slate-700 backdrop-blur-sm dark:hover:bg-slate-800/50 transition-colors duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-slate-700 rounded-lg flex items-center justify-center">
                          <feature.icon className="w-6 h-6 text-indigo-500" />
                        </div>
                        <h3 className="font-semibold mb-2 text-xl text-white">
                          {feature.title}
                        </h3>
                        <p className="text-slate-400">{feature.desc}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="py-20 bg-neutral-900 dark:bg-slate-800/50 rounded-t-2xl">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
                Ready to plan by mood?
              </h2>
              <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                Join travelers who plan trips around feelings—not checklists.
              </p>
              <Button
                asChild
                size="lg"
                className=" bg-indigo-600 hover:bg-indigo-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-lg transition-colors duration-300"
              >
                <Link href={"/dashboard"}>
                  Start Planning
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>
          </section>

          {/* Footer */}
          <footer className="border-t border-slate-800 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <Link href={"/"}>
                  <div className="flex items-center space-x-2 mb-4 md:mb-0">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                      Moova
                    </span>
                  </div>
                </Link>
                <div className="flex space-x-6 dark:text-neutral-300">
                  <a
                    href="#"
                    className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    Privacy
                  </a>
                  <a
                    href="#"
                    className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    Terms
                  </a>
                  <a
                    href="#"
                    className="hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors"
                  >
                    Support
                  </a>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-neutral-800 text-center dark:text-neutral-300">
                <p>
                  &copy; 2025 Moova. All rights reserved. Plan by mood, not by
                  checklist.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}

"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "next-view-transitions";
import { useClerkSupabaseClient } from "@/lib/clerkSupabaseClient";
import { toast } from "sonner";
import { Icons } from "@/components/icons";

interface Mood {
  id: string;
  slug: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const images = [
  "/gobyvibe1.jpg",
  "/gobyvibe2.jpg",
  "/gobyvibe3.jpg",
  "/gobyvibe4.jpg",
  "/gobyvibe5.webp",
];

const Dashboard = () => {
  const [moods, setMoods] = React.useState<Mood[]>([]);
  const [currentImageCount, setCurrentImageCount] = React.useState(0);
  const { supabase } = useClerkSupabaseClient();

  const fetchMoods = async () => {
    console.log("I ran");
    const { data, error } = await supabase.from("moods").select("*");
    if (error) {
      toast.error("Error fetching moods:", {
        description: error.message,
      });
      return [];
    }

    return data;
  };

  React.useEffect(() => {
    const getMoods = async () => {
      const moodsData = await fetchMoods();
      setMoods(moodsData);
    };

    getMoods();
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageCount((prevCount) =>
        prevCount === images.length - 1 ? 0 : prevCount + 1
      );
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center container mx-auto px-4">
      <section className="xl:w-1/2 bg-black h-full relative hidden xl:block">
        <AnimatePresence>
          <motion.img
            key={images[currentImageCount]}
            src={images[currentImageCount]}
            alt="Dashboard Illustration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2.5, delay: 1 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="w-full h-full object-cover hidden xl:block"
          />
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4">
            {Array.from({ length: images.length }).map((_, index) => (
              <div
                key={index}
                className={`h-3 w-3 ${
                  index === currentImageCount ? "bg-green-600" : "bg-white"
                } rounded-full`}
              ></div>
            ))}
          </div>
        </AnimatePresence>
      </section>
      <section className="space-y-3 text-center xl:w-1/2">
        <p className="text-2xl md:text-3xl">
          How are you feeling today
          <span className="text-green-600">?</span>
        </p>

        {moods.length === 0 ? (
          <p className="text-lg flex items-center justify-center gap-2">
            <Icons.spinner className="animate-spin" />
            Loading moods
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 max-w-4xl mx-auto md:flex md:flex-wrap justify-center px-4">
            {moods.map((mood) => (
              <Link
                key={mood.slug}
                href={`/dashboard/moods/${mood.slug}`}
                prefetch={false}
                className="border py-3 px-4 text-xl md:text-base rounded-lg text-center items-center flex flex-col md:flex-row md:rounded-full justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                <span className="text-3xl md:text-xl">{mood.icon}</span>
                {mood.title}
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

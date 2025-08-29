"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";

const moods = [
  {
    title: "Relax & Recharge",
    slug: "relax-and-recharge",
    icon: "🧘",
  },
  {
    title: "Thrill Seeker",
    slug: "thrill-seeker",
    icon: "😎",
  },
  {
    title: "Culture Explorer",
    slug: "culture-explorer",
    icon: "🌍",
  },
  {
    title: "Adventure Seeker",
    slug: "adventure-seeker",
    icon: "🏞️",
  },
  {
    title: "Romantic Escape",
    slug: "romantic-escape",
    icon: "❤️",
  },
  {
    title: "Creative Spark",
    slug: "creative-spark",
    icon: "🎨",
  },
  {
    title: "Party Energy",
    slug: "party-energy",
    icon: "🎉",
  },
];

const Dashboard = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-3 text-center"
      >
        <p className="text-2xl md:text-3xl">
          How are you feeling today
          <span className="text-green-600">?</span>
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-4xl md:flex md:flex-wrap justify-center px-4">
          {moods.map((mood) => (
            <Link
              key={mood.slug}
              href={`/dashboard/moods/${mood.slug}`}
              prefetch={false}
              className="border py-3 px-4 text-2xl md:text-base rounded-lg text-center flex flex-col md:flex-row md:rounded-full justify-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <span>{mood.icon}</span>
              {mood.title}
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;

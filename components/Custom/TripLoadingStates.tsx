import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Icons } from "../icons";

export const TripLoadingStates = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const loadingMessages = [
    { text: "Analyzing your preferences", emoji: "🔍" },
    { text: "Finding the perfect destination", emoji: "🌍" },
    { text: "Calculating your budget", emoji: "💰" },
    { text: "Curating amazing activities", emoji: "🎯" },
    { text: "Booking virtual accommodations", emoji: "🏨" },
    { text: "Planning your itinerary", emoji: "📅" },
    { text: "Adding cultural insights", emoji: "🎭" },
    { text: "Finding hidden gems", emoji: "💎" },
    { text: "Optimizing travel routes", emoji: "🗺️" },
    { text: "Adding final touches", emoji: "✨" },
  ];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex((prev) =>
        prev < loadingMessages.length - 1 ? prev + 1 : prev
      );
    }, 2500);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 10;
      });
    }, 700);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-center h-screen"
      >
        <div className="text-center max-w-md w-full px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMessageIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="mb-6"
            >
              <p className="text-3xl mb-2">
                {loadingMessages[currentMessageIndex].emoji}
              </p>
              <p className="text-2xl font-medium">
                {loadingMessages[currentMessageIndex].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              className="bg-indigo-600 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {Math.min(Math.round(progress), 95)}% complete
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

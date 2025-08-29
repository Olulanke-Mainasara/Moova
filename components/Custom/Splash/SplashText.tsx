import { motion } from "framer-motion";
import React from "react";

function SplashText() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        transition: { duration: 0.4, delay: 1 },
      }}
      className="flex items-center justify-center"
    >
      <h1>
        Go<span className="text-green-500">By</span>Vibe
      </h1>
    </motion.div>
  );
}

export default SplashText;

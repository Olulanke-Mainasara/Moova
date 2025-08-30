"use client";

import { MapPin, Menu, X } from "lucide-react";
import { Link } from "next-view-transitions";
import React, { useState } from "react";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  SignUpButton,
} from "@clerk/nextjs";
import { ThemeSwitcher } from "../theme-switcher";
import { Button } from "../../ui/button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-40 dark:bg-neutral-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={"/"}>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-green-700 rounded-lg flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-500 to-green-600 bg-clip-text text-transparent">
                GoByVibe
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/#how-it-works"
              className="hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/#moods"
              className="hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300 transition-colors"
            >
              Moods
            </Link>
            <Link
              href="/#features"
              className="hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300 transition-colors"
            >
              Features
            </Link>

            <SignedOut>
              <SignInButton>
                <button className="cursor-pointer border py-1.5 px-4 rounded-lg bg-neutral-600 text-white hover:bg-neutral-700 transition-colors">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              {pathname === "/dashboard" ? null : (
                <Link
                  href="/dashboard"
                  className="transition-colors border py-1.5 px-4 rounded-lg bg-neutral-600 hover:bg-neutral-700 text-white shadow-lg"
                >
                  Dashboard
                </Link>
              )}
              <UserButton />
            </SignedIn>
            <ThemeSwitcher />
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="md:hidden border-t border-neutral-400"
          >
            <div className="px-4 py-4 space-y-4 flex flex-col items-center">
              <Link
                href="/#how-it-works"
                className="block text-lg dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/#moods"
                className="block text-lg dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
              >
                Moods
              </Link>
              <Link
                href="/#features"
                className="block text-lg dark:text-neutral-300 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
              >
                Features
              </Link>
              <div className="flex items-center gap-4">
                <SignedOut>
                  <SignInButton>
                    <button className="cursor-pointer">Sign in</button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white border-0 px-6 py-4 text-lg shadow-lg transition-colors duration-300">
                      Get started
                    </Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  {pathname === "/dashboard" ? null : (
                    <Link
                      href="/dashboard"
                      className="transition-colors border py-1.5 px-4 rounded-lg bg-neutral-600 hover:bg-neutral-700 text-white shadow-lg"
                    >
                      Dashboard
                    </Link>
                  )}
                  <UserButton />
                </SignedIn>
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;

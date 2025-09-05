"use client";

import { MapPin, Menu, X } from "lucide-react";
import { Link } from "next-view-transitions";
import React, { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeSwitcher } from "../theme-switcher";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-40 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4">
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

            <SignedOut>
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
              <SignInButton>
                <button className="cursor-pointer border py-1.5 px-4 rounded-lg bg-neutral-600 text-white hover:bg-neutral-700 transition-colors">
                  Sign in
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link
                href="/dashboard/saved-trips"
                className="hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300 transition-colors"
              >
                Saved Trips
              </Link>
              <Link
                href="/dashboard/bookings"
                className="hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300 transition-colors"
              >
                Bookings
              </Link>
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

              <SignedOut>
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
                <div className="flex gap-4 items-center">
                  <SignInButton>
                    <button className="cursor-pointer border py-1.5 px-4 rounded-lg bg-neutral-600 text-white hover:bg-neutral-700 transition-colors">
                      Sign in
                    </button>
                  </SignInButton>
                  <ThemeSwitcher />
                </div>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard/saved-trips"
                  className="hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300 transition-colors"
                >
                  Saved Trips
                </Link>
                <Link
                  href="/dashboard/bookings"
                  className="hover:text-emerald-600 dark:text-neutral-300 dark:hover:text-emerald-300 transition-colors"
                >
                  Bookings
                </Link>
                {pathname === "/dashboard" ? null : (
                  <Link
                    href="/dashboard"
                    className="transition-colors border py-1.5 px-4 rounded-lg bg-neutral-600 hover:bg-neutral-700 text-white shadow-lg"
                  >
                    Dashboard
                  </Link>
                )}
                <div className="flex gap-4">
                  <UserButton />
                  <ThemeSwitcher />
                </div>
              </SignedIn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;

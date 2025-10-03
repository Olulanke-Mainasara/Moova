"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useClerkSupabaseClient } from "@/lib/clerkSupabaseClient";
import { slugToTitleCase } from "@/lib/utils";
import { Trip } from "@/types/Trip";
import { AnimatePresence } from "framer-motion";
import { Link, useTransitionRouter } from "next-view-transitions";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import BookTripTrigger from "@/components/Custom/Buttons/BookTripTrigger";

const SavedTrips = () => {
  const { user, supabase } = useClerkSupabaseClient();
  const [savedTrips, setSavedTrips] = useState<Trip[] | []>([]);
  const [fetchingTrips, setFetchingTrips] = useState(true);
  const [isBooking, setIsBooking] = useState(false);
  const [bookedTrip, setBookedTrip] = useState(false);
  const router = useTransitionRouter();

  const bookTrip = async (trip: any) => {
    if (!user) {
      toast.error("You must be logged in to save your trip.");
      return;
    }

    if (bookedTrip) {
      toast.error("You recently booked this trip.");
      return;
    }

    setIsBooking(true);
    const { error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: user.id,
          booking_data: trip as any,
          status: "booked",
        },
      ])
      .select();

    if (error) {
      toast.error("There was an error booking your trip. Please try again.", {
        description: error.message,
      });
      setIsBooking(false);
      return;
    }

    toast.success("Trip booked successfully!");
    setBookedTrip(true);
    router.push("/dashboard/moods/booking-successful");
  };

  const fetchSavedTrips = async () => {
    if (!user) {
      toast.error("You need to be logged in to view your saved trips.");
      return;
    }

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("user_id", user?.id);
    if (error) {
      toast.error("Error fetching saved trips:", {
        description: error.message,
      });
      return;
    }

    setSavedTrips(data);
    setFetchingTrips(false);
  };

  useEffect(() => {
    fetchSavedTrips();
  }, [user]);

  return (
    <section className="pt-18 min-h-screen px-4 container mx-auto">
      {isBooking && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center"
          >
            <div className="p-6 rounded-lg shadow-lg text-center">
              <p className="flex items-center text-2xl text-white">
                <Icons.spinner className="animate-spin mr-2" />
                Processing your booking
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl md:text-5xl">Saved Trips</h1>
          <Button asChild>
            <Link href={"/dashboard"}>Generate New Trip</Link>
          </Button>
        </div>
        <p className="text-neutral-500 text-lg">
          Here&apos;s a list of all your saved trips.
        </p>
      </div>

      <AnimatePresence>
        {fetchingTrips ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-xl md:text-2xl flex items-center">
              <Icons.spinner className="mr-2 animate-spin" /> Fetching Trips
            </p>
          </motion.div>
        ) : savedTrips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-2xl">No saved trips found.</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {savedTrips?.map((trip) => (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                key={trip.id}
                className="border rounded-lg p-4 space-y-2"
              >
                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <div className="w-full">
                    <h2 className="text-xl font-semibold">{trip.title}</h2>
                    <p className="text-neutral-500 text-lg xl:text-sm">
                      {trip.destination} • {slugToTitleCase(trip.mood_slug)}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="space-y-1">
                    <p className="text-2xl md:text-2xl">Start</p>
                    <p className="text-neutral-500">
                      {trip.timeframe.split(" - ")[0]}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-2xl">End</p>
                    <p className="text-neutral-500">
                      {trip.timeframe.split(" - ")[1]}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-2xl">{trip.budget}</p>
                    <p className="text-neutral-500">Estimated Budget</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <BookTripTrigger
                    bookTrip={() => bookTrip(trip.full_details)}
                  />
                  <Button asChild>
                    <Link href={`/dashboard/saved-trips/${trip.id}`}>
                      View Trip
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SavedTrips;

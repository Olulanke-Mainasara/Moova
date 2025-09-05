"use client";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useClerkSupabaseClient } from "@/lib/clerkSupabaseClient";
import { slugToTitleCase } from "@/lib/utils";
import { Trip } from "@/types/Trip";
import { Link, useTransitionRouter } from "next-view-transitions";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

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
        <div className="absolute inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="p-6 rounded-lg shadow-lg text-center">
            <p className="flex items-center text-2xl text-white">
              <Icons.spinner className="animate-spin mr-2" />
              Processing your booking
            </p>
          </div>
        </div>
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

      {fetchingTrips ? (
        <div>
          <p className="text-xl md:text-2xl flex items-center">
            <Icons.spinner className="mr-2 animate-spin" /> Fetching Trips
          </p>
        </div>
      ) : savedTrips.length === 0 ? (
        <div>
          <p className="text-2xl">No saved trips found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {savedTrips?.map((trip) => (
            <div key={trip.id} className="border rounded-lg p-4 space-y-2">
              <div className="flex flex-col md:flex-row gap-4 md:items-center">
                <div className="w-full">
                  <h2 className="text-2xl font-semibold">{trip.title}</h2>
                  <p className="text-neutral-500 text-lg xl:text-base">
                    {trip.destination} • {slugToTitleCase(trip.mood_slug)}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl">Start</p>
                  <p className="text-neutral-500">
                    {trip.timeframe.split(" - ")[0]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl">End</p>
                  <p className="text-neutral-500">
                    {trip.timeframe.split(" - ")[1]}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl md:text-3xl">{trip.budget}</p>
                  <p className="text-neutral-500">Estimated Budget</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => bookTrip(trip.full_details)}
                  className="bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white border-0 px-8 py-4 shadow-lg transition-colors duration-300"
                >
                  Book Trip
                </Button>
                <Button asChild>
                  <Link href={`/dashboard/saved-trips/${trip.id}`}>
                    View Trip
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default SavedTrips;

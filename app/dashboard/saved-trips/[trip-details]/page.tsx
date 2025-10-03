"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useClerkSupabaseClient } from "@/lib/clerkSupabaseClient";
import { convertRawDateToReadableDate } from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";
import { Trip } from "@/types/Trip";
import { ArrowDown } from "lucide-react";
import BookTripTrigger from "@/components/Custom/Buttons/BookTripTrigger";

type TripFullDetails = {
  destination?: {
    city?: string;
    country?: string;
  };
  mood?: string;
  timeframe?: {
    startDate?: string;
    endDate?: string;
  };
  budget?: {
    currency?: string;
    total?: number;
    breakdown?: { [key: string]: number };
  };
  itinerary?: Array<{
    day?: number;
    title?: string;
    description?: string;
    activities?: Array<{
      name?: string;
      category?: string;
      price?: number;
    }>;
  }>;
  extras?: {
    culturalInsights?: string[];
  };
};

type TripWithTypedDetails = Omit<Trip, "full_details"> & {
  full_details: TripFullDetails;
};

export default function TripDetails() {
  const pathname = usePathname();
  const { user, supabase } = useClerkSupabaseClient();
  const [tripId, setTripId] = useState<string | undefined>(
    pathname.split("/").pop()
  );
  const [tripDetails, setTripDetails] = useState<Trip | null>(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [bookedTrip, setBookedTrip] = useState(false);
  const [savedTrip, setSavedTrip] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const router = useTransitionRouter();

  const fetchSavedTrips = async () => {
    if (!user) {
      toast.error("You need to be logged in to view your saved trips.");
      return;
    }

    if (!tripId) {
      toast.error("Trip ID is missing.");
      return;
    }

    const { data, error } = await supabase
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    if (error) {
      toast.error("Error fetching saved trips:", {
        description: error.message,
      });
      return;
    }

    setTripDetails(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSavedTrips();
  }, [user]);

  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-center h-screen"
        >
          <p className="text-2xl flex items-center">
            <Icons.spinner className="mr-2 animate-spin" />
            Fetching trip details
          </p>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (!tripDetails) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full flex flex-col items-center justify-center gap-4 p-4 relative h-screen"
        >
          <p className="text-2xl">Failed to fetch trip details. Try again?</p>
          <Button
            onClick={() => router.refresh()}
            disabled={isLoading}
            className="text-lg"
          >
            Re-fetch Trip
          </Button>
        </motion.div>
      </AnimatePresence>
    );
  }

  const bookTrip = async () => {
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
          booking_data: tripDetails.full_details as any,
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
    setIsBooking(false);
    router.push("/dashboard/moods/booking-successful");
  };

  const saveTrip = async () => {
    if (!user) {
      toast.error("You must be logged in to save your trip.");
      return;
    }

    if (savedTrip) {
      toast.error("You have already saved this trip.");
      return;
    }

    setIsSaving(true);
    const { data, error } = await supabase
      .from("trips")
      .insert([
        {
          user_id: user.id,
          mood_slug: tripDetails.mood_slug ?? "",
          title: tripDetails.title ?? "",
          destination: tripDetails.destination,
          full_details: tripDetails.full_details as any,
          timeframe: tripDetails.timeframe,
          budget: tripDetails.budget,
        },
      ])
      .select();

    if (error) {
      toast.error("There was an error saving your trip. Please try again.", {
        description: error.message,
      });
      setIsSaving(false);
      return;
    }

    toast.success("Trip saved to your account!");
    setTripId(data[0].id);
    setSavedTrip(true);
    setIsSaving(false);
  };

  const removeTrip = async () => {
    if (!user) {
      toast.error("You must be logged in to save your trip.");
      return;
    }

    if (!savedTrip) {
      toast.error("You have not saved this trip.");
      return;
    }

    setIsRemoving(true);
    const { error } = await supabase
      .from("trips")
      .delete()
      .eq("id", tripId as string);

    if (error) {
      toast.error("There was an error removing your trip. Please try again.", {
        description: error.message,
      });
      return;
    }

    toast.success("Trip removed from your account!");
    setSavedTrip(false);
    setIsRemoving(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-4 px-4 max-w-4xl mx-auto flex items-center">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <section className="w-full">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 md:items-center">
              <div className="w-full">
                <h2 className="text-3xl md:text-4xl font-bold">
                  {tripDetails.title}
                </h2>
                <p className="text-neutral-500 text-lg md:text-2xl">
                  {
                    (tripDetails.full_details as TripFullDetails)?.destination
                      ?.city
                  }
                  ,{" "}
                  {
                    (tripDetails.full_details as TripFullDetails)?.destination
                      ?.country
                  }{" "}
                  • {(tripDetails.full_details as TripFullDetails)?.mood}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 items-center md:w-1/2">
                <div className="space-y-1">
                  <p className="font-medium text-2xl md:text-3xl">Start</p>
                  <p className="text-neutral-500">
                    {(tripDetails.full_details as TripFullDetails)?.timeframe
                      ?.startDate
                      ? convertRawDateToReadableDate(
                          (tripDetails.full_details as TripFullDetails)
                            ?.timeframe?.startDate as string
                        )
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-2xl md:text-3xl">End</p>
                  <p className="text-neutral-500">
                    {(tripDetails.full_details as TripFullDetails)?.timeframe
                      ?.endDate
                      ? convertRawDateToReadableDate(
                          (tripDetails.full_details as TripFullDetails)
                            ?.timeframe?.endDate as string
                        )
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-2xl md:text-3xl">
                    {
                      (tripDetails.full_details as TripFullDetails)?.budget
                        ?.currency
                    }
                    {(
                      tripDetails.full_details as TripFullDetails
                    )?.budget?.total?.toLocaleString()}
                  </p>
                  <p className="text-neutral-500">Total Estimated Budget</p>
                </div>
                <BookTripTrigger bookTrip={bookTrip} />
              </div>

              {/* Budget Breakdown */}
              <div className="bg-white dark:bg-slate-100 rounded-xl p-4 md:w-1/2">
                <p className="font-bold text-black mb-2 text-xl">
                  Budget Breakdown
                </p>
                <ul className="grid grid-cols-2 gap-4 ">
                  {Object.entries(
                    (tripDetails.full_details as TripFullDetails)?.budget
                      ?.breakdown ?? {}
                  ).map(([key, value]) => (
                    <li key={key} className="flex justify-between gap-4">
                      <span className="capitalize text-black">{key}</span>
                      <span className="text-black font-bold">
                        {
                          (tripDetails.full_details as TripFullDetails)?.budget
                            ?.currency
                        }
                        {value.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <Button
                variant="outline"
                onClick={() => setShowItinerary(!showItinerary)}
                className="w-full"
              >
                {showItinerary ? "Hide Itinerary" : "View Itinerary"}
              </Button>

              {
                <motion.hr
                  initial={{ opacity: 1 }}
                  animate={
                    showItinerary
                      ? { opacity: 0 }
                      : { opacity: 1, transition: { delay: 0.5 } }
                  }
                  className="mt-6"
                />
              }
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  showItinerary
                    ? {
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 1 },
                          opacity: { duration: 0.7 },
                        },
                      }
                    : {
                        height: 0,
                        opacity: 0,
                        overflow: "hidden",
                        transition: { duration: 0.5 },
                      }
                }
                className="space-y-10"
              >
                {(tripDetails.full_details as TripFullDetails)?.itinerary?.map(
                  (day) => (
                    <div
                      key={day?.day}
                      className="border-l-4 space-y-3 border-indigo-500 pl-4"
                    >
                      <h3 className="font-bold text-xl">
                        Day {day?.day}: {day?.title}
                      </h3>
                      <p className="text-neutral-500">{day?.description}</p>
                      <ul className="mt-2 space-y-1">
                        {day?.activities?.map((a, idx) => (
                          <li key={idx} className="flex justify-between">
                            <span>
                              {a?.name} •{" "}
                              <span className="text-neutral-500">
                                {a?.category}
                              </span>
                            </span>
                            <span>
                              {
                                (tripDetails.full_details as TripFullDetails)
                                  ?.budget?.currency
                              }
                              {a?.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Extras */}
              <div
                className={`bg-white dark:bg-slate-100 rounded-xl p-4 md:col-span-2 relative md:h-[200px] overflow-auto`}
              >
                <p className="font-bold text-black mb-2 text-xl flex justify-between items-center">
                  Extras{" "}
                  <span className="text-sm text-neutral-500 flex items-center gap-2">
                    scroll <ArrowDown className="w-4 h-4 text-indigo-600" />
                  </span>
                </p>
                <div className="text-slate-700 space-y-2">
                  {(
                    tripDetails.full_details as TripFullDetails
                  )?.extras?.culturalInsights?.map((insight, idx) => (
                    <div className="flex gap-2" key={idx}>
                      <span className="text-indigo-600 font-bold">&bull;</span>
                      <p className="text-black">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                {savedTrip ? (
                  <p className="text-2xl font-bold">Not feeling it?</p>
                ) : (
                  <p className="text-2xl font-bold">Keep this vibe!</p>
                )}
                {savedTrip ? (
                  <p className="text-neutral-500 mb-2">
                    Delete this trip details from your account, permanently.
                  </p>
                ) : (
                  <p className="text-neutral-500 mb-2">
                    Save your trip details to your account for easy access and
                    future reference.
                  </p>
                )}

                {savedTrip && (
                  <Button variant="destructive" onClick={removeTrip}>
                    {isRemoving ? (
                      <span className="flex items-center">
                        <Icons.spinner className="mr-2 animate-spin" />
                        Removing
                      </span>
                    ) : (
                      "Remove Trip"
                    )}
                  </Button>
                )}

                {!savedTrip && (
                  <Button onClick={saveTrip}>
                    {isSaving ? (
                      <span className="flex items-center">
                        <Icons.spinner className="mr-2 animate-spin" />
                        Saving
                      </span>
                    ) : (
                      "Save Trip"
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

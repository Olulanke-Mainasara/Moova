"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { tripSchema } from "@/app/api/mood-trip/schema";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";
import { toast } from "sonner";
import { useClerkSupabaseClient } from "@/lib/clerkSupabaseClient";
import AddTripPreferenceTrigger from "@/components/Custom/Buttons/AddTripPreferenceTrigger";
import { convertRawDateToReadableDate } from "@/lib/utils";
import { useTransitionRouter } from "next-view-transitions";
import { ArrowDown } from "lucide-react";
import BookTripTrigger from "@/components/Custom/Buttons/BookTripTrigger";

export default function Page() {
  const {
    isLoading,
    object: trip,
    submit,
  } = useObject({
    api: "/api/mood-trip",
    schema: tripSchema,
  });

  const pathname = usePathname();
  const mood = pathname.split("/").pop();
  const { user, supabase } = useClerkSupabaseClient();
  const [showItinerary, setShowItinerary] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [bookedTrip, setBookedTrip] = useState(false);
  const [savedTrip, setSavedTrip] = useState(false);
  const router = useTransitionRouter();

  useEffect(() => {
    submit({ mood: mood });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl flex items-center">
          <Icons.spinner className="mr-2 animate-spin" />
          Generating your trip
        </p>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-4 p-4 relative h-screen">
        <p className="text-2xl">Failed to generate trip. Try again?</p>
        <Button
          onClick={() =>
            submit({
              mood: mood,
            })
          }
          disabled={isLoading}
          className="text-lg"
        >
          Re-generate Trip
        </Button>
      </div>
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
    const { error } = await supabase
      .from("trips")
      .insert([
        {
          user_id: user.id,
          mood_slug: mood ?? "",
          title: trip.title ?? "",
          destination: `${trip.destination?.country ?? ""}, ${
            trip.destination?.city ?? ""
          }`,
          full_details: trip as any,
          timeframe: `${
            convertRawDateToReadableDate(trip.timeframe?.startDate ?? "") ?? ""
          } - ${
            convertRawDateToReadableDate(trip.timeframe?.endDate ?? "") ?? ""
          }`,
          budget: `${trip.budget?.currency ?? ""}${
            trip.budget?.total?.toLocaleString() ?? ""
          }`,
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
    setSavedTrip(true);
    setIsSaving(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-4 px-4 max-w-4xl mx-auto flex items-center">
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
                <h2 className="text-3xl md:text-4xl font-bold">{trip.title}</h2>
                <p className="text-neutral-500 text-lg md:text-2xl">
                  {trip.destination?.city}, {trip.destination?.country} •{" "}
                  {trip.mood}
                </p>
              </div>
              <AddTripPreferenceTrigger
                isLoading={isLoading}
                submit={submit}
                mood={mood}
                setSavedTrip={setSavedTrip}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-6 w-full">
              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 items-center md:w-1/2">
                <div className="space-y-1">
                  <p className="font-medium text-2xl md:text-3xl">Start</p>
                  <p className="text-neutral-500">
                    {trip.timeframe?.startDate
                      ? convertRawDateToReadableDate(trip.timeframe.startDate)
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-2xl md:text-3xl">End</p>
                  <p className="text-neutral-500">
                    {trip.timeframe?.endDate
                      ? convertRawDateToReadableDate(trip.timeframe.endDate)
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-2xl md:text-3xl">
                    {trip.budget?.currency}
                    {trip.budget?.total?.toLocaleString()}
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
                  {Object.entries(trip.budget?.breakdown ?? {}).map(
                    ([key, value]) => (
                      <li key={key} className="flex justify-between gap-4">
                        <span className="capitalize text-black">{key}</span>
                        <span className="text-black font-bold">
                          {trip.budget?.currency}
                          {value.toLocaleString()}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Itinerary */}
            <div>
              <Button
                variant="outline"
                onClick={() => setShowItinerary(!showItinerary)}
                className="w-full text-lg md:text-base"
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
                {trip.itinerary?.map((day) => (
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
                            {trip.budget?.currency}
                            {a?.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Extras */}
              <div className="bg-white dark:bg-slate-100 rounded-xl p-4 md:col-span-2 md:max-h-[200px] overflow-y-auto">
                <p className="font-bold text-black mb-2 text-xl flex justify-between items-center">
                  Extras{" "}
                  <span className="text-sm text-neutral-500 flex items-center gap-2">
                    scroll <ArrowDown className="w-4 h-4 text-indigo-600" />
                  </span>
                </p>
                <div className="text-slate-700 space-y-2">
                  {trip.extras?.culturalInsights?.map((insight, idx) => (
                    <div className="flex gap-2">
                      <span className="text-indigo-600 font-bold">&bull;</span>
                      <p key={idx} className="text-black">
                        {insight}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-2xl font-bold">Keep this vibe!</p>
                <p className="text-neutral-500 mb-2">
                  Save your trip details to your account for easy access and
                  future reference.
                </p>
                <Button onClick={saveTrip} className="text-lg md:text-base">
                  {isSaving ? (
                    <span className="flex items-center">
                      <Icons.spinner className="mr-2 animate-spin" />
                      Saving
                    </span>
                  ) : (
                    "Save Trip"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>
      </motion.div>
    </div>
  );
}

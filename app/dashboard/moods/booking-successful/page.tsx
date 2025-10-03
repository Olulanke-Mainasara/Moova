import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

const BookingSuccessful = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 p-4 relative h-screen">
      <h1 className="text-4xl">Booking Successful 🎉</h1>
      <p className="max-w-xl text-neutral-500 text-lg text-center">
        You have successfully booked a trip, check your dashboard to view it in
        the bookings page, and check your email for updates.
      </p>
      <Button className="py-5" asChild>
        <Link href="/dashboard/bookings">Bookings</Link>
      </Button>
    </div>
  );
};

export default BookingSuccessful;

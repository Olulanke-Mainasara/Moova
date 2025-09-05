"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useClerkSupabaseClient } from "@/lib/clerkSupabaseClient";
import { slugToTitleCase } from "@/lib/utils";
import { Booking } from "@/types/Booking";
import { Link } from "next-view-transitions";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Bookings = () => {
  const { user, supabase } = useClerkSupabaseClient();
  const [bookings, setBookings] = useState<Booking[] | []>([]);
  const [fetchingBookings, setFetchingBookings] = useState(true);

  const fetchBookings = async () => {
    if (!user) {
      toast.error("You need to be logged in to view your saved bookings.");
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Error fetching saved bookings:", {
        description: error.message,
      });
      return;
    }

    setBookings(data);
    setFetchingBookings(false);
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  return (
    <section className="pt-18 min-h-screen px-4 space-y-4 container mx-auto">
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl md:text-5xl">Bookings</h1>
          <Button asChild>
            <Link href={"/dashboard"}>Book New Trip</Link>
          </Button>
        </div>
        <p className="text-neutral-500 text-lg">Check out your booked trips.</p>
      </div>

      {fetchingBookings ? (
        <div>
          <p className="text-xl md:text-2xl flex items-center">
            <Icons.spinner className="mr-2 animate-spin" /> Fetching Bookings
          </p>
        </div>
      ) : bookings.length === 0 ? (
        <div>
          <p className="text-2xl">No bookings found.</p>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <Table>
            <TableCaption>A list of your recent bookings.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center text-xl">S/N</TableHead>
                <TableHead className="text-xl">Title</TableHead>
                <TableHead className="text-xl">Status</TableHead>
                <TableHead className="text-right text-xl">Budget</TableHead>
                <TableHead className="text-right text-xl">Booked on</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking, index) => {
                const bookingData = booking.booking_data as any;

                return (
                  <TableRow key={booking.id}>
                    <TableCell className="font-extralight text-center text-xl">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-xl flex gap-4 items-center">
                      <Badge>{slugToTitleCase(bookingData?.mood)}</Badge>
                      {bookingData?.title}
                    </TableCell>
                    <TableCell
                      className={`text-xl font-extralight first-letter:uppercase ${
                        booking.status === "booked"
                          ? "text-emerald-600"
                          : "text-amber-400"
                      }`}
                    >
                      {booking.status}
                    </TableCell>
                    <TableCell className="text-right font-extralight text-xl">
                      {bookingData?.budget.currency +
                        bookingData.budget.total.toFixed(0)}
                    </TableCell>
                    <TableCell className="text-right font-extralight text-xl">
                      {booking?.created_at
                        ? new Date(booking.created_at).toDateString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </section>
  );
};

export default Bookings;

import { Database } from "@/supabase";

export type Booking = Database["public"]["Tables"]["bookings"]["Row"];

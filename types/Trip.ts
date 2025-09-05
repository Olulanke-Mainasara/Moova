import { Database } from "@/supabase";

export type Trip = Database["public"]["Tables"]["trips"]["Row"];

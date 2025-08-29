// app/api/webhooks/clerk/route.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { supabase } from "@/lib/serverSupabaseClient";

export async function POST(req: NextRequest) {
  try {
    // Verify Clerk webhook
    const evt = await verifyWebhook(req);

    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    let email: string | null = null;
    let fullName: string | null = null;

    // Only destructure if evt.data is a user object
    if (
      evt.type === "user.created" ||
      evt.type === "user.updated" ||
      evt.type === "user.deleted"
    ) {
      const userData = evt.data as {
        id: string;
        email_addresses?: { email_address: string }[];
        first_name?: string;
        last_name?: string;
      };

      fullName =
        [userData.first_name, userData.last_name].filter(Boolean).join(" ") ||
        null;
      email = userData.email_addresses?.[0]?.email_address || null;
    }

    if ((evt.type === "user.created" || evt.type === "user.updated") && id) {
      // Upsert into Supabase profiles
      await supabase.from("profiles").upsert({
        user_id: id, // Clerk user_id
        name: fullName,
        email: email,
      });
    }

    if (evt.type === "user.deleted") {
      // Delete profile (and cascade if foreign keys are set)
      await supabase.from("profiles").delete().eq("user_id", id);

      // OPTIONAL: if you want to also clean up related data manually:
      // await supabase.from("articles").delete().eq("user_id", id);
      // await supabase.from("preferences").delete().eq("user_id", id);
      // (Or set `ON DELETE CASCADE` on foreign keys in SQL so this happens automatically)
    }

    return NextResponse.json({ status: "success" });
  } catch (err) {
    console.error("Webhook error:", err);
    return new NextResponse("Error verifying webhook", { status: 400 });
  }
}

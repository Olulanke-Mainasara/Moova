import { generateTitleFromUserMessage } from "@/app/dashboard/moods/[mood]/action";
import { google } from "@ai-sdk/google";
import { UIMessage, streamObject } from "ai";
import { tripSchema } from "./schema";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: google("gemini-2.0-flash"),
    schema: tripSchema,
    prompt: `
    Generate a single detailed trip plan based on this context: ${context}

    The trip should include:
    - Destination (city, country)
    - Suggested accommodations with price ranges
    - Key activities or experiences aligned with the mood
    - Estimated total cost
    - Duration and best travel period
    - Cultural insights, tips, or hidden gems

    Make the trip feel curated, exciting, and practical for the traveler.
    Use the symbol for currency: ${
      context.currency || "any"
    } where applicable (e.g., $, €, £, ¥, ₦, etc).
    The mood used should be the one in the context converted to normal text instead of in slug form, and the first word should be capitalized while every other word should be lowercase: ${
      context.mood
    }
    The budget: ${context.budget || "any"} and the timeframe: ${
      context.timeframe || "any"
    } should be used to curate the trip plan.
    Ensure the trip plan is realistic and achievable within the given budget and timeframe.
    Use the location: ${
      context.location || "anywhere"
    } to suggest a destination nearby if possible.
  `,
  });

  return result.toTextStreamResponse();
}

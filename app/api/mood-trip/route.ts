import { google } from "@ai-sdk/google";
import { streamObject } from "ai";
import { tripSchema } from "./schema";
import { getCurrencySymbol } from "@/lib/utils";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  // Pre-process and validate context
  const processedMood = context.mood
    ? context.mood
        .split("-")
        .map((word: string, idx: number) =>
          idx === 0
            ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            : word.toLowerCase()
        )
        .join(" ")
    : "Flexible";

  const currencySymbol = getCurrencySymbol(context.currency);
  const currencyCode = context.currency?.toUpperCase() || "USD";
  const budgetValue = context.budget || "flexible";
  const timeframeValue = context.timeframe || "flexible";
  const userLocation = context.location || "global";

  const result = streamObject({
    model: google("gemini-2.0-flash"),
    schema: tripSchema,
    prompt: `
      You are an expert travel planning AI with deep knowledge of global destinations, cultural nuances, pricing data, and travel logistics. Your task is to generate ONE comprehensive, realistic, and actionable trip plan.

      ## CRITICAL REQUIREMENTS - MUST FOLLOW EXACTLY:

      ### 1. CONTEXT ADHERENCE (HIGHEST PRIORITY)
      - User's mood/vibe: "${processedMood}"
      - Currency: ${currencySymbol} (${currencyCode})
      - Budget constraint: ${budgetValue}
      - Timeframe: ${timeframeValue}
      - User location: ${userLocation}

      **STRICT RULE**: The generated trip MUST align with ALL context parameters. If budget is "low", DO NOT suggest luxury accommodations. If mood is "Relax recharge", DO NOT suggest extreme sports as primary activities.

      ### 2. DESTINATION SELECTION RULES
      - If user location is provided, prioritize destinations within reasonable travel distance (consider flight costs in budget)
      - Destination MUST match the mood perfectly (e.g., "Adventure seeker" → destinations with outdoor activities, "Romantic getaway" → intimate, scenic locations)
      - Country and city MUST be real, existing locations
      - Coordinates (lat/lng) MUST be accurate to 2 decimal places minimum
      - Consider visa requirements, safety, and seasonal factors for the user's nationality

      ### 3. TIMEFRAME & DATES (STRICT VALIDATION)
      - Current date context: October 2025
      - startDate MUST be in ISO 8601 datetime format with timezone: YYYY-MM-DDTHH:mm:ss.sssZ
      - endDate MUST be after startDate
      - durationDays MUST exactly match the difference between start and end dates
      - If timeframe is "weekend", set exactly 2-3 days; "week", set 5-7 days; "two weeks", set 12-16 days
      - Suggest optimal travel dates based on:
        * Destination's peak/off-peak seasons
        * Weather patterns
        * Local festivals or events that enhance the mood
        * Price optimization (avoid peak pricing if budget is constrained)

      ### 4. BUDGET BREAKDOWN (MATHEMATICAL PRECISION REQUIRED)
      - Total budget MUST equal the EXACT sum of: flights + housing + activities + food + transport
      - All prices MUST be in the specified currency: ${currencySymbol}
      - Use the currency SYMBOL (${currencySymbol}) in all descriptions and display text
      - The budget.currency field in the response schema must use the currency SYMBOL: ${currencySymbol}
      - Budget allocation percentages (use as guidelines):
        * Flights: 25-35% of total (adjust based on distance from user location)
        * Housing: 30-40% of total
        * Activities: 15-25% of total
        * Food: 10-15% of total
        * Transport: 5-10% of total
      - Price ranges by budget tier:
        * "budget"/"low": Total $500-1500 (or equivalent)
        * "moderate"/"medium": Total $1500-4000
        * "comfortable"/"high": Total $4000-8000
        * "luxury"/"premium": Total $8000+
      - ALL numerical values must be realistic for 2025 pricing
      - Research current average costs for the destination and reflect them accurately

      ### 5. ITINERARY CONSTRUCTION (DAY-BY-DAY LOGIC)
      - Create detailed plans for EACH day matching durationDays exactly
      - Day numbering: Start at 1, increment sequentially, no gaps
      - Each day MUST include 3-5 activities minimum
      - Total durationHours per day should be realistic: 6-10 hours (account for travel time, meals, rest)
      - Activities MUST:
        * Match the mood theme consistently across all days
        * Be real, bookable experiences (no fictional attractions)
        * Include specific location names (street addresses where applicable)
        * Have realistic price estimates based on 2025 market rates
        * Have logical sequencing (morning activities → afternoon → evening)
        * Progress naturally (e.g., Day 1: arrival + light exploring, Day 2-3: main experiences, Final day: departure prep)
      - Activity categories must be from: sightseeing, adventure, culture, relaxation, dining, entertainment, shopping, nature, sports, nightlife
      - Balance high-energy and low-energy activities within each day

      ### 6. ACCOMMODATIONS (MUST BE REALISTIC)
      - Suggest 1-3 accommodation options that fit the budget tier
      - Each accommodation MUST have:
        * Real establishment name (or realistic fictional name with [Suggested] prefix if unable to verify)
        * Accurate type classification: hotel, hostel, resort, Airbnb, boutique hotel, guesthouse, villa
        * Specific location within the destination city (neighborhood or district)
        * PricePerNight that aligns with the budget breakdown (total housing cost ÷ number of nights)
        * Rating between 3.5-5.0 for moderate+ budgets; 3.0-4.5 for budget tier
      - Ensure accommodation location is convenient to majority of planned activities

      ### 7. TRANSPORT SEGMENTS (COMPLETE LOGISTICS)
      - Include ALL major transport segments:
        * Outbound flight from user location to destination
        * Return flight from destination to user location
        * Ground transport on Day 1 (airport → accommodation)
        * Any inter-city transport if itinerary includes multiple locations
        * Final day transport (accommodation → airport)
      - Each transport entry MUST have:
        * Realistic provider names (airlines, train services, local taxi/uber services)
        * Departure time in ISO 8601 format matching the itinerary day
        * Arrival time logically calculated (real flight/train durations)
        * Prices reflecting 2025 market rates and booking class matching budget tier
      - Transport costs MUST sum to match the transport breakdown value

      ### 8. EXTRAS - HIGH-VALUE ADDITIONS
      - blogs: Provide 3-5 REAL, existing blog URLs about the destination (format: https://...)
        * Prioritize recent posts (2023-2025)
        * Focus on blogs matching the trip mood
        * Verify URLs are accessible (no broken links)
      - playlists: Suggest 3-4 Spotify/Apple Music playlist URLs or specific playlist names that match the mood
        * Examples: "Relaxing Beach Vibes" for tropical trips, "European Road Trip Anthems" for adventure travel
      - culturalInsights: Provide 5-8 specific, actionable tips:
        * Local customs and etiquette (greetings, tipping, dress codes)
        * Language basics (5-10 essential phrases with pronunciation)
        * Safety considerations specific to the destination
        * Best local food specialties to try
        * Hidden gems or local favorites unknown to typical tourists
        * Money-saving tips (local markets vs tourist traps)
        * Best times to visit attractions (avoid crowds)

      ### 9. QUALITY ASSURANCE CHECKLIST
      Before finalizing, verify:
      - [ ] All dates are valid ISO 8601 format with proper timezone
      - [ ] Budget breakdown sums to exactly the total value
      - [ ] Number of itinerary days matches durationDays
      - [ ] All activities have prices > 0 and duration > 0
      - [ ] Accommodations pricePerNight × nights ≈ housing budget
      - [ ] Transport costs sum to transport budget allocation
      - [ ] No placeholder text like "TBD", "Example Hotel", "Various activities"
      - [ ] All locations are specific (no vague "downtown" or "city center")
      - [ ] Mood is reflected consistently throughout (activities, accommodation style, pacing)
      - [ ] The trip is practically executable with provided information

      ### 10. TONE & STYLE
      - Title: Engaging, 4-8 words, captures mood + destination (e.g., "Sunset Serenity in Santorini" not "Trip to Greece")
      - Descriptions: Vivid, inspiring but practical language
      - Avoid clichés: No "hidden gem" without specificity, no "must-see" without explanation
      - Write descriptions at 50-150 words per day
      - Use active voice and second person ("you'll explore", "you'll discover")

      ### 11. ERROR PREVENTION
      - If context values are missing/invalid, use intelligent defaults:
        * Missing budget → Use "moderate" tier ($2000-3000)
        * Missing timeframe → Default to 5-7 days
        * Missing location → Select globally popular destination matching mood
        * Missing currency → Use USD
      - NEVER generate impossible combinations (e.g., 10-day trip with $200 budget)
      - NEVER suggest destinations with travel advisories or safety concerns
      - NEVER include activities requiring advance skills without warnings

      ## FINAL VALIDATION:
      Double-check that every field in the schema is populated with realistic, accurate, and contextually appropriate data. The user should be able to execute this trip plan with minimal additional research.

      Generate the trip plan now using the provided context parameters.
    `,
  });

  return result.toTextStreamResponse();
}

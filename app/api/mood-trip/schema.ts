import { z } from "zod";

export const tripSchema = z.object({
  id: z.uuid().describe("Unique identifier for the trip."),
  title: z
    .string()
    .describe(
      "A short, catchy title for the trip (e.g., 'Romantic Escape in Paris')."
    ),
  mood: z
    .string()
    .describe(
      "The selected mood or vibe of the trip (e.g., relax-recharge, thrill-seeker)."
    ),
  destination: z.object({
    country: z.string().describe("Country where the trip takes place."),
    city: z.string().describe("City or region of the destination."),
    coordinates: z
      .object({
        lat: z.number().describe("Latitude of the destination."),
        lng: z.number().describe("Longitude of the destination."),
      })
      .optional(),
  }),
  timeframe: z.object({
    startDate: z.iso.datetime().describe("Start date of the trip."),
    endDate: z.iso.datetime().describe("End date of the trip."),
    durationDays: z.number().describe("Number of days the trip lasts."),
  }),
  budget: z.object({
    currency: z.string().describe("Currency code (e.g., USD, EUR)."),
    total: z.number().describe("Estimated total cost of the trip."),
    breakdown: z.object({
      flights: z.number().describe("Estimated cost of flights."),
      housing: z.number().describe("Estimated cost of hotels or stays."),
      activities: z.number().describe("Estimated cost of activities."),
      food: z.number().describe("Estimated cost of meals."),
      transport: z.number().describe("Estimated cost of local transportation."),
    }),
  }),
  itinerary: z.array(
    z.object({
      day: z.number().describe("Day number in the itinerary."),
      title: z.string().describe("Short title for the day's plan."),
      description: z
        .string()
        .describe("Detailed description of the day's activities."),
      activities: z.array(
        z.object({
          name: z.string().describe("Activity name."),
          category: z
            .string()
            .describe(
              "Type of activity (e.g., sightseeing, adventure, culture)."
            ),
          location: z.string().describe("Location of the activity."),
          price: z.number().describe("Estimated price of the activity."),
          durationHours: z.number().describe("Expected duration in hours."),
        })
      ),
    })
  ),
  accommodations: z.array(
    z.object({
      name: z.string().describe("Hotel or stay name."),
      type: z
        .string()
        .describe("Type of accommodation (e.g., hotel, hostel, Airbnb)."),
      location: z.string().describe("Location of the accommodation."),
      pricePerNight: z.number().describe("Cost per night."),
      rating: z.number().min(0).max(5).describe("User rating from 0 to 5."),
    })
  ),
  transport: z.array(
    z.object({
      type: z
        .string()
        .describe("Type of transport (e.g., flight, train, taxi, rental car)."),
      provider: z.string().describe("Transport provider or company."),
      departure: z.iso.datetime().describe("Departure time."),
      arrival: z.iso.datetime().describe("Arrival time."),
      price: z.number().describe("Cost of this transport segment."),
    })
  ),
  extras: z.object({
    blogs: z
      .array(z.string())
      .describe("Links to curated blog posts for this trip."),
    playlists: z
      .array(z.string())
      .describe("Links to playlists that match the trip's vibe."),
    culturalInsights: z
      .array(z.string())
      .describe("Key cultural tips and insights about the destination."),
  }),
});

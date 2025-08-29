import { Heart, Plane, Sparkles } from "lucide-react";

export const moods = [
  {
    id: "relax-and-recharge",
    name: "Relax & Recharge",
    emoji: "🧘‍♀️",
    color: "bg-gradient-to-br from-emerald-600 to-green-700",
    description: "Peaceful retreats and wellness escapes",
  },
  {
    id: "thrill-seeker",
    name: "Thrill Seeker",
    emoji: "🏔️",
    color: "bg-gradient-to-br from-slate-600 to-slate-700",
    description: "Adventure sports and adrenaline rushes",
  },
  {
    id: "culture-explorer",
    name: "Culture Explorer",
    emoji: "🏛️",
    color: "bg-gradient-to-br from-green-600 to-emerald-700",
    description: "Museums, history, and local traditions",
  },
  {
    id: "foodie-adventure",
    name: "Foodie Adventure",
    emoji: "🍜",
    color: "bg-gradient-to-br from-amber-700 to-yellow-800",
    description: "Culinary tours and local delicacies",
  },
  {
    id: "romantic-getaway",
    name: "Romantic Getaway",
    emoji: "💕",
    color: "bg-gradient-to-br from-rose-700 to-pink-800",
    description: "Intimate moments and couple experiences",
  },
  {
    id: "social-butterfly",
    name: "Social Butterfly",
    emoji: "🎉",
    color: "bg-gradient-to-br from-blue-700 to-indigo-800",
    description: "Nightlife, festivals, and group activities",
  },
];

export const steps = [
  {
    step: "01",
    title: "Pick Your Mood",
    description: "Tell us how you want to feel on your next adventure",
    icon: Heart,
    color: "text-emerald-500",
  },
  {
    step: "02",
    title: "Get AI Curated Trips",
    description: "Our AI finds perfect destinations matching your vibe",
    icon: Sparkles,
    color: "text-green-500",
  },
  {
    step: "03",
    title: "Book in One Tap",
    description: "Flights, hotels, and activities bundled seamlessly",
    icon: Plane,
    color: "text-emerald-600",
  },
];

export const trip = {
  accommodations: [
    {
      location: "Kyoto, Japan",
      name: "Hotel Granvia Kyoto",
      pricePerNight: 250.0,
      rating: 4.5,
      type: "Hotel",
    },
    {
      location: "Kyoto, Japan",
      name: "Ryokan Yoshida-sanso",
      pricePerNight: 400.0,
      rating: 4.8,
      type: "Ryokan",
    },
    {
      location: "Kyoto, Japan",
      name: "Piece Hostel Kyoto",
      pricePerNight: 40.0,
      rating: 4.2,
      type: "Hostel",
    },
  ],
  budget: {
    breakdown: {
      accommodation: 1470.0,
      activities: 500.0,
      flights: 1200.0,
      food: 600.0,
      transport: 200.0,
    },
    currency: "$",
    total: 3970.0,
  },
  destination: {
    city: "Kyoto",
    country: "Japan",
    coordinates: {
      lat: 35.0116,
      lng: 135.7681,
    },
  },
  extras: {
    blogs: [
      "https://www.japan-guide.com/e/e2158.html",
      "https://matcha-jp.com/en/131",
    ],
    culturalInsights: [
      "Learn basic Japanese phrases for better interactions.",
      "Respect temple etiquette: be quiet and follow guidelines.",
      "Try a traditional tea ceremony for cultural immersion.",
    ],
    playlists: [
      "https://open.spotify.com/playlist/37i9dQZF1DWWGFQLx0Phaw",
      "https://music.youtube.com/playlist?list=PLGznElQw96bFoJT8RttMkx_pKA7l5LgGL",
    ],
  },
  id: "kyoto-cultural-immersion",
  itinerary: [
    {
      activities: [
        {
          category: "Sightseeing",
          durationHours: 3.0,
          location: "Fushimi Inari Shrine",
          name: "Explore the thousands of red torii gates",
          price: 0.0,
        },
        {
          category: "Culture",
          durationHours: 2.0,
          location: "Gion District",
          name: "Wander through Gion, Kyoto's geisha district",
          price: 0.0,
        },
        {
          category: "Food",
          durationHours: 2.0,
          location: "Nishiki Market",
          name: "Sample local delicacies at Nishiki Market",
          price: 30.0,
        },
      ],
      day: 1.0,
      description:
        "Begin your Kyoto journey with the iconic Fushimi Inari Shrine. Afterwards, immerse yourself in the traditional atmosphere of Gion and savor local flavors at Nishiki Market.",
      title: "Arrival & Kyoto's Highlights",
    },
    {
      activities: [
        {
          category: "Sightseeing",
          durationHours: 4.0,
          location: "Kinkaku-ji (Golden Pavilion)",
          name: "Visit the breathtaking Golden Pavilion",
          price: 5.0,
        },
        {
          category: "Culture",
          durationHours: 3.0,
          location: "Ryoan-ji Temple",
          name: "Meditate at the Zen garden of Ryoan-ji Temple",
          price: 6.0,
        },
        {
          category: "Food",
          durationHours: 2.0,
          location: "Local Restaurant",
          name: "Enjoy a traditional Kaiseki dinner",
          price: 80.0,
        },
      ],
      day: 2.0,
      description:
        "Visit the Golden Pavilion and find serenity at Ryoan-ji Temple's Zen garden. Indulge in a traditional Kaiseki dinner.",
      title: "Temples & Zen Gardens",
    },
    {
      activities: [
        {
          category: "Sightseeing",
          durationHours: 4.0,
          location: "Arashiyama Bamboo Grove",
          name: "Explore the enchanting Arashiyama Bamboo Grove",
          price: 0.0,
        },
        {
          category: "Culture",
          durationHours: 3.0,
          location: "Tenryu-ji Temple",
          name: "Discover the beauty of Tenryu-ji Temple",
          price: 5.0,
        },
        {
          category: "Relaxation",
          durationHours: 2.0,
          location: "Arashiyama Onsen",
          name: "Relax in an onsen (hot spring) in Arashiyama",
          price: 30.0,
        },
      ],
      day: 3.0,
      description:
        "Venture into the Arashiyama Bamboo Grove, find serenity at Tenryu-ji Temple, and unwind in a local onsen.",
      title: "Bamboo Forest & Relaxation",
    },
    {
      activities: [
        {
          category: "Culture",
          durationHours: 4.0,
          location: "Kiyomizu-dera Temple",
          name: "Visit Kiyomizu-dera Temple and enjoy panoramic views",
          price: 4.0,
        },
        {
          category: "Shopping",
          durationHours: 3.0,
          location: "Higashiyama District",
          name: "Shop for souvenirs in Higashiyama District",
          price: 50.0,
        },
        {
          category: "Food",
          durationHours: 2.0,
          location: "Local Tea House",
          name: "Participate in a traditional tea ceremony",
          price: 40.0,
        },
      ],
      day: 4.0,
      description:
        "Visit Kiyomizu-dera Temple and soak in the panoramic views, hunt for souvenirs in Higashiyama District, and experience a traditional tea ceremony.",
      title: "Kyoto Views & Traditions",
    },
    {
      activities: [
        {
          category: "Day Trip",
          durationHours: 8.0,
          location: "Nara Park",
          name: "Take a day trip to Nara Park and meet the friendly deer",
          price: 0.0,
        },
        {
          category: "Culture",
          durationHours: 3.0,
          location: "Todai-ji Temple",
          name: "Visit Todai-ji Temple, home to a giant bronze Buddha statue",
          price: 6.0,
        },
      ],
      day: 5.0,
      description:
        "Take a day trip to Nara to see the famous bowing deer. Visit Todai-ji Temple to see the Giant Buddha.",
      title: "Day Trip to Nara",
    },
    {
      activities: [
        {
          category: "History",
          durationHours: 4.0,
          location: "Nijo Castle",
          name: "Explore Nijo Castle, the former residence of the Tokugawa shogunate",
          price: 6.0,
        },
        {
          category: "Culture",
          durationHours: 3.0,
          location: "Kyoto International Manga Museum",
          name: "Visit the Kyoto International Manga Museum",
          price: 8.0,
        },
        {
          category: "Food",
          durationHours: 2.0,
          location: "Pontocho Alley",
          name: "Enjoy dinner with a view in Pontocho Alley",
          price: 60.0,
        },
      ],
      day: 6.0,
      description:
        "Take in the history at Nijo Castle, immerse yourself in Japanese pop culture at the Manga Museum, and enjoy dinner with a view in Pontocho Alley.",
      title: "History & Pop Culture",
    },
    {
      activities: [
        {
          category: "Leisure",
          durationHours: 8.0,
          location: "Free Day",
          name: "Explore any places you would like to revisit or have missed",
          price: 0.0,
        },
      ],
      day: 7.0,
      description:
        "Spend the day revisiting favorite spots or exploring hidden gems.",
      title: "Departure Day",
    },
  ],
  mood: "Cultural Immersion",
  timeframe: {
    durationDays: 7.0,
    endDate: "2024-03-15T00:00:00Z",
    startDate: "2024-03-08T00:00:00Z",
  },
  title: "Kyoto: A Journey Through Tradition and Tranquility",
  transport: [
    {
      arrival: "2024-03-08T17:00:00Z",
      departure: "2024-03-08T13:00:00Z",
      price: 1200.0,
      provider: "United Airlines",
      type: "Flight",
    },
    {
      arrival: "2024-03-08T18:00:00Z",
      departure: "2024-03-08T17:30:00Z",
      price: 50.0,
      provider: "JR Haruka Express",
      type: "Train",
    },
  ],
};

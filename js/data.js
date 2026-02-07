// Central data store (JSON-like JS objects)
// Reused across multiple pages

export const BOOKS = [
  {
    id: "b1",
    title: "The Lighthouse Letters",
    author: "Mira Sen",
    genre: "Fiction",
    length: "Medium",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=900&q=80",
    synopsis:
      "A quiet coastal town, a locked attic, and letters that never should have been found. A story about courage, grief, and second chances.",
    prequels: [],
    sequels: ["The Lighthouse Keeper's Promise"],
    reviews: [
      { source: "Readers", rating: 4.6, comment: "Warm, poetic, and addictive." },
      { source: "Book Club", rating: 4.3, comment: "Great discussion starter." },
      { source: "Critics", rating: 4.1, comment: "Strong pacing and emotion." }
    ]
  },
  {
    id: "b2",
    title: "Clockwork Skies",
    author: "J. R. Halden",
    genre: "Sci-Fi",
    length: "Long",
    cover: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=900&q=80",
    synopsis:
      "When a city floats above the clouds, secrets fall like rain. A pilot and a coder uncover a conspiracy that rewrites gravity itself.",
    prequels: [],
    sequels: ["Clockwork Skies: Afterfall"],
    reviews: [
      { source: "Readers", rating: 4.4, comment: "Big ideas, cinematic scenes." },
      { source: "Book Club", rating: 4.0, comment: "A fun, twisty ride." },
      { source: "Critics", rating: 4.2, comment: "Inventive world-building." }
    ]
  },
  {
    id: "b3",
    title: "Forest of Whispering Maps",
    author: "Alina Perera",
    genre: "Fantasy",
    length: "Long",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80",
    synopsis:
      "A cartographer learns that maps can lie—and sometimes they sing. A magical journey through shifting borders and forgotten names.",
    prequels: ["The Ink Cartographer"],
    sequels: [],
    reviews: [
      { source: "Readers", rating: 4.7, comment: "Beautiful magic system." },
      { source: "Book Club", rating: 4.5, comment: "Loved the characters." },
      { source: "Critics", rating: 4.3, comment: "Rich and immersive." }
    ]
  },
  {
    id: "b4",
    title: "Tiny Habits, Big Days",
    author: "N. K. Rowan",
    genre: "Non-Fiction",
    length: "Short",
    cover: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=900&q=80",
    synopsis:
      "Practical steps to build routines that actually stick—without burnout. Simple strategies for time, focus, and motivation.",
    prequels: [],
    sequels: [],
    reviews: [
      { source: "Readers", rating: 4.2, comment: "Easy to apply immediately." },
      { source: "Book Club", rating: 3.9, comment: "Good reminders." },
      { source: "Critics", rating: 4.0, comment: "Clear and helpful." }
    ]
  },
  {
    id: "b5",
    title: "The Museum of Lost Voices",
    author: "K. A. Noor",
    genre: "Mystery",
    length: "Medium",
    cover: "https://images.unsplash.com/photo-1455885666463-49d0b7c45f22?auto=format&fit=crop&w=900&q=80",
    synopsis:
      "A missing curator. A stolen artifact. A museum where audio guides whisper truths no one recorded. A modern mystery with heart.",
    prequels: [],
    sequels: [],
    reviews: [
      { source: "Readers", rating: 4.5, comment: "Clever and emotional." },
      { source: "Book Club", rating: 4.2, comment: "Kept us guessing." },
      { source: "Critics", rating: 4.1, comment: "Solid mystery craft." }
    ]
  },
  {
    id: "b6",
    title: "Sunrise on Galle Road",
    author: "Isuru Jayasuriya",
    genre: "Fiction",
    length: "Short",
    cover: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80",
    synopsis:
      "A collection of short stories about everyday Sri Lankan life, small hopes, and the quiet power of kindness.",
    prequels: [],
    sequels: [],
    reviews: [
      { source: "Readers", rating: 4.6, comment: "Feels real and uplifting." },
      { source: "Book Club", rating: 4.4, comment: "Perfect for all ages." },
      { source: "Critics", rating: 4.0, comment: "Simple, strong writing." }
    ]
  }
];

export const HOME_QUOTES = [
  { text: "Books are a uniquely portable magic.", from: "A quiet reader" },
  { text: "A room without books is like a body without a soul.", from: "Old proverb" },
  { text: "Once you learn to read, you will be forever free.", from: "A teacher’s note" },
  { text: "Some stories don’t end — they live inside you.", from: "Book club wall" }
];

export const AUTHORS = [
  {
    name: "Mira Sen",
    bio: "Writes emotional fiction with cozy coastal settings.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80",
    funFact: "Keeps a notebook of ‘best first lines’."
  },
  {
    name: "Alina Perera",
    bio: "Fantasy author who loves maps and folklore-inspired worlds.",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=500&q=80",
    funFact: "Sketches every location before writing it."
  },
  {
    name: "J. R. Halden",
    bio: "Sci-fi storyteller focused on big ideas and human choices.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
    funFact: "Builds mini models for world-building."
  },
  {
    name: "Isuru Jayasuriya",
    bio: "Short-story writer capturing everyday life and hope.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=80",
    funFact: "Collects street sounds for inspiration."
  }
];
import type { Product, Post, Category } from "@/types";

export const fallbackProducts: Product[] = [
  {
    id: 1,
    name: "Zulu Double Bed",
    description: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae od...",
    images: [
      {
        id: 1,
        path: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "1", // Wooden
    typeId: 3, // Lying
    price: 250,
    discount: 260,
    rating: 5,
    inventory: 10,
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Smart Eazy Chair",
    description: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae od...",
    images: [
      {
        id: 2,
        path: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "1", // Wooden
    typeId: 1, // Seating
    price: 250,
    discount: 260,
    rating: 5,
    inventory: 8,
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Kruzo Aero Chair Updated",
    description: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae od...",
    images: [
      {
        id: 3,
        path: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "1", // Wooden
    typeId: 1, // Seating
    price: 250,
    discount: 260,
    rating: 5,
    inventory: 12,
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Ergonomic Chair",
    description: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae od...",
    images: [
      {
        id: 4,
        path: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "1", // Wooden
    typeId: 1, // Seating
    price: 140,
    discount: 150,
    rating: 5,
    inventory: 15,
    status: "ACTIVE",
  },
  {
    id: 5,
    name: "Nordic Chair",
    description: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae od...",
    images: [
      {
        id: 5,
        path: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "1", // Wooden
    typeId: 1, // Seating
    price: 210,
    discount: 0,
    rating: 5,
    inventory: 6,
    status: "ACTIVE",
  },
  {
    id: 6,
    name: "Luxury Modern Couch",
    description: "Donec facilisis quam ut purus rutrum lobortis. Donec vitae od...",
    images: [
      {
        id: 6,
        path: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "1", // Wooden
    typeId: 1, // Seating
    price: 350,
    discount: 400,
    rating: 5,
    inventory: 4,
    status: "ACTIVE",
  },
  {
    id: 7,
    name: "Minimalist Oak Table",
    description: "Solid wooden oak dining table for modern family rooms.",
    images: [
      {
        id: 7,
        path: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "1", // Wooden
    typeId: 4, // Tables
    price: 320,
    discount: 0,
    rating: 4,
    inventory: 5,
    status: "ACTIVE",
  },
  {
    id: 8,
    name: "Bamboo Storage Console",
    description: "Eco-friendly storage console with compartments.",
    images: [
      {
        id: 8,
        path: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "2", // Bamboo
    typeId: 5, // Storage
    price: 190,
    discount: 0,
    rating: 4,
    inventory: 7,
    status: "ACTIVE",
  },
  {
    id: 9,
    name: "Metal Frame Seating Chair",
    description: "Industrial metal frame seating chair with soft leather cushion.",
    images: [
      {
        id: 9,
        path: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "3", // Metal
    typeId: 1, // Seating
    price: 175,
    discount: 0,
    rating: 5,
    inventory: 9,
    status: "ACTIVE",
  },
  {
    id: 10,
    name: "Metal Entertainment Table",
    description: "Modern metal entertainment stand for living room media.",
    images: [
      {
        id: 10,
        path: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "3", // Metal
    typeId: 2, // Entertainment
    price: 280,
    discount: 0,
    rating: 4,
    inventory: 6,
    status: "ACTIVE",
  },
  {
    id: 11,
    name: "Bamboo Armchair Seating",
    description: "Comfortable natural bamboo seating chair.",
    images: [
      {
        id: 11,
        path: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&auto=format&fit=crop",
      },
    ],
    categoryId: "2", // Bamboo
    typeId: 1, // Seating
    price: 160,
    discount: 0,
    rating: 5,
    inventory: 11,
    status: "ACTIVE",
  },
];

export const fallbackPosts: Post[] = [
  {
    id: 1,
    author: { fullName: "Phyo Zin Ko" },
    title: "First Time Home Owner Ideas for Modern Interior Design",
    content:
      "Choosing the right furniture and layout can completely transform your living space...",
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&auto=format&fit=crop",
    body: "Detailed guide for modern living interior decoration...",
    updatedAt: "2026-10-05T00:00:00.000Z",
    tags: [{ name: "Interior Design" }],
  },
  {
    id: 2,
    author: { fullName: "Aung Myint" },
    title: "How to Keep Your Wooden Furniture Clean & Long-Lasting",
    content:
      "Learn simple maintenance techniques to ensure your wooden furniture lasts for decades...",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&auto=format&fit=crop",
    body: "Wood maintenance tips and best oils to preserve color...",
    updatedAt: "2026-09-28T00:00:00.000Z",
    tags: [{ name: "Furniture Care" }],
  },
  {
    id: 3,
    author: { fullName: "Thiri Wai" },
    title: "Minimalist Space Saving Furniture Trends 2026",
    content:
      "Explore the latest ergonomic and space-saving furniture options for modern apartments...",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=600&auto=format&fit=crop",
    body: "Space-saving furniture trends for compact living rooms...",
    updatedAt: "2026-09-15T00:00:00.000Z",
    tags: [{ name: "Trends" }],
  },
];

export const fallbackCategories: Category[] = [
  { id: 1, name: "Wooden" },
  { id: 2, name: "Bamboo" },
  { id: 3, name: "Metal" },
];

export const fallbackTypes = [
  { id: 1, name: "Seating" },
  { id: 2, name: "Entertainment" },
  { id: 3, name: "Lying" },
  { id: 4, name: "Tables" },
  { id: 5, name: "Storage" },
];

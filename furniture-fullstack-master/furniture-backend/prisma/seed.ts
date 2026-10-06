import { PrismaClient, Role, Status } from "../src/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcrypt";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const salt = await bcrypt.genSalt(10);

  // ─── 1. Seed Users ───────────────────────────────────────────────
  const users = [
    {
      firstName: "Min",
      lastName: "Thant",
      phone: "912345678",
      password: await bcrypt.hash("password123", salt),
      email: "min.thant@example.com",
      role: Role.USER,
      status: Status.ACTIVE,
      randToken: crypto.randomUUID(),
    },
    {
      firstName: "Su",
      lastName: "Hnin",
      phone: "987654321",
      password: await bcrypt.hash("password123", salt),
      email: "su.hnin@example.com",
      role: Role.USER,
      status: Status.ACTIVE,
      randToken: crypto.randomUUID(),
    },
    {
      firstName: "Kaung",
      lastName: "Myat",
      phone: "923456789",
      password: await bcrypt.hash("password123", salt),
      email: "kaung.myat@example.com",
      role: Role.ADMIN,
      status: Status.ACTIVE,
      randToken: crypto.randomUUID(),
    },
    {
      firstName: "Htein",
      lastName: "Lin",
      phone: "934567890",
      password: await bcrypt.hash("password123", salt),
      email: "htein.lin@example.com",
      role: Role.AUTHOR,
      status: Status.ACTIVE,
      randToken: crypto.randomUUID(),
    },
    {
      firstName: "May",
      lastName: "Thu",
      phone: "945678901",
      password: await bcrypt.hash("password123", salt),
      email: "may.thu@example.com",
      role: Role.USER,
      status: Status.ACTIVE,
      randToken: crypto.randomUUID(),
    },
  ];

  console.log("Seeding 5 sample users...");

  const createdUsers: { id: number; firstName: string | null }[] = [];
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { phone: user.phone },
      update: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      create: user,
    });
    createdUsers.push(createdUser);
    console.log(
      `Created user: ${createdUser.firstName} ${createdUser.lastName} (${createdUser.phone})`,
    );
  }

  // ─── 2. Seed Settings ────────────────────────────────────────────
  await prisma.setting.upsert({
    where: { key: "maintenance_mode" },
    update: {},
    create: {
      key: "maintenance_mode",
      value: "false",
    },
  });
  console.log("Seeded maintenance mode setting.");

  // ─── 3. Seed Categories ──────────────────────────────────────────
  const categoryNames = ["Wooden", "Bamboo", "Metal"];
  const categories: { id: number; name: string }[] = [];

  for (const name of categoryNames) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categories.push(cat);
  }
  console.log(
    `Seeded ${categories.length} categories: ${categoryNames.join(", ")}`,
  );

  // ─── 4. Seed Types ───────────────────────────────────────────────
  const typeNames = ["seating", "lying", "entertainment", "tables", "storage"];
  const types: { id: number; name: string }[] = [];

  for (const name of typeNames) {
    const t = await prisma.type.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    types.push(t);
  }
  console.log(`Seeded ${types.length} types: ${typeNames.join(", ")}`);

  // Helper lookups
  const catByName = Object.fromEntries(categories.map((c) => [c.name, c.id]));
  const typeByName = Object.fromEntries(types.map((t) => [t.name, t.id]));

  // ─── 5. Seed Products ────────────────────────────────────────────
  const productsData = [
    {
      name: "Nordic Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-1.webp", "/data/p-4.webp", "/data/p-7.webp"],
      category: "Wooden",
      type: "seating",
      price: 230,
      discount: 0,
      rating: 4,
      inventory: 180,
      status: Status.ACTIVE,
    },
    {
      name: "Kruzo Aero Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-2.webp", "/data/p-5.webp", "/data/p-8.webp"],
      category: "Bamboo",
      type: "seating",
      price: 180.85,
      discount: 200,
      rating: 3,
      inventory: 900,
      status: Status.ACTIVE,
    },
    {
      name: "Ergonomic Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-3.webp", "/data/p-1.webp", "/data/p-6.webp"],
      category: "Wooden",
      type: "seating",
      price: 90,
      discount: 110,
      rating: 4,
      inventory: 90,
      status: Status.ACTIVE,
    },
    {
      name: "Nordic Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-4.webp", "/data/p-2.webp", "/data/p-7.webp"],
      category: "Metal",
      type: "tables",
      price: 1500,
      discount: 0,
      rating: 4,
      inventory: 100,
      status: Status.INACTIVE,
    },
    {
      name: "Kruzo Aero Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-5.webp", "/data/p-3.webp", "/data/p-8.webp"],
      category: "Wooden",
      type: "seating",
      price: 230,
      discount: 0,
      rating: 4,
      inventory: 180,
      status: Status.ACTIVE,
    },
    {
      name: "Ergonomic Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-6.webp", "/data/p-2.webp", "/data/p-4.webp"],
      category: "Wooden",
      type: "seating",
      price: 140,
      discount: 150,
      rating: 3,
      inventory: 200,
      status: Status.INACTIVE,
    },
    {
      name: "Nordic Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-7.webp", "/data/p-1.webp", "/data/p-3.webp"],
      category: "Metal",
      type: "entertainment",
      price: 210,
      discount: 0,
      rating: 4,
      inventory: 100,
      status: Status.ACTIVE,
    },
    {
      name: "Ergonomic Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-8.webp", "/data/p-4.webp", "/data/p-2.webp"],
      category: "Bamboo",
      type: "lying",
      price: 140,
      discount: 150,
      rating: 3,
      inventory: 200,
      status: Status.ACTIVE,
    },
    {
      name: "Kruzo Aero Chair",
      description:
        "Donec facilisis quam ut purus rutrum lobortis. Donec vitae odio quam ut purus rutrum lobortis",
      images: ["/data/p-5.webp", "/data/p-3.webp", "/data/p-8.webp"],
      category: "Wooden",
      type: "storage",
      price: 250,
      discount: 260,
      rating: 4,
      inventory: 200,
      status: Status.ACTIVE,
    },
  ];

  console.log(`Seeding ${productsData.length} products...`);

  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        discount: p.discount,
        rating: p.rating,
        inventory: p.inventory,
        status: p.status,
        categoryId: catByName[p.category],
        typeId: typeByName[p.type],
        images: {
          create: p.images.map((path) => ({ path })),
        },
      },
    });
    console.log(`  Created product: ${product.name} (id: ${product.id})`);
  }

  // ─── 6. Seed Post Tags ───────────────────────────────────────────
  const postTagNames = ["Wooden", "Seating", "Single"];
  const postTags: { id: number; name: string }[] = [];

  for (const name of postTagNames) {
    const tag = await prisma.postTag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    postTags.push(tag);
  }
  console.log(
    `Seeded ${postTags.length} post tags: ${postTagNames.join(", ")}`,
  );

  // ─── 7. Seed Posts ────────────────────────────────────────────────
  const authorId = createdUsers[0].id; // first user as default author

  const postsData = [
    {
      title: "First Time Home Owner Ideas",
      content:
        "The choice of furniture depends on personal preferences, the style of the living space, and the intended use of the furniture.",
      image: "/data/post-1.jpg",
      body: "<p>Storage furniture is essential for organizing and storing items in homes and offices. It helps to keep living spaces clean and clutter-free, making it easier to find and access items when needed. Storage furniture can also add style and character to a room, enhancing the overall decor of a space.</p><br/><p>Storage furniture is designed to provide storage space for various items in homes and offices. Here are some common uses of storage furniture:</p><br/><ol><li><strong>Organization:</strong> The primary use of storage furniture is to help organize and store various items in homes and offices. This includes items such as clothing, shoes, books, toys, office supplies, and other household items.</li><li><strong>Space-saving:</strong> Storage furniture can also be used to save space in a room. For example, a bed with built-in drawers or shelves can provide additional storage space for clothing and bedding, freeing up space in a closet or dresser.</li><li><strong>Decor</strong>Storage furniture can also be used as decorative pieces in a room. Bookcases, for example, can be used to display books and decorative items while also providing storage space.</li><li><strong>Flexibility:</strong> Storage furniture can be used in various rooms in a home or office. For example, a storage cabinet that is used in a living room to store board games and other items can be moved to a home office to store office supplies.</li><li><strong>Safety:</strong> Storage furniture can also be used to keep hazardous items out of reach of children and pets. Cabinets and lockers can be used to store chemicals, tools, and other items that can be dangerous if not stored properly.</li></ol><br/><br/><p>Overall, storage furniture is an essential part of any functional and organized living space. It helps to keep items organized and easily accessible while also providing additional storage space and enhancing the overall decor of a room.</p>",
      category: "Wooden",
      type: "seating",
      tags: ["Wooden", "Seating", "Single"],
    },
    {
      title: "How To Keep Your Furniture Clean",
      content:
        "The choice of furniture depends on personal preferences, the style of the living space, and the intended use of the furniture.",
      image: "/data/post-2.jpg",
      body: "<p>Storage furniture is essential for organizing and storing items in homes and offices. It helps to keep living spaces clean and clutter-free, making it easier to find and access items when needed. Storage furniture can also add style and character to a room, enhancing the overall decor of a space.</p><br/><p>Storage furniture is designed to provide storage space for various items in homes and offices. Here are some common uses of storage furniture:</p><br/><ol><li><strong>Organization:</strong> The primary use of storage furniture is to help organize and store various items in homes and offices. This includes items such as clothing, shoes, books, toys, office supplies, and other household items.</li><li><strong>Space-saving:</strong> Storage furniture can also be used to save space in a room. For example, a bed with built-in drawers or shelves can provide additional storage space for clothing and bedding, freeing up space in a closet or dresser.</li><li><strong>Decor</strong>Storage furniture can also be used as decorative pieces in a room. Bookcases, for example, can be used to display books and decorative items while also providing storage space.</li><li><strong>Flexibility:</strong> Storage furniture can be used in various rooms in a home or office. For example, a storage cabinet that is used in a living room to store board games and other items can be moved to a home office to store office supplies.</li><li><strong>Safety:</strong> Storage furniture can also be used to keep hazardous items out of reach of children and pets. Cabinets and lockers can be used to store chemicals, tools, and other items that can be dangerous if not stored properly.</li></ol><br/><br/><p>Overall, storage furniture is an essential part of any functional and organized living space. It helps to keep items organized and easily accessible while also providing additional storage space and enhancing the overall decor of a room.</p>",
      category: "Bamboo",
      type: "lying",
      tags: ["Wooden", "Seating", "Single"],
    },
    {
      title: "Small Space Furniture Apartment Ideas",
      content:
        "The choice of furniture depends on personal preferences, the style of the living space, and the intended use of the furniture.",
      image: "/data/post-3.jpg",
      body: "<p>Storage furniture is essential for organizing and storing items in homes and offices. It helps to keep living spaces clean and clutter-free, making it easier to find and access items when needed. Storage furniture can also add style and character to a room, enhancing the overall decor of a space.</p><br/><p>Storage furniture is designed to provide storage space for various items in homes and offices. Here are some common uses of storage furniture:</p><br/><ol><li><strong>Organization:</strong> The primary use of storage furniture is to help organize and store various items in homes and offices. This includes items such as clothing, shoes, books, toys, office supplies, and other household items.</li><li><strong>Space-saving:</strong> Storage furniture can also be used to save space in a room. For example, a bed with built-in drawers or shelves can provide additional storage space for clothing and bedding, freeing up space in a closet or dresser.</li><li><strong>Decor</strong>Storage furniture can also be used as decorative pieces in a room. Bookcases, for example, can be used to display books and decorative items while also providing storage space.</li><li><strong>Flexibility:</strong> Storage furniture can be used in various rooms in a home or office. For example, a storage cabinet that is used in a living room to store board games and other items can be moved to a home office to store office supplies.</li><li><strong>Safety:</strong> Storage furniture can also be used to keep hazardous items out of reach of children and pets. Cabinets and lockers can be used to store chemicals, tools, and other items that can be dangerous if not stored properly.</li></ol><br/><br/><p>Overall, storage furniture is an essential part of any functional and organized living space. It helps to keep items organized and easily accessible while also providing additional storage space and enhancing the overall decor of a room.</p>",
      category: "Metal",
      type: "entertainment",
      tags: ["Wooden", "Seating", "Single"],
    },
    {
      title: "keep living spaces clean and clutter-free",
      content:
        "The choice of furniture depends on personal preferences, the style of the living space, and the intended use of the furniture.",
      image: "/data/post-4.jpg",
      body: "<p>Storage furniture is essential for organizing and storing items in homes and offices. It helps to keep living spaces clean and clutter-free, making it easier to find and access items when needed. Storage furniture can also add style and character to a room, enhancing the overall decor of a space.</p><br/><p>Storage furniture is designed to provide storage space for various items in homes and offices. Here are some common uses of storage furniture:</p><br/><ol><li><strong>Organization:</strong> The primary use of storage furniture is to help organize and store various items in homes and offices. This includes items such as clothing, shoes, books, toys, office supplies, and other household items.</li><li><strong>Space-saving:</strong> Storage furniture can also be used to save space in a room. For example, a bed with built-in drawers or shelves can provide additional storage space for clothing and bedding, freeing up space in a closet or dresser.</li><li><strong>Decor</strong>Storage furniture can also be used as decorative pieces in a room. Bookcases, for example, can be used to display books and decorative items while also providing storage space.</li><li><strong>Flexibility:</strong> Storage furniture can be used in various rooms in a home or office. For example, a storage cabinet that is used in a living room to store board games and other items can be moved to a home office to store office supplies.</li><li><strong>Safety:</strong> Storage furniture can also be used to keep hazardous items out of reach of children and pets. Cabinets and lockers can be used to store chemicals, tools, and other items that can be dangerous if not stored properly.</li></ol><br/><br/><p>Overall, storage furniture is an essential part of any functional and organized living space. It helps to keep items organized and easily accessible while also providing additional storage space and enhancing the overall decor of a room.</p>",
      category: "Wooden",
      type: "tables",
      tags: ["Wooden", "Seating", "Single"],
    },
    {
      title: "How To Keep Your Furniture Clean",
      content:
        "The choice of furniture depends on personal preferences, the style of the living space, and the intended use of the furniture.",
      image: "/data/post-5.jpg",
      body: "<p>Storage furniture is essential for organizing and storing items in homes and offices. It helps to keep living spaces clean and clutter-free, making it easier to find and access items when needed. Storage furniture can also add style and character to a room, enhancing the overall decor of a space.</p><br/><p>Storage furniture is designed to provide storage space for various items in homes and offices. Here are some common uses of storage furniture:</p><br/><ol><li><strong>Organization:</strong> The primary use of storage furniture is to help organize and store various items in homes and offices. This includes items such as clothing, shoes, books, toys, office supplies, and other household items.</li><li><strong>Space-saving:</strong> Storage furniture can also be used to save space in a room. For example, a bed with built-in drawers or shelves can provide additional storage space for clothing and bedding, freeing up space in a closet or dresser.</li><li><strong>Decor</strong>Storage furniture can also be used as decorative pieces in a room. Bookcases, for example, can be used to display books and decorative items while also providing storage space.</li><li><strong>Flexibility:</strong> Storage furniture can be used in various rooms in a home or office. For example, a storage cabinet that is used in a living room to store board games and other items can be moved to a home office to store office supplies.</li><li><strong>Safety:</strong> Storage furniture can also be used to keep hazardous items out of reach of children and pets. Cabinets and lockers can be used to store chemicals, tools, and other items that can be dangerous if not stored properly.</li></ol><br/><br/><p>Overall, storage furniture is an essential part of any functional and organized living space. It helps to keep items organized and easily accessible while also providing additional storage space and enhancing the overall decor of a room.</p>",
      category: "Bamboo",
      type: "storage",
      tags: ["Wooden", "Seating", "Single"],
    },
    {
      title: "Small Space Furniture Apartment Ideas",
      content:
        "The global smart furniture market size is expected to reach $794.8 million by 2025, growing at a CAGR of 6.4% from 2020 to 2025. ",
      image: "/data/post-6.jpg",
      body: "<p>Storage furniture is essential for organizing and storing items in homes and offices. It helps to keep living spaces clean and clutter-free, making it easier to find and access items when needed. Storage furniture can also add style and character to a room, enhancing the overall decor of a space.</p><br/><p>Storage furniture is designed to provide storage space for various items in homes and offices. Here are some common uses of storage furniture:</p><br/><ol><li><strong>Organization:</strong> The primary use of storage furniture is to help organize and store various items in homes and offices. This includes items such as clothing, shoes, books, toys, office supplies, and other household items.</li><li><strong>Space-saving:</strong> Storage furniture can also be used to save space in a room. For example, a bed with built-in drawers or shelves can provide additional storage space for clothing and bedding, freeing up space in a closet or dresser.</li><li><strong>Decor</strong>Storage furniture can also be used as decorative pieces in a room. Bookcases, for example, can be used to display books and decorative items while also providing storage space.</li><li><strong>Flexibility:</strong> Storage furniture can be used in various rooms in a home or office. For example, a storage cabinet that is used in a living room to store board games and other items can be moved to a home office to store office supplies.</li><li><strong>Safety:</strong> Storage furniture can also be used to keep hazardous items out of reach of children and pets. Cabinets and lockers can be used to store chemicals, tools, and other items that can be dangerous if not stored properly.</li></ol><br/><br/><p>Overall, storage furniture is an essential part of any functional and organized living space. It helps to keep items organized and easily accessible while also providing additional storage space and enhancing the overall decor of a room.</p>",
      category: "Metal",
      type: "seating",
      tags: ["Wooden", "Seating", "Single"],
    },
  ];

  const tagIdByName = Object.fromEntries(postTags.map((t) => [t.name, t.id]));

  console.log(`Seeding ${postsData.length} posts...`);

  for (const p of postsData) {
    const post = await prisma.post.create({
      data: {
        title: p.title,
        content: p.content,
        body: p.body,
        image: p.image,
        authorId: authorId,
        categoryId: catByName[p.category],
        typeId: typeByName[p.type],
        tags: {
          connect: p.tags.map((tagName) => ({ id: tagIdByName[tagName] })),
        },
      },
    });
    console.log(`  Created post: "${post.title}" (id: ${post.id})`);
  }

  console.log("✅ Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
    await prisma.$disconnect();
  });

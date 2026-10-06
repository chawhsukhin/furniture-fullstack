import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const normalizeImagePath = (raw: string | null) => {
  if (!raw) return raw;

  if (raw.startsWith("/optimize//data/")) {
    return raw.replace("/optimize//data/", "/data/");
  }
  if (raw.startsWith("/optimize//uploads/")) {
    return raw.replace("/optimize//uploads/", "/uploads/");
  }

  if (
    raw.startsWith("http://") ||
    raw.startsWith("https://") ||
    raw.startsWith("data:")
  ) {
    return raw;
  }

  if (
    raw.startsWith("/data/") ||
    raw.startsWith("data/") ||
    raw.startsWith("/uploads/") ||
    raw.startsWith("uploads/")
  ) {
    return raw.startsWith("/") ? raw : `/${raw}`;
  }

  const baseName = raw.split(".")[0];
  return `/uploads/optimize/${baseName}.webp`;
};

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`;
        },
      },
      image: {
        needs: { image: true },
        compute(user) {
          return normalizeImagePath(user.image);
        },
      },
    },
    post: {
      image: {
        needs: { image: true },
        compute(post) {
          return normalizeImagePath(post.image) ?? post.image;
        },
      },
      updatedAt: {
        needs: { updatedAt: true },
        compute(post) {
          return post?.updatedAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        },
      },
    },
    image: {
      path: {
        needs: { path: true },
        compute(image) {
          return normalizeImagePath(image.path) ?? image.path;
        },
      },
    },
  },
});

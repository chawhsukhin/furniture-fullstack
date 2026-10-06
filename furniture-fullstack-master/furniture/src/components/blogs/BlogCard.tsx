import type { Post } from "@/types";
import { Link } from "react-router";
import { resolveImageUrl } from "@/lib/utils";

interface PostProps {
  posts: Post[];
}

function BlogCard({ posts }: PostProps) {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 my-8 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          to={`/blogs/${post.id}`}
          key={post.id}
          className="flex flex-col justify-between h-full group"
        >
          <div>
            <div className="overflow-hidden rounded-2xl mb-4 bg-muted">
              <img
                src={resolveImageUrl(post.image)}
                alt="Blog Post"
                loading="lazy"
                decoding="async"
                className="w-full h-56 object-cover rounded-2xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="ml-2 font-bold text-lg line-clamp-2 leading-snug group-hover:text-primary transition">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogCard;

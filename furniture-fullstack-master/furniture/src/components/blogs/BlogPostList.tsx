import type { Post } from "@/types";
import { Link } from "react-router";
import { resolveImageUrl } from "@/lib/utils";

interface PostProps {
  posts: Post[];
}

function BlogPostList({ posts }: PostProps) {
  return (
    <div className="grid grid-cols-1 gap-8 px-4 my-8 md:grid-cols-2 md:px-0 lg:grid-cols-3">
      {posts.map((post) => (
        <Link
          to={`/blogs/${post.id}`}
          key={post.id}
          className="flex flex-col justify-between h-full group bg-card border border-border/60 rounded-2xl p-4 shadow-sm hover:shadow-md transition"
        >
          <div>
            <div className="overflow-hidden rounded-xl mb-4 bg-muted">
              <img
                src={resolveImageUrl(post.image)}
                alt="Blog Post"
                loading="lazy"
                decoding="async"
                className="w-full h-52 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h2 className="text-xl font-bold line-clamp-2 leading-snug group-hover:text-primary transition">
              {post.title}
            </h2>
            <p className="my-2 line-clamp-2 text-sm text-muted-foreground">
              {post.content}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogPostList;

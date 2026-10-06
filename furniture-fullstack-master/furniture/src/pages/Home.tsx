import { Link } from "react-router";
import { useSuspenseQuery } from "@tanstack/react-query";

import Couch from "@/data/images/couch.png";
import { Button } from "@/components/ui/button";
import CarouselCard from "@/components/products/CarouselCard";
import BlogCard from "@/components/blogs/BlogCard";
import ProductCard from "@/components/products/ProductCard";
import type { Product } from "@/types";
import { postQuery, productQuery } from "@/api/query";

type SectionTitleProps = {
  title: string;
  href: string;
  sideText: string;
};

function SectionTitle({ title, href, sideText }: SectionTitleProps) {
  return (
    <div className="flex flex-col px-4 mb-10 mt-28 md:flex-row md:justify-between md:px-0">
      <h2 className="mb-4 text-2xl font-bold md:mb-0">{title}</h2>
      <Link to={href} className="font-semibold underline text-muted-foreground">
        {sideText}
      </Link>
    </div>
  );
}

function Home() {
  const { data: productsData } = useSuspenseQuery(productQuery("?limit=8"));
  const { data: postsData } = useSuspenseQuery(postQuery("?limit=3"));

  return (
    <div className="container mx-auto animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        {/* Text Section */}
        <div className="my-8 text-center lg:mt-16 lg:mb-0 lg:w-2/5 lg:text-left animate-fade-up">
          <h1 className="mb-4 text-4xl font-extrabold text-teal-900 lg:mb-8 lg:text-6xl">
            Modern Interior Design Studio
          </h1>
          <p className="mb-6 text-own lg:mb-8">
            Furniture is an essential component of any living space, providing
            functionality, comfort, and aesthetic appeal.
          </p>
          <div>
            <Button
              asChild
              className="px-8 py-6 mr-2 text-base font-bold bg-orange-300 rounded-full"
            >
              <Link to="#">Shop Now</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="px-8 py-6 text-base font-bold rounded-full text-own"
            >
              <Link to="#">Explore</Link>
            </Button>
          </div>
        </div>
        {/* Image Section */}
        <img
          src={Couch}
          alt="Couch"
          className="w-full lg:w-3/5 animate-fade-up [animation-delay:120ms]"
        />
      </div>
      {productsData && <CarouselCard products={productsData.products} />}
      <SectionTitle
        title="Featured Products"
        href="/products"
        sideText="View All Products"
      />
      <div className="grid grid-cols-1 gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4">
        {productsData &&
          productsData.products
            .slice(0, 4)
            .map((product: Product) => (
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
      <SectionTitle title="Recent Blog" href="/blogs" sideText="View All Posts" />
      {postsData && <BlogCard posts={postsData.posts} />}
    </div>
  );
}

export default Home;

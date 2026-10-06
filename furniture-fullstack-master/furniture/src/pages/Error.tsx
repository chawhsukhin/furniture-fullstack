import { Link } from "react-router";

import Header from "@/components/layouts/Header";
import { Button } from "@/components/ui/button";
import {
  Card,
  //CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/layouts/Footer";
import { Icons } from "@/components/icons";

function Error() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <main className="flex items-center flex-1 mx-auto my-32">
        <Card className="w-[350px] md:w-[500px] lg:w-[500px] animate-fade-up">
          <CardHeader className="flex gap-2 place-items-center">
            <div className="grid mt-2 mb-4 border border-dashed rounded-full border-muted-foreground/70 size-24 place-items-center">
              <Icons.exclamation
                className="text-muted-foreground/70 size-10"
                aria-hidden="true"
              />
            </div>
            <CardTitle>Oops!</CardTitle>
            <CardDescription>An error occurs accidently.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button variant="outline" asChild>
              <Link to="/">Go to Home Page</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

export default Error;

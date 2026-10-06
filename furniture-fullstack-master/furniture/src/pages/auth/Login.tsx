import { Link } from "react-router";
import { Icons } from "@/components/icons";
import Banner from "@/data/images/house.webp";
import LoginForm from "@/components/auth/LoginForm";

function Login() {
  return (
    <div className="relative min-h-svh bg-muted/30">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_55%)]" />
      <Link
        to="/"
        className="absolute left-6 top-6 z-10 flex items-center text-lg font-bold tracking-tight text-foreground/80 transition-colors hover:text-foreground"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span>Furniture Shop</span>
      </Link>
      <main className="grid min-h-svh grid-cols-1 lg:grid-cols-2">
        <div className="flex w-full items-center justify-center px-6 py-16">
          <div className="w-full max-w-sm animate-fade-up">
            <LoginForm />
          </div>
        </div>
        <div className="relative hidden lg:block">
          <img
            src={Banner}
            alt="Furniture Shop"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-sm uppercase tracking-[0.2em] text-white/80">
              Welcome Back
            </p>
            <h2 className="mt-2 text-3xl font-extrabold">
              Sign in to continue your design journey.
            </h2>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;

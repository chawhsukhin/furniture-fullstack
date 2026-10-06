import { Link } from "react-router";
import { Icons } from "@/components/icons";
import RegisterForm from "@/components/auth/RegisterForm";

function Register() {
  return (
    <div className="flex min-h-screen px-4 place-items-center">
      <Link
        to="/"
        className="fixed flex items-center text-lg font-bold tracking-tight transition-colors text-foreground/80 hover:text-foreground top-6 left-8"
      >
        <Icons.logo className="mr-2 size-6" aria-hidden="true" />
        <span>Furniture Shop</span>
      </Link>
      <RegisterForm />
    </div>
  );
}

export default Register;

import { NewPasswordForm } from "@/components/auth/NewPasswordForm";

export default function NewPasswordPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6 bg-background min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <NewPasswordForm />
      </div>
    </div>
  );
}

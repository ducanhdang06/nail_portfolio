// app/protected/layout.tsx
import '../globals.css'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import NavbarAuthenticated from "@/components/navbar-authenticated";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        <NavbarAuthenticated user={user} />
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}

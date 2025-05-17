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
    <>
      <NavbarAuthenticated user={user} />
      <main className="p-6">{children}</main>
    </>
  );
}

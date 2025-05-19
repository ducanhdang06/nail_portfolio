import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import HeroSection from "@/components/HeroSection";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    //return
    redirect("/sign-in");
  }

  return (
    <div className="overflow-hidden">
      <HeroSection isSignedIn={true} userName={user.user_metadata.full_name} />
    </div>
  );
}

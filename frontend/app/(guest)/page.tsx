import HeroSection from "@/components/HeroSection";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: services, error } = await supabase.from("services").select("*");

  if (error) {
    console.error("Supabase services fetch error:", error);
  }

  return (
    <div className="overflow-hidden">
      <HeroSection isSignedIn={false} />
    </div>
  );
}

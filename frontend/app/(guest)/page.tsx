import HeroSection from "@/components/hero";
import Services from "@/components/services";
import AboutSection from "@/components/about";
import PortfolioSection from "@/components/portfolio";
import BookingSection from "@/components/booking";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: services, error } = await supabase.from("services").select("*");

  if (error) {
    console.error("Supabase services fetch error:", error);
  }

  return (
    <div className="overflow-hidden">
      <HeroSection bookLink="/sign-in" />
      <AboutSection />
      <Services services={services ?? []} />
      <PortfolioSection />
    </div>
  );
}

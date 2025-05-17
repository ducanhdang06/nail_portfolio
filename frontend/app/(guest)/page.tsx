import HeroSection from "@/components/hero";
import Services from "@/components/services";
import AboutSection from "@/components/about";
import PortfolioSection from "@/components/portfolio";
import BookingSection from "@/components/booking";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data: services, error } = await supabase.from("services").select("*");

  return (
    <div className="overflow-hidden">
      <HeroSection />
      <AboutSection />
      <Services services={services ?? []} />
      <PortfolioSection />
      <BookingSection />
    </div>
  );
}
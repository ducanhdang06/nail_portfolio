import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Gradient background with pattern overlay */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('/patterns/nail-pattern.svg')" }} />
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-64 h-64 bg-lilac rounded-full blur-3xl opacity-30" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-mint rounded-full blur-3xl opacity-30" />
      <div className="absolute top-1/4 right-10 md:right-1/4 w-20 h-20">
        <Image src="/decorative/sparkles.svg" alt="Sparkles" width={80} height={80} className="animate-pulse" />
      </div>
      <div className="absolute bottom-1/4 left-10 md:left-1/4 w-16 h-16">
        <Image src="/decorative/heart.svg" alt="Heart" width={60} height={60} className="animate-bounce" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-blush">Beautiful</span> Nails for 
          <span className="font-accent text-5xl md:text-7xl block mt-2">Beautiful People</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Nail designs that express your unique style, created with care by Sophie
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="#booking">
            <Button size="lg" className="btn-primary rounded-full text-lg px-8 py-6">
              Book Appointment
            </Button>
          </Link>
          <Link href="#services">
            <Button size="lg" variant="outline" className="btn-outline rounded-full text-lg px-8 py-6">
              View Services
            </Button>
          </Link>
        </div>
        
        {/* Nail polish illustration */}
        <div className="absolute -bottom-16 right-0 hidden lg:block">
          <Image 
            src="/decorative/nail-polish.svg" 
            alt="Nail Polish" 
            width={120} 
            height={200} 
            className="transform rotate-12"
          />
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </section>
  )
}

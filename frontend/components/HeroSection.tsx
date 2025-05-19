import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface HeroSectionProps {
  isSignedIn: boolean;
  userName?: string;
}

export default function HeroSection({ isSignedIn, userName }: HeroSectionProps) {
  // CTA buttons
  const ctaButtons = [
    { label: "View Services", href: "/services", color: "bg-blush/80 text-white hover:bg-blush/90" },
    { label: "My Work", href: "/portfolio", color: "bg-lilac/80 text-white hover:bg-lilac/90" },
    { label: "About Me", href: "/about-me", color: "bg-mint/80 text-white hover:bg-mint/90" },
    { label: "Leave a Review", href: "/leave-review", color: "bg-peach/80 text-white hover:bg-peach/90" },
  ];
  const protectedPrefix = "/protected";
  const ctaLinks = isSignedIn
    ? ctaButtons.map(btn => ({ ...btn, href: btn.href.startsWith("/protected") ? btn.href : protectedPrefix + btn.href }))
    : ctaButtons;
  const bookLink = isSignedIn ? "/protected/booking" : "/booking";

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
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          <span className="text-blush">Beautiful</span> Nails for 
          <span className="font-accent text-5xl md:text-7xl block mt-2">Beautiful People</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Nail designs that express your unique style, created with care by Sophie
        </p>
        
        {/* CTA Grid */}
        <div className="w-full max-w-md mx-auto grid grid-cols-1 xs:grid-cols-2 gap-4 mb-8 sm:grid-cols-2">
          {ctaLinks.map((btn, idx) => (
            <Link key={btn.label + btn.href} href={btn.href} className="group">
              <Button
                className={`w-full py-5 rounded-2xl font-semibold text-lg shadow-soft transition-all duration-150 ${btn.color} group-hover:scale-105 group-active:scale-95 group-hover:shadow-pastel focus:outline-none focus:ring-2 focus:ring-blush/30`}
                tabIndex={0}
              >
                {btn.label}
              </Button>
            </Link>
          ))}
        </div>
        
        {/* Book Now Button */}
        <Link href={bookLink} className="block w-full max-w-md mx-auto">
          <Button
            size="lg"
            className="w-full py-6 rounded-2xl text-xl font-bold bg-peach text-white shadow-pastel hover:bg-peach/90 active:scale-95 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-peach/40"
          >
            Book Now
          </Button>
        </Link>
        
        {/* Below Book Now Button */}
        <div className="mt-3">
          {!isSignedIn ? (
            <div className="text-sm text-muted-foreground">
              <span>Already have an account? </span>
              <Link href="/sign-in" className="text-rose-600 font-semibold underline hover:text-rose-700">Sign in</Link>
              <span> or </span>
              <Link href="/sign-up" className="text-rose-600 font-semibold underline hover:text-rose-700">Sign up</Link>
            </div>
          ) : (
            <div className="text-sm text-muted-foreground flex flex-col items-center gap-1">
              <span>Welcome back{userName ? `, ${userName}` : ''}!</span>
              <Link href="/protected/profile" className="text-blush font-medium hover:underline">View Account</Link>
            </div>
          )}
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

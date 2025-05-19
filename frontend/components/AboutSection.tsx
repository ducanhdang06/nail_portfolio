import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

export default function AboutSection() {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-peach/20 rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky/20 rounded-full translate-y-1/3 -translate-x-1/4" />
      
      {/* Decorative nail polish icon */}
      <div className="absolute top-12 left-12 hidden md:block">
        <Image src="/decorative/nail-art.svg" alt="Nail Art" width={60} height={60} className="opacity-40" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="section-title">About Sophie</h2>
        
        <div className="mt-12 grid md:grid-cols-2 gap-10 items-center">
          {/* Image with decorative frame */}
          <div className="order-1 md:order-1 flex justify-center">
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -top-3 -left-3 w-full h-full bg-lilac rounded-2xl"></div>
              
              {/* Main image */}
              <div className="relative w-64 h-80 md:w-80 md:h-96 rounded-2xl overflow-hidden shadow-soft">
                <Image
                  src="/portfolio.jpg?height=600&width=400"
                  alt="Sophie Ho, Nail Artist"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center top" }}
                />
              </div>
              
              {/* Accent elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-peach rounded-xl rotate-6"></div>
              <div className="absolute -bottom-8 -right-8 flex items-center justify-center">
                <div className="bg-white shadow-soft rounded-full p-3">
                  <Image src="/decorative/nail-polish.svg" alt="Nail Polish" width={40} height={40} />
                </div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-2 md:order-2 card bg-white/80 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-2 text-blush">
              <span className="font-accent">Hello there!</span>
            </h3>
            <h4 className="text-xl mb-4">I'm Sophie Ho</h4>
            
            <p className="text-muted-foreground mb-4">
              With over 5 years of experience in the nail industry, I've dedicated my career to creating beautiful, unique
              nail designs that help my clients express themselves. I'm certified in both gel and acrylic techniques, and
              I'm constantly learning new methods to bring the latest trends to my clients.
            </p>
            
            <p className="text-muted-foreground mb-6">
              My passion for nail art began when I was a teenager, experimenting with designs on my own nails. What
              started as a hobby quickly grew into a profession I love. I take pride in creating a relaxing, welcoming
              environment where clients can unwind while getting pampered.
            </p>
            
          </div>
        </div>
      </div>
    </section>
  )
}
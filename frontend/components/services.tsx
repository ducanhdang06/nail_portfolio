// components/services.tsx
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

type Service = {
    id: string;
    name: string;
    description: string;
    price: number;
    duration_minutes: number;
  };

// Map service names to icons
const serviceIcons: Record<string, string> = {
  "Gel Manicure": "/icons/gel-manicure.svg",
  "Acrylic Full Set": "/icons/acrylic-nails.svg",
  "Nail Art": "/icons/nail-art.svg",
  "Polish Change": "/icons/polish.svg",
  "Pedicure": "/icons/pedicure.svg",
  "Nail Repair": "/icons/nail-repair.svg",
  // Default for any other services
  "default": "/icons/nail-polish.svg"
};
  
  export default function Services({ services }: { services: Service[] }) {
  // Fallback if no services are provided
  const displayServices = services.length > 0 ? services : [
    { id: "1", name: "Gel Manicure", description: "Long-lasting gel polish applied with UV light for a perfect shine.", price: 35, duration_minutes: 45 },
    { id: "2", name: "Acrylic Full Set", description: "Full acrylic nail extensions customized to your preferred length and shape.", price: 55, duration_minutes: 75 },
    { id: "3", name: "Nail Art", description: "Custom nail art designs from simple to elaborate patterns.", price: 15, duration_minutes: 30 },
    { id: "4", name: "Polish Change", description: "Quick polish change for hands or feet with your choice of color.", price: 20, duration_minutes: 20 },
    { id: "5", name: "Pedicure", description: "Relaxing foot treatment including soak, exfoliation, massage and polish.", price: 45, duration_minutes: 60 },
    { id: "6", name: "Nail Repair", description: "Quick fix for broken or damaged nails to restore their appearance.", price: 10, duration_minutes: 15 },
  ];

    return (
    <section id="services" className="section-padding relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-40 gradient-bg opacity-50" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-lilac/20 rounded-full" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="section-title">Services & Pricing</h2>
        
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Choose from a variety of nail services, each performed with quality products and careful attention to detail.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {displayServices.map((service) => (
            <div key={service.id} className="card hover:shadow-pastel transition-shadow group relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -right-8 -top-8 w-24 h-24 bg-lilac/10 rounded-full transition-all group-hover:scale-110" />
              
              <div className="relative z-10">
                {/* Service icon */}
                <div className="w-12 h-12 bg-blush/10 rounded-full p-2 mb-4 flex items-center justify-center">
                  <Image 
                    src={serviceIcons[service.name] || serviceIcons.default} 
                    alt={service.name} 
                    width={30} 
                    height={30}
                  />
                </div>
                
                <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-lg">{service.name}</h3>
                  <Badge variant="outline" className="bg-peach/10 text-peach border-peach/20">
                    ${service.price}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                
                <div className="flex items-center text-xs text-muted-foreground">
                  <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {service.duration_minutes} minutes
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-blush font-medium">
            Custom services and group bookings available upon request
          </p>
        </div>
        </div>
      </section>
    );
  }
  
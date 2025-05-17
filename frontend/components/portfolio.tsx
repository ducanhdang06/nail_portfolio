'use client'
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sample portfolio items (replace with actual data)
const portfolioItems = [
  {
    id: 1,
    image: "/portfolio/nail-1.jpg",
    alt: "Pink Ombre Nails",
    title: "Pink Ombre",
    category: "gel",
    favorite: true,
  },
  {
    id: 2,
    image: "/portfolio/nail-2.jpg",
    alt: "Blue French Tips",
    title: "Blue French Tips",
    category: "acrylic",
    favorite: false,
  },
  {
    id: 3,
    image: "/portfolio/nail-3.jpg",
    alt: "Floral Nail Art",
    title: "Spring Floral Design",
    category: "art",
    favorite: true,
  },
  {
    id: 4,
    image: "/portfolio/nail-4.jpg",
    alt: "Minimalist Nail Design",
    title: "Minimalist Lines",
    category: "gel",
    favorite: false,
  },
  {
    id: 5,
    image: "/portfolio/nail-5.jpg",
    alt: "Sparkly Acrylic Nails",
    title: "Sparkle & Shine",
    category: "acrylic",
    favorite: true,
  },
  {
    id: 6,
    image: "/portfolio/nail-6.jpg",
    alt: "Abstract Nail Art",
    title: "Abstract Pattern",
    category: "art",
    favorite: false,
  },
  {
    id: 7,
    image: "/portfolio/nail-7.jpg",
    alt: "Pastel Rainbow Nails",
    title: "Pastel Rainbow",
    category: "gel",
    favorite: true,
  },
  {
    id: 8,
    image: "/portfolio/nail-8.jpg",
    alt: "Marble Nail Design",
    title: "Marble Effect",
    category: "acrylic",
    favorite: true,
  },
];

// For demo purposes using placeholders
const placeholderUrls = [
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
  "/placeholder.svg?height=400&width=300",
];

const filters = [
  { id: "all", name: "All Work" },
  { id: "gel", name: "Gel" },
  { id: "acrylic", name: "Acrylic" },
  { id: "art", name: "Nail Art" },
  { id: "favorite", name: "Favorites" },
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);

  // Filter items based on the active filter
  const filteredItems = portfolioItems.filter((item) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "favorite") return item.favorite;
    return item.category === activeFilter;
  });

  // Get items to display based on visible count
  const displayItems = filteredItems.slice(0, visibleCount);

  return (
    <section id="portfolio" className="section-padding relative">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blush-light to-transparent opacity-70" />
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-peach rounded-full blur-3xl opacity-20" />
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-sky rounded-full blur-3xl opacity-20" />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="section-title">My Work</h2>
        
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-8">
          Browse through my portfolio of nail designs. Each piece is created with love and attention to detail.
        </p>
        
        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full text-sm ${
                activeFilter === filter.id 
                ? "bg-blush text-white" 
                : "border-blush/20 text-foreground hover:bg-blush/10"
              }`}
            >
              {filter.name}
            </Button>
          ))}
        </div>
        
        {/* Portfolio grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayItems.map((item, index) => (
            <div key={item.id} className="group relative overflow-hidden rounded-xl shadow-soft transition-all hover:shadow-pastel">
              {/* Image */}
              <div className="aspect-square relative overflow-hidden rounded-xl">
                <Image
                  src={placeholderUrls[index % placeholderUrls.length]} // Replace with item.image in production
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                
                {/* Favorite indicator */}
                {item.favorite && (
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                        fill="#FADADD" stroke="#FADADD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              
              {/* Overlay content */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <h3 className="text-white font-semibold">{item.title}</h3>
                <Badge variant="outline" className="w-fit mt-2 bg-white/20 text-white border-white/30">
                  {filters.find(f => f.id === item.category)?.name}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load more button */}
        {visibleCount < filteredItems.length && (
          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              className="btn-outline"
              onClick={() => setVisibleCount(prev => prev + 3)}
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
} 
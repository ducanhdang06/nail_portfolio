'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

type Service = {
  id: string;
  name: string;
};

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "1:00 PM", "2:00 PM", 
  "3:00 PM", "4:00 PM", "5:00 PM"
];

export default function BookingSection() {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  
  // Placeholder services - replace with actual services from props if needed
  const services: Service[] = [
    { id: "1", name: "Gel Manicure" },
    { id: "2", name: "Acrylic Full Set" },
    { id: "3", name: "Nail Art" },
    { id: "4", name: "Polish Change" },
    { id: "5", name: "Pedicure" }
  ];

  return (
    <section id="booking" className="section-padding relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 gradient-bg opacity-30" />
      <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-mint/40 rounded-full" />
      <div className="absolute top-20 left-10 hidden lg:block">
        <Image src="/decorative/hearts-cluster.svg" alt="Hearts" width={80} height={120} className="opacity-30" />
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <h2 className="section-title">Book an Appointment</h2>
        
        <div className="grid md:grid-cols-2 gap-12 mt-12">
          {/* Left side: Image and message */}
          <div className="relative hidden md:block">
            <div className="card bg-white/80 backdrop-blur-sm p-8">
              <h3 className="text-2xl font-accent text-blush mb-4">Let's create something beautiful</h3>
              <p className="text-muted-foreground mb-6">
                Schedule your appointment and let me transform your nails into a work of art. 
                Whether you have a specific design in mind or want me to suggest something,
                I'm here to help you express your unique style.
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-10 h-10 rounded-full bg-blush flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 10C20 14.4183 16.4183 18 12 18C7.58172 18 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z" stroke="white" strokeWidth="2"/>
                    <path d="M12 18V22M8 22H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Availability</h4>
                  <p className="text-sm text-muted-foreground">Tuesday – Saturday, 9AM – 6PM</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-lilac flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 5.5L5 7L7.5 4.5M3 12L5 13.5L7.5 11M3 18.5L5 20L7.5 17.5M11 6H21M11 12H21M11 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Booking Process</h4>
                  <p className="text-sm text-muted-foreground">Submit request → Confirmation → Appointment</p>
                </div>
              </div>
              
              <div className="mt-8 relative">
                <Image
                  src="/decorative/nail-samples.svg"
                  alt="Nail Designs"
                  width={300}
                  height={150}
                />
              </div>
            </div>
          </div>
          
          {/* Right side: Booking form */}
          <div className="card">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="Enter your full name" 
                  className="rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="your.email@example.com" 
                  className="rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="(123) 456-7890" 
                  className="rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input 
                  id="date" 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30" 
                />
              </div>
              
              <div className="space-y-2">
                <Label>Preferred Time</Label>
                <div className="grid grid-cols-3 gap-2">
                  {timeSlots.map((time, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant={selectedTimeSlot === time ? "default" : "outline"}
                      onClick={() => setSelectedTimeSlot(time)}
                      className={`rounded-lg text-sm ${
                        selectedTimeSlot === time 
                          ? "bg-blush text-white hover:bg-blush/90" 
                          : "border-blush/20 text-gray-600 hover:bg-blush/10"
                      }`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Services Interested In</Label>
                <div className="space-y-2">
                  {services.map((service) => (
                    <div key={service.id} className="flex items-center space-x-2">
                      <Checkbox id={`service-${service.id}`} />
                      <Label htmlFor={`service-${service.id}`} className="text-sm font-normal">
                        {service.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Special Requests</Label>
                <textarea 
                  id="notes" 
                  rows={3}
                  placeholder="Any design ideas or special requests?" 
                  className="w-full rounded-lg border-blush/20 focus:border-blush focus:ring-blush/30 p-2" 
                />
              </div>
              
              <Button type="submit" className="btn-primary w-full">
                Request Appointment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
} 
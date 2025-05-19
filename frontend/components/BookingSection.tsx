"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";

function generateTimeSlots() {
  const slots = [];
  let hour = 10;
  let minute = 0;
  while (hour < 18 || (hour === 18 && minute <= 30)) {
    const ampm = hour < 12 ? "AM" : "PM";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    const displayMinute = minute === 0 ? "00" : "30";
    slots.push(`${displayHour}:${displayMinute} ${ampm}`);
    if (minute === 0) {
      minute = 30;
    } else {
      minute = 0;
      hour++;
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function BookingSection({ services, userName, userPhone }: { services: string[], userName?: string, userPhone?: string }) {
  const router = useRouter();
  const [name, setName] = useState(userName || "");
  const [phone, setPhone] = useState(userPhone || "");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const isAuthenticated = Boolean(userName || userPhone);

  function handleServiceChange(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }

  function handleBackToHome() {
    if (isAuthenticated) {
      router.push('/protected/');
    } else {
      router.push('/');
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !phone || selectedServices.length === 0 || !date || !time) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);

    const templateParams = {
      name,
      phone,
      services: selectedServices.join(", "),
      date,
      time,
      notes: notes || "No notes provided",
    };

    try {
      const result = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      console.log("EmailJS result:", result.text);
      setShowPopup(true);

      // Reset form
      setName("");
      setPhone("");
      setSelectedServices([]);
      setDate("");
      setTime("");
      setNotes("");
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-blush-light py-12 px-2">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-white/95 rounded-3xl shadow-pastel border border-blush p-8 flex flex-col gap-7 mx-auto"
      >
        <h1 className="text-3xl font-accent text-blush mb-2 text-center">Book Your Appointment</h1>
        <p className="text-center text-muted-foreground mb-4 text-lg">
          Fill out the form below and I'll get back to you to confirm your booking!
        </p>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-black font-semibold">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="rounded-xl border-blush focus:ring-blush/40 focus:border-blush bg-blush-light/40 text-lg text-black"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-black font-semibold">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(123) 456-7890"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            className="rounded-xl border-blush focus:ring-blush/40 focus:border-blush bg-blush-light/40 text-lg text-black"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label className="text-black font-semibold">Services</Label>
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
            {services.map((service) => (
              <label key={service} className="flex items-center gap-2 bg-blush/10 rounded-xl px-3 py-2 cursor-pointer hover:bg-blush/20 transition-colors">
                <Checkbox
                  checked={selectedServices.includes(service)}
                  onCheckedChange={() => handleServiceChange(service)}
                  id={`service-${service}`}
                />
                <span className="text-gray-700 text-base">{service}</span>
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="flex flex-col gap-2 flex-1">
            <Label htmlFor="date" className="text-black font-semibold">Preferred Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="rounded-xl border-blush focus:ring-blush/40 focus:border-blush bg-blush-light/40 text-lg text-black"
              required
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Label className="text-black font-semibold">Preferred Time</Label>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((slot) => (
                <Button
                  key={slot}
                  type="button"
                  variant={time === slot ? "default" : "outline"}
                  onClick={() => setTime(slot)}
                  className={`rounded-xl text-sm px-2 py-2 ${time === slot ? "bg-blush text-white hover:bg-blush/90" : "border-blush/20 text-gray-600 hover:bg-blush/10"}`}
                >
                  {slot}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="notes" className="text-black font-semibold">Notes / Preferences</Label>
          <textarea
            id="notes"
            placeholder="Any design ideas or special requests?"
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="rounded-xl border-blush focus:ring-blush/40 focus:border-blush bg-blush-light/40 min-h-[80px] p-3 text-lg text-black"
          />
        </div>
        <Button
          type="submit"
          className="bg-blush text-white rounded-xl font-semibold shadow-pastel hover:bg-blush/90 transition-colors text-lg py-4 mt-2"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Request Appointment"}
        </Button>
      </form>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gradient-to-br from-blush-light/80 via-peach/40 to-mint/30 backdrop-blur-sm" />
          <div className="relative bg-white/95 rounded-3xl shadow-2xl border-2 border-blush p-8 max-w-md w-full mx-4 flex flex-col items-center space-y-6 animate-fadeInUp">
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blush/10 mb-2 shadow-soft">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-accent text-blush font-bold text-center">Thank You for Your Booking!</h2>
            <p className="text-center text-lg text-gray-700 font-medium">
              Your booking request has been received.<br />You will be contacted soon for confirmation.
            </p>
            <Button
              onClick={handleBackToHome}
              className="w-full bg-blush text-white rounded-2xl font-bold shadow-pastel hover:bg-blush/90 transition-colors text-lg py-4 mt-2"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}
    </section>
  );
} 
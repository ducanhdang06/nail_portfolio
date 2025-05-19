"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Star, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";


export default function ReviewSection({ services, userName }: { services: string[], userName?: string }) {
  const [name, setName] = useState(userName || "");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  function handleServiceChange(service: string) {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setImage(file || null);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
  
    let imageUrl = null;
  
    try {
      // Upload image if one is selected
      if (image) {
        const ext = image.name.split('.').pop();
        const safeName = name.trim().replace(/\s+/g, "_").toLowerCase();
        const uniqueId = Math.random().toString(36).substring(2, 8);
        const filePath = `reviews/${safeName}_${Date.now()}_${uniqueId}.${ext}`;
  
        const { error: uploadError } = await supabase.storage
          .from('review-images') // your bucket name
          .upload(filePath, image);
  
        if (uploadError) {
          console.error('Image upload error:', uploadError);
          alert('Image upload failed: ' + uploadError.message);
          setLoading(false);
          return;
        }
  
        const { data } = supabase.storage.from('review-images').getPublicUrl(filePath);
        imageUrl = data?.publicUrl || null;
      }
  
      // Insert review into guest_reviews table
      const { error: insertError } = await supabase.from("guest_reviews").insert([
        {
          full_name: name,
          rating,
          services: selectedServices,
          comments: comment,
          image_url: imageUrl,
        },
      ]);
  
      if (insertError) {
        console.error("Submission error:", insertError.message);
        alert("Something went wrong. Please try again.");
      } else {
        alert("🎉 Review submitted successfully!");
  
        // Reset form
        setName("");
        setSelectedServices([]);
        setRating(0);
        setImage(null);
        setImagePreview(null);
        setComment("");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
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
        <h1 className="text-3xl font-accent text-blush mb-2 text-center">Leave a Review</h1>
        <p className="text-center text-muted-foreground mb-4 text-lg">
          We value your feedback! Please share your experience below.
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
          <Label className="text-black font-semibold">Services Done</Label>
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
        <div className="flex flex-col gap-2">
          <Label className="text-black font-semibold">Rating</Label>
          <div className="flex items-center gap-2 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => setRating(star)}
                className="focus:outline-none"
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
              >
                <Star
                  className={`w-8 h-8 transition-colors ${star <= rating ? 'fill-[#FFD700] text-[#FFD700] drop-shadow' : 'text-gray-300'}`}
                  fill={star <= rating ? 'currentColor' : 'none'}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="image-upload" className="text-black font-semibold">Upload Image (optional)</Label>
          <div className="flex items-center gap-4">
            <label htmlFor="image-upload" className="flex items-center gap-2 cursor-pointer px-4 py-2 bg-blush/10 text-blush rounded-xl hover:bg-blush/20 transition-colors font-medium">
              <ImageIcon className="w-5 h-5" />
              <span>Choose Image</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-2xl border-2 border-blush shadow-soft" />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="comment" className="text-black font-semibold">Comments / Review</Label>
          <textarea
            id="comment"
            placeholder="Share your experience..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="rounded-xl border-blush focus:ring-blush/40 focus:border-blush bg-blush-light/40 min-h-[100px] p-3 text-lg text-black"
            required
          />
        </div>
        <Button
          type="submit"
          className="bg-blush text-white rounded-xl font-semibold shadow-pastel hover:bg-blush/90 transition-colors text-lg py-4 mt-2"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Review"}
        </Button>
      </form>
    </section>
  );
} 
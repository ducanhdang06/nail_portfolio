"use client";

import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Star, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ReviewSection({ services, userName }: { services: string[], userName?: string }) {
  const [name, setName] = useState(userName || "");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [submittedComment, setSubmittedComment] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const router = useRouter();
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

  function showToast(message: string, type: "success" | "error" = "success") {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  }

  function copyToClipboard() {
    setTimeout(() => {
      navigator.clipboard.writeText(submittedComment)
        .then(() => {
          showToast("✅ Comment copied to clipboard!", "success");
        })
        .catch((err) => {
          console.error("Clipboard copy failed:", err);
          showToast("❌ Failed to copy. Please copy manually.", "error");
        });
    }, 0); // small delay improves Safari reliability without violating CSP
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
        setSubmittedComment(`For Sophie: ${comment}`);
        setShowPopup(true);
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

  function handleBackToHome() {
    if (userName) {
      router.push('/protected/');
    } else {
      router.push('/');
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

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Soft pastel overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blush-light/80 via-peach/40 to-mint/30 backdrop-blur-sm" />
          <div className="relative bg-white/95 rounded-3xl shadow-2xl border-2 border-blush p-8 max-w-md w-full mx-4 flex flex-col items-center space-y-6 animate-fadeInUp">
            {/* Confetti or checkmark icon */}
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blush/10 mb-2 shadow-soft">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-accent text-blush font-bold text-center">Review Submitted!</h2>
            <p className="text-center text-lg text-gray-700 font-medium">
              Thank you for your feedback!<br />Before leaving a public review, please copy your comment below:
            </p>

            <Button
              onClick={copyToClipboard}
              variant="outline"
              className="w-full rounded-2xl border-blush text-blush font-semibold text-base py-3 hover:bg-blush/10 transition-colors"
            >
              📋 Copy My Comment
            </Button>

            <div className="flex flex-col gap-2 w-full">
              <a
                href="https://www.yelp.com/writeareview/biz/gobahli-nails-san-marcos-6"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full rounded-2xl border-lilac text-lilac font-semibold text-base py-3 hover:bg-lilac/10 transition-colors">
                  ✨ Leave a Review on Yelp
                </Button>
              </a>

              <a
                href="https://www.google.com/maps/place/GoBahli+Nails/reviews"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="outline" className="w-full rounded-2xl border-mint text-mint font-semibold text-base py-3 hover:bg-mint/10 transition-colors">
                  ⭐ Leave a Review on Google
                </Button>
              </a>
            </div>

            <Button
              onClick={handleBackToHome}
              className="w-full bg-blush text-white rounded-2xl font-bold shadow-pastel hover:bg-blush/90 transition-colors text-lg py-4 mt-2"
            >
              Back to Home
            </Button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div
          className={`
            fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100]
            px-6 py-3 rounded-2xl shadow-pastel
            font-semibold text-base
            ${toast.type === "success" ? "bg-mint text-mint-dark" : "bg-red-100 text-red-700"}
            animate-fadeInUp
          `}
          style={{ minWidth: 220, textAlign: "center" }}
        >
          {toast.message}
        </div>
      )}

    </section>
  );
} 
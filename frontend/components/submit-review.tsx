'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Star, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function SubmitReview({ userId }: { userId: string }) {
  const [servicesDone, setServicesDone] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

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
    if (!servicesDone || !review || !rating) {
      alert('Please fill in all required fields.');
      return;
    }

    setLoading(true);
    let imageUrl = null;

    // Upload image if provided
    if (image) {
      const ext = image.name.split('.').pop();
      const filePath = `reviews/${userId}_${Date.now()}.${ext}`;

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
      imageUrl = data.publicUrl;
    }

    console.log('Submitting review:', {
      uuid: userId,
      rating,
      services: servicesDone,
      comment: review,
      image_url: imageUrl || null,
    });

    // Insert review into Supabase DB
    const { error: insertError } = await supabase.from('reviews').insert({
      user_id: userId,
      rating,
      services: servicesDone,
      comment: review,
      image_url: imageUrl,
    });

    if (insertError) {
      console.error('Insert error:', insertError);
      alert('Failed to submit review');
    } else {
      alert('Review submitted!');
      // Reset form
      setServicesDone('');
      setReview('');
      setRating(0);
      setImage(null);
      setImagePreview(null);
    }

    setLoading(false);
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white/95 rounded-3xl shadow-pastel border border-blush p-8 my-16">
      <h2 className="text-3xl font-accent text-blush mb-2 text-center">Share Your Experience</h2>
      <p className="text-center text-muted-foreground mb-6 text-lg">We'd love to hear about your visit!</p>
      <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="services-done" className="text-black font-semibold">Services Done</Label>
          <Input
            id="services-done"
            placeholder="e.g. Gel Manicure, Nail Art"
            value={servicesDone}
            onChange={e => setServicesDone(e.target.value)}
            className="rounded-xl border-blush focus:ring-blush/40 focus:border-blush bg-blush-light/40 text-lg"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="review" className="text-black font-semibold">Review</Label>
          <textarea
            id="review"
            placeholder="Share your experience..."
            value={review}
            onChange={e => setReview(e.target.value)}
            className="rounded-xl border-blush focus:ring-blush/40 focus:border-blush bg-blush-light/40 min-h-[120px] p-3 text-lg"
            rows={5}
          />
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
                  className={`w-8 h-8 transition-colors ${star <= rating ? 'fill-blush text-blush drop-shadow' : 'text-gray-300'}`}
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
        <Button
          type="submit"
          className="bg-blush text-white rounded-xl font-semibold shadow-pastel hover:bg-blush/90 transition-colors text-lg py-4 mt-2"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
}

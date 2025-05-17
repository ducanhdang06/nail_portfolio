// review-wrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import SubmitReview from './submit-review'; // adjust path if needed

export default function ReviewWrapper() {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user?.id) {
        setUserId(data.user.id);
      }
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading user...</p>;
  }

  if (!userId) {
    return <p className="text-center text-red-500">You must be logged in to submit a review.</p>;
  }

  return <SubmitReview userId={userId} />;
}

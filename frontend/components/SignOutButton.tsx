'use client';

import { Button } from '@/components/ui/button';
import { signOutAction } from '@/app/actions';

export default function SignOutButton() {
  return (
    <Button 
      variant="outline" 
      className="border-peach text-peach hover:bg-peach/10 hover:text-peach"
      onClick={() => signOutAction()}
    >
      Sign Out
    </Button>
  );
} 
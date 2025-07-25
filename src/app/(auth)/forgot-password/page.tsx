'use client';

import type React from 'react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForgotPasswordMutation } from '@/lib/api';
import type { ApiError, ForgotPasswordRequest } from '@/types';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ForgotPasswordForm() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const forgotMutation = useForgotPasswordMutation({
    onSuccess: async (data: ForgotPasswordRequest) => {
      console.log(data, 'data');
      router.push('/reset-password');
      toast.success('Reset link sent successfully!');
    },
    onError: (error: ApiError) => {
      setError(error.message || 'Failed to send reset link');
      toast.error(error.message || 'Failed to send reset link');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    // Prepare API payload
    const apiPayload = {
      email: email,
    };

    forgotMutation.mutate(apiPayload);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full flex flex-col gap-[30px] p-5 lg:p-10 bg-white rounded-lg shadow">
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-[24px] font-bold">Forgot password?</h2>
          <p className="text-[13px] text-muted-foreground font-medium">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>
        <div className="w-full h-px bg-[#F3F4F8]"></div>
        <CardContent className="px-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[15px]">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="h-[49px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={forgotMutation.isPending}>
              {forgotMutation.isPending ? 'Sending...' : 'Send Reset Link'}
            </Button>
            <div className="text-sm">
              Back to {''}
              <Link href="/login" className="text-primary">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

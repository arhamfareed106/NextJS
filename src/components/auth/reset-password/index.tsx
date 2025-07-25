'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useResetPasswordMutation } from '@/lib/api';
import { ApiError, ResetPasswordRequest } from '@/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    token: '',
    email: '',
  });

  // Get token and email from URL parameters
  useEffect(() => {
    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';

    setFormData((prev) => ({
      ...prev,
      token,
      email,
    }));

    // Redirect if token or email is missing
    if (!token || !email) {
      toast.error('Invalid reset link. Please request a new password reset.');
      router.push('/forgot-password');
    }
  }, [searchParams, router]);

  const resetPasswordMutation = useResetPasswordMutation({
    onSuccess: async (data: ResetPasswordRequest) => {
      console.log(data, 'data');
      router.push('/login');
      toast.success('Password reset successfully!');
    },
    onError: (error: ApiError) => {
      setError(error.message || 'Failed to reset password');
      toast.error(error.message || 'Failed to reset password');
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.newPassword) {
      toast.error('Please enter a new password');
      return;
    }

    if (formData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    if (!formData.confirmPassword) {
      toast.error('Please confirm your password');
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!formData.token || !formData.email) {
      toast.error('Invalid reset link. Please request a new password reset.');
      return;
    }

    // Prepare API payload
    const apiPayload = {
      token: formData.token,
      email: formData.email,
      password: formData.newPassword,
      password_confirmation: formData.confirmPassword,
    };

    resetPasswordMutation.mutate(apiPayload);
  };
  return (
    <div>
      <Card className="max-w-md w-full flex flex-col gap-[30px] p-5 lg:p-10 bg-white rounded-lg shadow">
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-[24px] font-bold">Set new password</h2>
          <p className="text-[13px] text-muted-foreground font-medium">Must be at least 8 characters.</p>
        </div>
        <div className="w-full h-px bg-[#F3F4F8]"></div>
        <CardContent className="p-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
            <div className="flex flex-col gap-[15px]">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                className="h-[49px]"
                value={formData.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-[15px]">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                className="h-[49px]"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={resetPasswordMutation.isPending}>
              {resetPasswordMutation.isPending ? 'Resetting...' : 'Confirm'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

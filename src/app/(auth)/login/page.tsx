'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLoginUserMutation } from '@/lib/api/hooks';
import { ApiError } from '@/lib/api/types';
import { LoginUserResponse } from '@/types';
import { EssentialUserData } from '@/types/user';
import { toast } from 'sonner';
import { tokenManager } from '@/lib/auth/token';
import Cookies from 'js-cookie';
import { getUserProfile } from '@/lib/api/helpers';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const loginMutation = useLoginUserMutation({
    onSuccess: async (data: LoginUserResponse) => {
      if (data.access_token) {
        // Set token in both token manager and cookie
        tokenManager.setToken(data.access_token);
        Cookies.set('access_token', data.access_token);

        try {
          // Fetch user profile after successful login
          const userProfile = await getUserProfile();
          if (userProfile?.data) {
            // Only save specific fields
            const essentialUserData: EssentialUserData = {
              name: userProfile.data.name,
              last_name: userProfile.data.last_name,
              role: userProfile.data.role,
              email: userProfile.data.email,
            };
            Cookies.set('user', JSON.stringify(essentialUserData));
            toast.success(`Login successful`);
            router.push('/dashboard');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setError('Failed to fetch user profile');
        }
      }
    },
    onError: (error: ApiError) => {
      setError(error.message || 'Login failed');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    loginMutation.mutate({
      email,
      password,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full flex flex-col gap-[30px] p-5 lg:p-10 bg-white rounded-lg shadow">
        {/* <div className="flex justify-center mb-6">
            <Image
              src="/logo-name.svg"
              alt="Logo"
              width={120}
              height={24}
              priority
            />
          </div> */}
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-[24px] font-bold">Sign In</h2>
          <p className="text-[13px] text-muted-foreground font-medium">Welcome back ! Please enter your details</p>
        </div>

        <div className="w-full h-px bg-[#F3F4F8]"></div>
        <form className="flex flex-col gap-[30px] " onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[15px]">
            <label htmlFor="" className="text-sm font-medium">
              Username
            </label>
            <Input
              type="email"
              required
              placeholder="Email address"
              className="h-[49px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[15px]">
            <div className="flex justify-between items-center">
              <label htmlFor="" className="text-sm font-medium">
                Password
              </label>
              <Link href="/forgot-password" className="text-xs font-medium text-primary">
                Forgot password?
              </Link>
            </div>
            <Input
              type="password"
              required
              className="h-[49px]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <p className="text-[13px] font-medium">
          Don’t have an account ?{' '}
          <Link href="/signup" className="text-primary">
            {' '}
            Sign up
          </Link>
        </p>
        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-md">
            <p className="text-sm font-medium text-red-800">Error:</p>
            <p className="mt-1 text-sm text-red-600 break-all">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import type React from 'react';

import { ResetPassword } from '@/components/auth/reset-password';
import { Suspense } from 'react';

export default function EnterPasswordForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Suspense fallback={<div>Loading...</div>}>
        <ResetPassword />
      </Suspense>
    </div>
  );
}

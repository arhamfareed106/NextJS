// OTPForm.tsx

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const FormSchema = z.object({
  pin: z.string().min(4, {
    message: 'Your one-time password must be 4 characters.',
  }),
});

export default function InputOTPForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: '',
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full flex flex-col gap-[30px] p-5 lg:p-10 bg-white rounded-lg shadow">
        <div className="flex flex-col gap-[5px]">
          <h2 className="text-[24px] font-bold">Enter your code</h2>
          <p className="text-[13px] text-muted-foreground font-medium">
            We sent a code to <b>joe@email.com</b>
          </p>
        </div>
        <div className="w-full h-px bg-[#F3F4F8]"></div>

        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="  flex flex-col gap-[30px]">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>One-Time Password</FormLabel> */}
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup className="">
                          <InputOTPSlot index={0} className="w-24 h-12" />
                          <InputOTPSlot index={1} className="w-24 h-12" />
                          <InputOTPSlot index={2} className="w-24 h-12" />
                          <InputOTPSlot index={3} className="w-24 h-12" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormDescription className="text-xs ">
                Didn’t receive the email?
                <Link href="#" className="text-primary">
                  {' Click to resend'}
                </Link>
              </FormDescription>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

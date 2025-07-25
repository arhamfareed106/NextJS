'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { useRegisterUserMutation } from '@/lib/api';
import type { ApiError, RegisterUserResponse } from '@/types';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function SignUpForm() {
  const [signUpForms, setSignUpForms] = useState(false);
  const [showPickup, setShowPickup] = useState(true);
  const [showReturn, setShowReturn] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  // Form states
  const [formData, setFormData] = useState({
    // Initial form fields
    username: '',
    email: '',
    password: '',
    agreeTerms: false,

    // Company information
    company_name: '',
    company_code: '',
    company_vat_code: '',
    company_address: '',

    // Pickup address
    pickup_country: '',
    pickup_city: '',
    pickup_street: '',
    pickup_street_number: '',
    pickup_zip_code: '',

    // Return address
    return_country: '',
    return_city: '',
    return_street: '',
    return_street_number: '',
    return_zip_code: '',

    // Contacts
    name: '',
    last_name: '',
    phone_number: '',

    // Bank account
    bank_name: '',
    iban: '',
  });

  const signupMutation = useRegisterUserMutation({
    onSuccess: async (data: RegisterUserResponse) => {
      console.log(data, 'data');
      router.push('/login');
      toast.success('Registration successful!');
    },
    onError: (error: ApiError) => {
      setError(error.message || 'Signup failed');
      toast.error(error.message || 'Signup failed');
    },
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.agreeTerms) {
      toast.error('Please agree to the Terms & Privacy');
      return;
    }

    // Prepare API payload
    const apiPayload = {
      email: formData.email,
      password: formData.password,
      company_name: formData.company_name,
      company_code: formData.company_code,
      company_vat_code: formData.company_vat_code,
      company_address: formData.company_address,
      pickup_country: formData.pickup_country,
      pickup_city: formData.pickup_city,
      pickup_street: formData.pickup_street,
      pickup_street_number: formData.pickup_street_number,
      pickup_zip_code: formData.pickup_zip_code,
      return_country: formData.return_country,
      return_city: formData.return_city,
      return_street: formData.return_street,
      return_street_number: formData.return_street_number,
      return_zip_code: formData.return_zip_code,
      name: formData.name,
      last_name: formData.last_name,
      phone_number: formData.phone_number,
      bank_name: formData.bank_name,
      iban: formData.iban,
    };

    signupMutation.mutate(apiPayload);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {signUpForms ? (
        <Card className="max-w-[835px] w-full flex flex-col gap-[30px] p-5 lg:p-10 bg-white rounded-lg shadow">
          <div className="flex flex-col gap-[5px]">
            <h2 className="text-[24px] font-bold">Fill in your personal information</h2>
          </div>
          <div className="flex flex-col gap-5">
            <h3 className="text-base font-bold">Company information</h3>
            <div className="w-full h-px bg-[#F3F4F8]"></div>
          </div>
          <CardContent className="p-0">
            <div className="flex flex-col gap-[30px]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    className="h-[49px]"
                    type="text"
                    value={formData.company_name}
                    onChange={(e) => handleInputChange('company_name', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="company-code">Company code</Label>
                  <Input
                    id="company-code"
                    className="h-[49px]"
                    type="text"
                    value={formData.company_code}
                    onChange={(e) => handleInputChange('company_code', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="company-vat">Company VAT code</Label>
                  <Input
                    id="company-vat"
                    className="h-[49px]"
                    type="text"
                    value={formData.company_vat_code}
                    onChange={(e) => handleInputChange('company_vat_code', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="company-address">Company address</Label>
                  <Input
                    id="company-address"
                    className="h-[49px]"
                    type="text"
                    value={formData.company_address}
                    onChange={(e) => handleInputChange('company_address', e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Pickup Address Toggle */}
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold">
                    Pickup address <span className="font-medium text-red-50">(For couriers)</span>
                  </h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowPickup(!showPickup)}
                    className="flex items-center gap-2"
                  >
                    {showPickup ? 'Hide' : 'Show'}
                    <Image
                      src={'/icons/arrow-down-blue.svg'}
                      width={18}
                      height={18}
                      alt=""
                      className={`transition-transform duration-300 ${showPickup ? 'rotate-0' : 'rotate-180'}`}
                    />
                  </Button>
                </div>
                <div className="w-full h-px bg-[#F3F4F8]" />
              </div>

              <div
                className={`transition-all flex flex-col gap-[30px] duration-500 ease-in-out overflow-hidden ${
                  showPickup ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="pickup-country">Country</Label>
                    <Select
                      name="pickup-country"
                      value={formData.pickup_country}
                      onValueChange={(value) => handleInputChange('pickup_country', value)}
                      required
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="united-states">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="brazil">Brazil</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="lithuania">Lithuania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="pickup-city">City</Label>
                    <Input
                      id="pickup-city"
                      className="h-[49px]"
                      type="text"
                      value={formData.pickup_city}
                      onChange={(e) => handleInputChange('pickup_city', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="pickup-street">Street</Label>
                    <Input
                      id="pickup-street"
                      className="h-[49px]"
                      type="text"
                      value={formData.pickup_street}
                      onChange={(e) => handleInputChange('pickup_street', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="pickup-street-number">Street number</Label>
                    <Input
                      id="pickup-street-number"
                      className="h-[49px]"
                      type="text"
                      value={formData.pickup_street_number}
                      onChange={(e) => handleInputChange('pickup_street_number', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="pickup-zip">ZIP Code</Label>
                    <Input
                      id="pickup-zip"
                      className="h-[49px]"
                      type="text"
                      value={formData.pickup_zip_code}
                      onChange={(e) => handleInputChange('pickup_zip_code', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="phone-number">Phone Number</Label>
                    <Input id="phone-number" className="h-[49px]" type="number" required />
                  </div>
                </div>
              </div>

              {/* Return Address Toggle */}
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold">
                    Return address <span className="font-medium text-red-50">(For couriers)</span>
                  </h3>
                  <Button
                    variant="ghost"
                    onClick={() => setShowReturn(!showReturn)}
                    className="flex items-center gap-2"
                  >
                    {showReturn ? 'Hide' : 'Show'}
                    <Image
                      src={'/icons/arrow-down-blue.svg'}
                      width={18}
                      height={18}
                      alt=""
                      className={`transition-transform duration-300 ${showReturn ? 'rotate-0' : 'rotate-180'}`}
                    />
                  </Button>
                </div>
                <div className="w-full h-px bg-[#F3F4F8]" />
              </div>

              <div
                className={`transition-all flex flex-col gap-[30px] duration-500 ease-in-out overflow-hidden ${
                  showReturn ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="return-country">Country</Label>
                    <Select
                      name="return-country"
                      value={formData.return_country}
                      onValueChange={(value) => handleInputChange('return_country', value)}
                      required
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="united-states">United States</SelectItem>
                        <SelectItem value="canada">Canada</SelectItem>
                        <SelectItem value="united-kingdom">United Kingdom</SelectItem>
                        <SelectItem value="australia">Australia</SelectItem>
                        <SelectItem value="germany">Germany</SelectItem>
                        <SelectItem value="france">France</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                        <SelectItem value="china">China</SelectItem>
                        <SelectItem value="brazil">Brazil</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="lithuania">Lithuania</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="return-city">City</Label>
                    <Input
                      id="return-city"
                      className="h-[49px]"
                      type="text"
                      value={formData.return_city}
                      onChange={(e) => handleInputChange('return_city', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="return-street">Street</Label>
                    <Input
                      id="return-street"
                      className="h-[49px]"
                      type="text"
                      value={formData.return_street}
                      onChange={(e) => handleInputChange('return_street', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="return-street-number">Street number</Label>
                    <Input
                      id="return-street-number"
                      className="h-[49px]"
                      type="text"
                      value={formData.return_street_number}
                      onChange={(e) => handleInputChange('return_street_number', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="return-zip">ZIP Code</Label>
                    <Input
                      id="return-zip"
                      className="h-[49px]"
                      type="text"
                      value={formData.return_zip_code}
                      onChange={(e) => handleInputChange('return_zip_code', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-[15px]">
                    <Label htmlFor="number-phone">Phone Number</Label>
                    <Input id="number-phone" className="h-[49px]" type="number" required />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold">Contacts</h3>
                </div>
                <div className="w-full h-px bg-[#F3F4F8]"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="contact-name">Name</Label>
                  <Input
                    id="contact-name"
                    className="h-[49px]"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input
                    id="last-name"
                    className="h-[49px]"
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    className="h-[49px]"
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => handleInputChange('phone_number', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    className="h-[49px]"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold">Bank swift code</h3>
                </div>
                <div className="w-full h-px bg-[#F3F4F8]"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="bank-name">Name of bank</Label>
                  <Input
                    id="bank-name"
                    className="h-[49px]"
                    type="text"
                    value={formData.bank_name}
                    onChange={(e) => handleInputChange('bank_name', e.target.value)}
                    required
                  />
                </div>
                <div className="flex flex-col gap-[15px]">
                  <Label htmlFor="iban">Bank IBAN</Label>
                  <Input
                    id="iban"
                    className="h-[49px]"
                    type="text"
                    value={formData.iban}
                    onChange={(e) => handleInputChange('iban', e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button onClick={handleSubmit} disabled={signupMutation.isPending}>
                {signupMutation.isPending ? 'Signing up...' : 'Sign up'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-md w-full flex flex-col gap-[30px] p-5 lg:p-10 bg-white rounded-lg shadow">
          <div className="flex flex-col gap-[5px]">
            <h2 className="text-[24px] font-bold">Get Started Now</h2>
            <p className="text-[13px] text-muted-foreground font-medium">
              Enter your credentials to access your account
            </p>
          </div>
          <div className="w-full h-px bg-[#F3F4F8]"></div>
          <CardContent className="p-0">
            <div className="flex flex-col gap-[30px]">
              <div className="flex flex-col gap-[15px]">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Tomas Omka"
                  className="h-[49px]"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-[15px]">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  className="h-[49px]"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-[15px]">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  className="h-[49px]"
                  placeholder="************"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                />
              </div>
              <RadioGroup
                value={formData.agreeTerms ? 'agree' : ''}
                onValueChange={(value) => handleInputChange('agreeTerms', value === 'agree')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem id="agree" value="agree" />
                  <Label htmlFor="agree" className="text-sm text-gray-900">
                    I agree to the <span className="underline">Terms & Privacy</span>
                  </Label>
                </div>
              </RadioGroup>
              <Button
                className="w-full"
                onClick={() => {
                  if (!formData.agreeTerms) {
                    toast.error('Please agree to the Terms & Privacy');
                    return;
                  }
                  setSignUpForms(true);
                }}
              >
                Sign Up
              </Button>
              <div className=" text-sm">
                Have an account ? {''}
                <Link href="/login" className="underline text-primary">
                  Sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

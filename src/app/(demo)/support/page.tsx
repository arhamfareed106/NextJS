'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search } from 'lucide-react';
import { Heading } from '@/components/wrappers/heading';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import { Separator } from '@radix-ui/react-dropdown-menu';

const FAQData = [
  {
    question: 'How do I reset my password?',
    answer:
      "To reset your password, click on the 'Forgot Password' link on the login page. You'll receive an email with instructions to create a new password.",
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for business accounts.',
  },
  {
    question: 'How can I cancel my subscription?',
    answer:
      'You can cancel your subscription at any time by going to Account Settings > Subscriptions > Cancel Subscription. Your access will continue until the end of your billing period.',
  },
  {
    question: "What's your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all our plans. If you're not satisfied with our service, you can request a full refund within the first 30 days of your subscription.",
  },
  {
    question: 'How do I add a new product?',
    answer:
      "To add a new product, go to the 'Products' section and click on 'Add New Product.' Fill in the required details and save.",
  },
  {
    question: 'How can I view my order history?',
    answer:
      "You can view your order history by navigating to the 'Orders' section. Here, you'll see a list of past orders with their details.",
  },
  {
    question: 'Where can I view my balance?',
    answer:
      "Your account balance can be viewed under the 'Balance' section. It shows the current balance and transaction history.",
  },
  {
    question: 'How do I manage user roles and permissions?',
    answer:
      "User roles and permissions can be managed in the 'Admin Panel' under 'User Management.' From here, you can assign roles, update permissions, and manage access.",
  },
  {
    question: 'How do I generate an invoice?',
    answer:
      "To generate an invoice, go to the 'Invoices' section, select the relevant order, and click 'Generate Invoice.' The invoice can be downloaded or sent via email.",
  },
  {
    question: 'How can I view shipping details?',
    answer:
      "Shipping details are available in the 'Carriage' section. Here, you can track shipments and view estimated delivery times for each order.",
  },
  {
    question: 'Where can I find payment details?',
    answer:
      "Payment details are listed in the 'Payments' section under 'Admin Panel.' You can view completed and pending payments, as well as issue refunds if necessary.",
  },
  {
    question: 'How can I manage product categories and pricing?',
    answer:
      "To manage product categories and pricing, go to 'Product Management' under the 'Admin Panel.' Here, you can add, edit, and organize categories and set prices.",
  },
  {
    question: 'How do I initiate a payout?',
    answer:
      "To initiate a payout, navigate to 'Payout' in the 'Admin Panel,' enter the required details, and submit the request. Processing time may vary depending on the payment method.",
  },
];

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = FAQData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Support', href: '/support' },
  ];

  return (
    <ContentLayout title="Dashboard">
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="my-6" />
      <div className="col-span-2">
        <Heading
          level="h4"
          heading="Support Center"
          subheading="Find answers to frequently asked questions or search for specific topics."
        />
        <Separator className="my-3" />

        {/* Search */}
        <div className="relative md:w-1/2 ">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        {/* FAQ Accordion in Two Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 md:px-6">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground col-span-2">
              No matching questions found. Try a different search term.
            </div>
          ) : (
            filteredFAQs.map((faq, index) => (
              <Accordion key={index} type="single" collapsible className="w-full">
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-bold">{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              </Accordion>
            ))
          )}
        </div>

        <Separator className="my-6" />

        {/* Contact Section */}
        <div className="p-6 border rounded-lg bg-muted/50">
          <h2 className="text-xl font-semibold mb-2">Still need help?</h2>
          <p className="text-muted-foreground">
            Our support team is available Monday through Friday, 9am-6pm EST.
            <br />
            Email us at: info@mastersel.com
          </p>
        </div>
      </div>
    </ContentLayout>
  );
}

"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useMediaQuery } from "@/hooks/use-media-query";
import { PayoutDialog } from "./payout-dialog";

import { Payout, PayoutFilters, PayoutStatus } from "@/types/payout";
import { generatePayouts } from "@/lib/data/payouts";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";

const PayoutPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [payouts] = useState<Payout[]>(() => generatePayouts(20));
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [filters, setFilters] = useState<PayoutFilters>({
    query: "",
    status: "all",
  });

  const handleFilterChange = (newFilters: Partial<PayoutFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handlePayoutClick = (payout: Payout) => {
    if (isMobile) {
      setSelectedPayout(payout);
      setDialogOpen(true);
    }
  };

  const filteredPayouts = payouts.filter((payout) => {
    const matchesSearch =
      !filters.query ||
      payout.name.toLowerCase().includes(filters.query.toLowerCase()) ||
      payout.email.toLowerCase().includes(filters.query.toLowerCase());

    const matchesStatus =
      filters.status === "all" || payout.status === filters.status;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: PayoutStatus) => {
    return status === "Paid"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";
  };

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Admin Panel: Payout", href: "/payout" },
  ];

  return (
    <ContentLayout title="Payout">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="py-4 space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Payout</h1>
          <p className="text-sm text-gray-500">
            Manage and track your payment transactions
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 pb-2">
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8 w-full md:w-[300px]"
                value={filters.query}
                onChange={(e) => handleFilterChange({ query: e.target.value })}
              />
            </div>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                handleFilterChange({ status: value as PayoutStatus | "all" })
              }
            >
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Show all status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </CardHeader>
          <CardContent>
            {isMobile ? (
              // Mobile view
              <div className="space-y-4">
                {filteredPayouts.map((payout) => (
                  <div
                    key={payout.id}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    onClick={() => handlePayoutClick(payout)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {payout.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{payout.name}</div>
                        <div className="text-sm text-gray-500">
                          €{payout.amount.toFixed(2)}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(payout.status)}>
                      {payout.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              // Desktop view
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>To pay</TableHead>
                    <TableHead>Date of payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>
                            {payout.name.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{payout.name}</div>
                          <div className="text-sm text-gray-500">
                            {payout.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(payout.status)}>
                          {payout.status}
                        </Badge>
                      </TableCell>
                      <TableCell>€{payout.amount.toFixed(2)}</TableCell>
                      <TableCell>{payout.paymentDate || "-"}</TableCell>
                      <TableCell className="text-right">
                        {payout.status === "Pending" ? (
                          <Button
                            variant="default"
                            className="bg-indigo-600 hover:bg-indigo-700"
                          >
                            Pay balance
                          </Button>
                        ) : (
                          <Button variant="outline">Balance</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <PayoutDialog
          payout={selectedPayout}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </ContentLayout>
  );
};

export default PayoutPage;

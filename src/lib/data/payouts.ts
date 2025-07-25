// lib/mock/payouts.ts
import {
  randFullName,
  randEmail,
  randPastDate,
  randNumber,
  randUuid,
} from "@ngneat/falso";
import { Payout, PayoutStatus } from "@/types/payout";

// Helper to randomly select from an array
const randFromArray = <T>(arr: T[]): T => {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Generate a single payout record
export const generatePayout = (): Payout => {
  const status: PayoutStatus = randFromArray(["Paid", "Pending"]);
  const name = randFullName();

  return {
    id: randUuid(),
    name,
    email: randEmail({
      firstName: name.split(" ")[0],
      lastName: name.split(" ")[1],
    }),
    status,
    amount: Number(randNumber({ min: 100, max: 2000, fraction: 2 }).toFixed(2)),
    paymentDate:
      status === "Paid"
        ? randPastDate().toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        : undefined,
  };
};

// Generate multiple payout records
export const generatePayouts = (count: number = 10): Payout[] => {
  return Array.from({ length: count }, generatePayout);
};

// Sample static data for development
export const samplePayouts: Payout[] = [
  {
    id: "1",
    name: "ui omka",
    email: "design@uiomka.com",
    status: "Paid",
    amount: 999.29,
    paymentDate: "Fri, Apr 9",
  },
  {
    id: "2",
    name: "ui omka",
    email: "design@uiomka.com",
    status: "Pending",
    amount: 999.29,
  },
  {
    id: "3",
    name: "ui omka",
    email: "design@uiomka.com",
    status: "Paid",
    amount: 999.29,
    paymentDate: "Fri, Apr 9",
  },
  {
    id: "4",
    name: "ui omka",
    email: "design@uiomka.com",
    status: "Pending",
    amount: 999.29,
  },
  {
    id: "5",
    name: "ui omka",
    email: "design@uiomka.com",
    status: "Paid",
    amount: 999.29,
    paymentDate: "Fri, Apr 9",
  },
];

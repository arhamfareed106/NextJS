export type Payment = {
  id: string;
  marketplace: string;
  category: string;
  subcategory: string;
  brand: string;
  user: {
    name: string;
    email: string;
  };
  name: string;
  price: number;
  commissionPrice: number;
  logisticsCost: number;
  percentageDiscount: number;
  notice: string;
};

import {
  randUuid,
  randCompanyName,
  randProductCategory,
  randProductDescription,
  randBrand,
  randFullName,
  randEmail,
  randFloat,
  randNumber,
  randProductName,
} from "@ngneat/falso";

const generateMockupPaymentData = (count: number = 10): Payment[] => {
  return Array.from({ length: count }, () => {
    const category = randProductCategory();
    const marketplace = randNumber({ min: 1, max: 10 }) > 5 ? "B2B" : "B2C";
    const price = randFloat({ min: 50, max: 2000, fraction: 2 });

    return {
      id: randUuid(),
      marketplace,
      category,
      subcategory: randProductCategory(), // Using product category again for subcategory
      brand: randBrand(),
      user: {
        name: randFullName(),
        email: randEmail(),
      },
      name: randProductName(),
      price,
      commissionPrice: Math.floor(price * randFloat({ min: 0.05, max: 0.15 })), // 5-15% of price
      logisticsCost: randFloat({ min: 10, max: 100, fraction: 2 }),
      percentageDiscount: randNumber({ min: 0, max: 30 }), // 0-30% discount
      notice: randProductDescription(),
    };
  });
};

export default generateMockupPaymentData;
export { generateMockupPaymentData };
// Example usage:
// const mockPayments = generateMockupPaymentData(20); // Generates 20 payment records

// To match your example data structure more closely:
export const payments: Payment[] = [
  {
    id: "1",
    marketplace: "B2B",
    category: "Electronics",
    subcategory: "Telephone",
    brand: "Nike",
    user: {
      name: "ui.omka",
      email: "design@uiomka.com",
    },
    name: "Nike",
    price: 999.29,
    commissionPrice: 999.29,
    logisticsCost: 999.29,
    percentageDiscount: 10,
    notice:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
  {
    id: "2",
    marketplace: "B2B",
    category: "Electronics",
    subcategory: "Shoes",
    brand: "Nike",
    user: {
      name: "ui.omka",
      email: "design@uiomka.com",
    },
    name: "Nike",
    price: 999.29,
    commissionPrice: 999.29,
    logisticsCost: 999.29,
    percentageDiscount: 5,
    notice:
      "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
  },
];

import {
  randUuid,
  randProductName,
  randProductDescription,
  randProductCategory,
  randNumber,
  randFloat,
  randFullName,
  randEmail,
  randBetweenDate,
} from "@ngneat/falso";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sku: string;
  barcode: string;
  qty: number;
  price: number;
  image: string;
  sellers: Seller[];
}

export interface Seller {
  id: string;
  name: string;
  email: string;
  price: number;
}

// Helper function to generate SKU
const generateSKU = (index: number): string => {
  // Format: 31XXX where XXX is a sequential number padded with zeros
  return `31${String(index + 1000).slice(-3)}`;
};

const generateMockSeller = (basePrice: number): Seller => {
  // Generate price variation within 30% above base price
  const priceVariation = randFloat({ min: 0, max: 0.3 });

  return {
    id: randUuid(),
    name: randFullName(),
    email: randEmail(),
    price: Number((basePrice * (1 + priceVariation)).toFixed(2)),
  };
};

const generateMockProduct = (index: number): Product => {
  const basePrice = randFloat({ min: 299, max: 1999, fraction: 2 });
  const numSellers = randNumber({ min: 1, max: 4 }); // Random number of sellers (1-4)

  return {
    id: String(index + 1),
    name: randProductName(),
    description: randProductCategory(),
    category: randProductCategory(),
    sku: generateSKU(index),
    barcode: `1242535${String(index + 7566).padStart(4, "0")}`, // Maintains similar format to original
    qty: randNumber({ min: 10000, max: 50000 }),
    price: Number(basePrice.toFixed(2)),
    image: `/mock/product${getRandomInt(1, 5)}.png`,
    sellers: Array.from({ length: numSellers }, () =>
      generateMockSeller(basePrice)
    ),
  };
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateMockProducts = (count: number = 10): Product[] => {
  return Array.from({ length: count }, (_, index) =>
    generateMockProduct(index)
  );
};

// Static example data matching the original format
export const mockStaticProducts: Product[] = [
  {
    id: "1",
    name: "Apple iPhone 13",
    description: "10.2-inch Retina Display, 64GB",
    category: "Electronics",
    sku: "31063",
    barcode: "12425357566",
    qty: 31063,
    price: 999.29,
    image: "/placeholder.svg?height=100&width=100",
    sellers: [
      {
        id: "1",
        name: "ui omka",
        email: "design@uio.com",
        price: 999.29,
      },
      {
        id: "2",
        name: "ui omka",
        email: "design@uio.com",
        price: 1099.29,
      },
      {
        id: "3",
        name: "ui omka",
        email: "design@uio.com",
        price: 1299.29,
      },
    ],
  },
  {
    id: "2",
    name: "Apple iPhone 13",
    description: "10.2-inch Retina Display, 64GB",
    category: "Electronics",
    sku: "31064",
    barcode: "12425357567",
    qty: 31064,
    price: 999.29,
    image: "/placeholder.svg?height=100&width=100",
    sellers: [
      {
        id: "4",
        name: "ui omka",
        email: "design@uio.com",
        price: 999.29,
      },
    ],
  },
];

export { generateMockProducts };
export default generateMockProducts;

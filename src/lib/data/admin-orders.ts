import { faker } from "@faker-js/faker";
import {
  randUuid,
  randProductName,
  randProductDescription,
  randNumber,
  randFloat,
  randFullName,
  randPastDate,
  randFutureDate,
  randProductCategory,
  randBoolean,
  randCompanyName,
} from "@ngneat/falso";

const MARKETPLACES = [
  "Amazon",
  "eBay",
  "Etsy",
  "Walmart",
  "Pigs.lt",
  "Shopify",
];
const ORDER_STATUSES = [
  "Pending",
  "Confirmed",
  "Processing",
  "Out of delivery",
  "Delivered",
  "Cancelled",
  "Returned",
  "Send by",
  "Dispatched",
];

// Generate a consistent set of users
const generateMockUsers = (count = 5) => {
  return Array.from({ length: count }, () => ({
    id: randUuid(),
    name: randFullName(),
    email: `${randFullName().toLowerCase().replace(" ", ".")}@example.com`,
  }));
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MOCK_USERS = generateMockUsers(5);

export const generateMockOrders = (count = 10) => {
  return Array.from({ length: count }, () => {
    const user = MOCK_USERS[randNumber({ min: 0, max: MOCK_USERS.length - 1 })];
    const sellingPrice = randFloat({ min: 10, max: 2000, fraction: 2 });
    const commission = randFloat({
      min: sellingPrice * 0.05,
      max: sellingPrice * 0.15,
      fraction: 2,
    });
    const logistics = randFloat({ min: 10, max: 100, fraction: 2 });

    return {
      id: randUuid(),
      product: {
        name: randProductName(),
        image: `/mock/product${getRandomInt(1, 5)}.png`,
        description: randProductCategory(),
        category: randProductCategory(),
      },
      marketplace:
        MARKETPLACES[randNumber({ min: 0, max: MARKETPLACES.length - 1 })],
      status:
        ORDER_STATUSES[randNumber({ min: 0, max: ORDER_STATUSES.length - 1 })],
      sellingPrice,
      commission,
      logistics,
      userPrice: sellingPrice - commission - logistics,
      user,
      createdAt: randPastDate().toISOString(),
      updatedAt: randPastDate().toISOString(),
      estimatedDelivery: randFutureDate().toISOString(),
      company: randCompanyName(),
    };
  });
};

// Export mock data to be used across components
export const mockOrders = generateMockOrders(50);
export const mockUsers = MOCK_USERS;

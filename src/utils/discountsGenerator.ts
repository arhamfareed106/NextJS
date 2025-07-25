import { faker } from "@faker-js/faker";
import { Discount } from "@/types/types";

function generateDiscountData(numItems: number): Discount[] {
  const categories = [
    "Shoes",
    "Clothing",
    "Accessories",
    "Electronics",
    "Home",
  ];

  const brands = ["Nike", "Adidas", "Apple", "Samsung", "Tesla"];

  return Array.from({ length: numItems }).map((_, index) => {
    const name = faker.helpers.arrayElement(brands); // Updated to use the correct method
    const category = faker.helpers.arrayElement(categories); // Updated to use helpers
    const percentage = faker.number.int({ min: 10, max: 90 }); // Updated to use number.int
    const startDate = faker.date
      .between({ from: "2024-01-01", to: "2024-06-01" })
      .toISOString()
      .split("T")[0];
    const endDate = faker.date
      .between({ from: startDate, to: "2024-12-31" })
      .toISOString()
      .split("T")[0];
    const fromPrice = faker.number.int({ min: 50, max: 500 }); // Updated to use number.int
    const toPrice = faker.number.int({ min: fromPrice, max: fromPrice + 500 }); // Updated to use number.int
    const orders = faker.number.int({ min: 10, max: 5000 }); // Updated to use number.int
    const currentPrice = parseFloat(
      faker.finance.amount({ min: 10, max: 1000 })
    ); // No change needed here

    return {
      id: (index + 1).toString(),
      name,
      category,
      percentage,
      startDate,
      endDate,
      priceRange: { from: fromPrice, to: toPrice },
      orders,
      currentPrice,
    };
  });
}

// Example usage:
// const sampleData = generateDiscountData(10);
// console.log(sampleData);

export default generateDiscountData;

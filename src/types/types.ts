// types.ts
export type Discount = {
  id: string;
  name: string;
  category: string;
  percentage: number;
  startDate: string;
  endDate: string;
  priceRange: {
    from: number;
    to: number;
  };
  orders?: number;
  currentPrice?: number;
};

// types.ts
export interface Invoice {
  id: string;
  number: string;
  total: number;
  issuedDate: string;
  status: string;
  customer: {
    name: string;
    company: string;
    email: string;
    address: string;
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total: number;
    ean: string;
    sku: string;
  }[];
  note: string;
}

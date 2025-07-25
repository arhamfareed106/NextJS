import { faker } from "@faker-js/faker";
import { Invoice } from "@/types/invoice.types";

export const generateRandomInvoice = (): Invoice => {
  // Generate between 1 to 5 items
  const itemsCount = faker.number.int({ min: 1, max: 5 });
  const items = Array.from({ length: itemsCount }, () => {
    const quantity = faker.number.int({ min: 1, max: 20 });
    const price = faker.number.float({
      min: 100,
      max: 5000,
      fractionDigits: 2,
    });
    const generateSKU = (): string => {
      const prefix = faker.string.numeric(2);
      const suffix = faker.string.numeric(4);
      return `${prefix}-${suffix}`;
    };
    return {
      id: faker.string.nanoid(10),
      name: faker.commerce.productName(),
      quantity,
      price,
      total: quantity * price,
      ean: faker.string.numeric(12),
      sku: generateSKU(),
    };
  });

  // Calculate total from all items
  const total = items.reduce((sum, item) => sum + item.total, 0);

  // Helper function to generate invoice notes
  const generateNote = (): string => {
    const notes = [
      "Thank you for your business!",
      "Payment is due within 30 days",
      "Please include invoice number with payment",
      "Make checks payable to the company name",
      "Late payments subject to 1.5% monthly fee",
      `Payment due by: ${faker.date.future().toLocaleDateString()}`,
      "For questions about this invoice, please contact our billing department",
      "Wire transfer details available upon request",
      `Special instructions: ${faker.lorem.sentence()}`,
      "This is a computer-generated invoice, no signature required",
    ];

    return faker.helpers.arrayElement(notes);
  };

  return {
    id: faker.string.uuid(),
    number: `#${faker.string.numeric(4)}`,
    total,
    issuedDate: faker.date
      .between({
        from: "2023-01-01",
        to: "2024-12-31",
      })
      .toISOString()
      .split("T")[0],
    status: faker.helpers.arrayElement(["paid", "pending", "overdue"]),
    customer: {
      name: faker.person.fullName(),
      company: faker.company.name(),
      email: faker.internet.email(),
      address: `${faker.location.streetAddress()}, ${faker.location.zipCode()}, ${faker.location.country()}`,
    },
    items,
    note: generateNote(),
  };
};

export const generateMockInvoices = (count: number = 10): Invoice[] => {
  return Array.from({ length: count }, generateRandomInvoice);
};

// Example usage:
// const mockInvoices = generateMockInvoices(5);

// Generate a specific number of invoices with a seed for consistent results
export const generateSeededMockInvoices = (
  count: number = 10,
  seed: number = 123
): Invoice[] => {
  faker.seed(seed);
  return generateMockInvoices(count);
};

// export const mockInvoices = generateMockInvoices(5);
// console.log(generateMockInvoices(5));

export const mockInvoices = [
  {
    id: "9bd72c9d-ac81-48cb-81c6-3871cddb4316",
    number: "#7572",
    total: 106123.71999999999,
    issuedDate: "2024-10-28",
    status: "paid",
    customer: {
      name: "Amanda Gleason",
      company: "Volkman - Stokes",
      email: "Eula_Schroeder-Aufderhar@yahoo.com",
      address: "468 Rowan Crest, 42779-1936, Guernsey",
    },
    items: [
      {
        id: "8YuIfKqPuw",
        name: "Elegant Wooden Keyboard",
        quantity: 3,
        price: 1931,
        total: 5793,
        ean: "110579670961",
        sku: "11-7806",
      },
      {
        id: "ZvgRLs4eMR",
        name: "Awesome Metal Table",
        quantity: 17,
        price: 2693.2,
        total: 45784.399999999994,
        ean: "761386944186",
        sku: "83-6252",
      },
      {
        id: "xTXikXaq2B",
        name: "Sleek Frozen Shirt",
        quantity: 9,
        price: 3571.42,
        total: 32142.78,
        ean: "779737950073",
        sku: "55-3058",
      },
      {
        id: "b6DfmJgdAD",
        name: "Rustic Rubber Car",
        quantity: 11,
        price: 590.89,
        total: 6499.79,
        ean: "777443782705",
        sku: "68-6713",
      },
      {
        id: "GDvVwhYekS",
        name: "Generic Concrete Bike",
        quantity: 5,
        price: 3180.75,
        total: 15903.75,
        ean: "770260131268",
        sku: "86-5675",
      },
    ],
    note: "Payment is due within 30 days",
  },
  {
    id: "83101d1d-92b8-47a4-a959-d35cdbc39967",
    number: "#9494",
    total: 81068.96,
    issuedDate: "2023-04-30",
    status: "pending",
    customer: {
      name: "Toby Nader",
      company: "Rice - Weber",
      email: "Stone.Rempel-Pfeffer@yahoo.com",
      address: "150 Davis Street, 38791-7978, United Kingdom",
    },
    items: [
      {
        id: "KHM_Ztw3-I",
        name: "Refined Fresh Cheese",
        quantity: 2,
        price: 3918.35,
        total: 7836.7,
        ean: "320268754012",
        sku: "84-1699",
      },
      {
        id: "tRkcjfnLKd",
        name: "Practical Cotton Computer",
        quantity: 1,
        price: 1399.44,
        total: 1399.44,
        ean: "537123373638",
        sku: "65-1509",
      },
      {
        id: "2NFsN5tvOG",
        name: "Sleek Frozen Chicken",
        quantity: 17,
        price: 4225.46,
        total: 71832.82,
        ean: "896589643761",
        sku: "95-9526",
      },
    ],
    note: "Late payments subject to 1.5% monthly fee",
  },
  {
    id: "9b9c9868-1108-468f-8c6e-95036db58742",
    number: "#7366",
    total: 54791.71000000001,
    issuedDate: "2024-05-11",
    status: "overdue",
    customer: {
      name: "John Bartell MD",
      company: "Russel - McCullough",
      email: "Saige.Lockman84@gmail.com",
      address: "9759 Runolfsson Forks, 73062, Egypt",
    },
    items: [
      {
        id: "wWDOS3SO35",
        name: "Rustic Bronze Ball",
        quantity: 2,
        price: 397.72,
        total: 795.44,
        ean: "145486942265",
        sku: "10-9686",
      },
      {
        id: "YBEH4aJM7_",
        name: "Incredible Frozen Shoes",
        quantity: 17,
        price: 2715.04,
        total: 46155.68,
        ean: "289329864128",
        sku: "87-7775",
      },
      {
        id: "bptZr4iSqO",
        name: "Practical Fresh Shoes",
        quantity: 3,
        price: 2613.53,
        total: 7840.59,
        ean: "952390541342",
        sku: "40-5402",
      },
    ],
    note: "Thank you for your business!",
  },
  {
    id: "5897d863-87ec-4472-b142-336f75a6f86d",
    number: "#7765",
    total: 102148.68,
    issuedDate: "2023-04-17",
    status: "paid",
    customer: {
      name: "Adrienne Auer",
      company: "Goldner - Hartmann",
      email: "Suzanne_Jacobs97@hotmail.com",
      address: "632 Hills Valleys, 10118-6340, Antarctica",
    },
    items: [
      {
        id: "QEvHnlU_VY",
        name: "Handcrafted Soft Table",
        quantity: 13,
        price: 2003.1,
        total: 26040.3,
        ean: "294157535806",
        sku: "41-8945",
      },
      {
        id: "pFwpQ61ydz",
        name: "Unbranded Bronze Bacon",
        quantity: 15,
        price: 3077.23,
        total: 46158.45,
        ean: "088070700134",
        sku: "91-0742",
      },
      {
        id: "YqSgUxfE_M",
        name: "Tasty Frozen Computer",
        quantity: 9,
        price: 3327.77,
        total: 29949.93,
        ean: "076093270406",
        sku: "14-6755",
      },
    ],
    note: "For questions about this invoice, please contact our billing department",
  },
  {
    id: "92daff7e-1e5e-4073-8ebe-3d5c7a4c84ed",
    number: "#6875",
    total: 20582.32,
    issuedDate: "2024-08-27",
    status: "paid",
    customer: {
      name: "Shannon Lindgren",
      company: "Anderson, Klocko and Mann",
      email: "Margarete.Ferry@yahoo.com",
      address: "3227 Brannon Radial, 15558-5292, Romania",
    },
    items: [
      {
        id: "BKyhMdNpuH",
        name: "Handcrafted Frozen Ball",
        quantity: 19,
        price: 1083.28,
        total: 20582.32,
        ean: "947914160982",
        sku: "01-4383",
      },
    ],
    note: "Special instructions: Benevolentia color modi culpo suus pecto basium.",
  },
  {
    id: "64577257-45d4-4716-994c-6fe1d321fb4b",
    number: "#3894",
    total: 127505.23,
    issuedDate: "2023-06-19",
    status: "pending",
    customer: {
      name: "Alfred Erdman",
      company: "Friesen - Waters",
      email: "Juvenal.Lakin40@gmail.com",
      address: "57479 Victoria Road, 77658, Bouvet Island",
    },
    items: [
      {
        id: "G-K7OpzJkR",
        name: "Fantastic Fresh Bacon",
        quantity: 13,
        price: 1262.69,
        total: 16414.97,
        ean: "093045232492",
        sku: "92-9169",
      },
      {
        id: "7Pt-hIlzys",
        name: "Incredible Soft Chicken",
        quantity: 9,
        price: 1136.7,
        total: 10230.300000000001,
        ean: "072948848178",
        sku: "22-7536",
      },
      {
        id: "2IkgbO-lqa",
        name: "Awesome Concrete Bacon",
        quantity: 20,
        price: 4768.46,
        total: 95369.2,
        ean: "760260404032",
        sku: "01-8953",
      },
      {
        id: "HG5ZGIrB-l",
        name: "Licensed Bronze Shoes",
        quantity: 2,
        price: 2745.38,
        total: 5490.76,
        ean: "616249144018",
        sku: "65-1554",
      },
    ],
    note: "Payment is due within 30 days",
  },
  {
    id: "0e708d0d-3725-45df-aed3-59e1bb5763ec",
    number: "#2952",
    total: 79657.28,
    issuedDate: "2024-09-30",
    status: "paid",
    customer: {
      name: "Estelle Conroy",
      company: "Stark LLC",
      email: "Manuel47@yahoo.com",
      address: "66354 W Washington Avenue, 85153, Finland",
    },
    items: [
      {
        id: "3qR3-5eN_E",
        name: "Unbranded Concrete Towels",
        quantity: 16,
        price: 4978.58,
        total: 79657.28,
        ean: "453098812702",
        sku: "36-2983",
      },
    ],
    note: "This is a computer-generated invoice, no signature required",
  },
];

import {
  randFirstName,
  randNumber,
  randSequence,
  randCompanyName,
  randProductDescription,
} from "@ngneat/falso";

// Platform interface
interface Platform {
  id: string;
  name: string;
  logo: string;
  productCount: string;
  description: string;
}

// List of popular brand icons that can be used with simpleicons.org
const brandIcons = [
  "nike",
  "adidas",
  "puma",
  "reebok",
  "underarmour",
  "newbalance",
  "fila",
  "amazon",
  "shopify",
  "magento",
  "bigcommerce",
];

// List of business types for name generation
const businessTypes = [
  "Wholesale",
  "Distribution",
  "Trading",
  "Marketplace",
  "Suppliers",
  "Commerce",
  "Global",
  "International",
];

// Generate random color in hex format
const generateRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generate random logo URL using simpleicons.org
const generateRandomLogo = (): string => {
  const randomBrand = brandIcons[Math.floor(Math.random() * brandIcons.length)];
  const randomColor = generateRandomColor();
  return `https://cdn.simpleicons.org/${randomBrand}/${randomColor}`;
};

// Generate business name
const generateBusinessName = (): string => {
  const companyName = randCompanyName().split(" ")[0];
  const businessType =
    businessTypes[Math.floor(Math.random() * businessTypes.length)];
  return `${companyName}${businessType}`;
};

// Generate realistic description
const generateDescription = (): string => {
  const companyName = randCompanyName();
  const productTypes = [
    "fashion",
    "sports",
    "electronics",
    "lifestyle",
    "luxury",
  ];
  const randomProductType =
    productTypes[Math.floor(Math.random() * productTypes.length)];
  const productDesc = randProductDescription();

  return `${companyName} is a leading ${randomProductType} wholesale platform offering a diverse range of products. ${productDesc} The company provides extensive global shipping capabilities and maintains strong relationships with major brands and manufacturers.`;
};

// Main function to generate random platform data
export const generateRandomPlatformData = (count: number = 1): Platform[] => {
  return Array.from({ length: count }, () => ({
    id: randSequence({ charType: "alphaNumeric", size: 8 }).toLowerCase(),
    name: generateBusinessName(),
    logo: generateRandomLogo(),
    productCount: `+${randNumber({ min: 10000, max: 500000 })} Products`,
    description: generateDescription(),
  }));
};

// Example usage
export const platforms = generateRandomPlatformData(12);
//console.log(platforms);

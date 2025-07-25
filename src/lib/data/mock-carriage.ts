import {
  CarriageOrder,
  VehicleOverview,
  VehicleStatus,
} from "@/types/carriage.types";
import {
  rand,
  randAddress,
  randFullName,
  randEmail,
  randPhoneNumber,
  randPastDate,
  randVehicle,
  randFirstName,
  randLastName,
  randNumber,
} from "@ngneat/falso";

export const vehicleOverviewData: VehicleOverview[] = [
  {
    status: "delivered" as VehicleStatus,
    percentage: 17.4,
    duration: "2hr 10min",
    totalVehicles: 12,
  },
  {
    status: "on-the-way" as VehicleStatus,
    percentage: 39.7,
    duration: "2hr 10min",
    totalVehicles: 28,
  },
  {
    status: "waiting" as VehicleStatus,
    percentage: 17.4,
    duration: "2hr 10min",
    totalVehicles: 12,
  },
  {
    status: "returning" as VehicleStatus,
    percentage: 14.6,
    duration: "2hr 10min",
    totalVehicles: 10,
  },
];

export const ordersData: CarriageOrder[] = Array.from(
  { length: 50 },
  generateMockupOrder
);

export function generateMockupOrder(): CarriageOrder {
  return {
    id: `FXZ-${randNumber({ min: 1000, max: 9999 })}`,
    carriageId: `CRG-${randNumber({ min: 1000, max: 9999 })}`,
    orderNumber: `ORD-2024-${randNumber([1000, 9999])}`,
    shippingNumber: `${randNumber({ min: 10000, ma: 99999 })}-${randNumber({
      min: 10000,
      ma: 99999,
    })}-${randNumber({
      min: 10,
      max: 99,
    })}`,
    startingRoute: randAddress().city,
    endingRoute: randAddress().city,
    status: randVehicleStatus(),
    duration: `${randNumber({ max: 5 })}hr ${randNumber({
      min: 10,
      max: 59,
    })}min`,
    estimatedDeliveryTime: randPastDate(),
    customer: {
      id: rand([1000, 9999]).toString(),
      firstName: randFirstName(),
      lastName: randLastName(),
      email: randEmail(),
      phone: randPhoneNumber(),
      address: {
        street: randAddress().street,
        city: randAddress().city,
        state: randAddress().county || "",
        postalCode: randAddress().zipCode,
        country: randAddress().country || "",
      },
    },
    shipping: {
      method: "Standard",
      cost: rand([100]),
      address: {
        street: randAddress().street,
        city: randAddress().city,
        state: randAddress().county || "",
        postalCode: randAddress().zipCode,
        country: randAddress().country || "",
      },
    },
    trackingUpdates: [],
  };
}

// TODO: refactor VehicleStatus type definition to enum

function randVehicleStatus(): VehicleStatus {
  const statuses: VehicleStatus[] = [
    "delivered",
    "on-the-way",
    "waiting",
    "returning",
  ];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

// actual mockup structure
export const ordersData2: CarriageOrder[] = [
  {
    id: "FXZ-4567",
    carriageId: "CRG-001",
    orderNumber: "ORD-2024-001",
    shippingNumber: "12415-123674-11",
    startingRoute: "Paris 19, France",
    endingRoute: "Dresden, Germany",
    status: "on-the-way",
    duration: "2hr 10min",
    estimatedDeliveryTime: new Date(),
    customer: {
      id: "123",
      firstName: "Alice",
      lastName: "Johnson",
      email: "alice@example.com",
      phone: "+1234567890",
      address: {
        street: "123 Dresden St",
        city: "Dresden",
        state: "Saxony",
        postalCode: "01067",
        country: "Germany",
      },
    },
    shipping: {
      method: "Express",
      cost: 123,
      address: {
        street: "123 Dresden St",
        city: "Dresden",
        state: "Saxony",
        postalCode: "01067",
        country: "Germany",
      },
    },
    trackingUpdates: [],
  },
  {
    id: "FXZ-4568",
    carriageId: "CRG-002",
    orderNumber: "ORD-2024-002",
    shippingNumber: "12415-123674-12",
    startingRoute: "Berlin, Germany",
    endingRoute: "Munich, Germany",
    status: "delivered",
    duration: "3hr 15min",
    estimatedDeliveryTime: new Date(),
    customer: {
      id: "654",
      firstName: "Bob",
      lastName: "Smith",
      email: "bob@example.com",
      phone: "+1234567891",
      address: {
        street: "123 Dresden St",
        city: "Dresden",
        state: "Saxony",
        postalCode: "01067",
        country: "Germany",
      },
    },
    shipping: {
      method: "Next Day",
      cost: 123,
      address: {
        street: "456 Munich Ave",
        city: "Munich",
        state: "Bavaria",
        postalCode: "80331",
        country: "Germany",
      },
    },
    trackingUpdates: [],
  },
  {
    id: "FXZ-4569",
    carriageId: "CRG-003",
    orderNumber: "ORD-2024-003",
    shippingNumber: "12415-123674-13",
    startingRoute: "Hamburg, Germany",
    endingRoute: "Frankfurt, Germany",
    status: "waiting",
    duration: "2hr 45min",
    estimatedDeliveryTime: new Date(),
    customer: {
      id: "455",
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie@example.com",
      phone: "+1234567892",
      address: {
        street: "123 Dresden St",
        city: "Dresden",
        state: "Saxony",
        postalCode: "01067",
        country: "Germany",
      },
    },
    shipping: {
      method: "Standard",
      cost: 1253,
      address: {
        street: "789 Frankfurt St",
        city: "Frankfurt",
        state: "Hesse",
        postalCode: "60308",
        country: "Germany",
      },
    },
    trackingUpdates: [],
  },
  {
    id: "FXZ-4570",
    carriageId: "CRG-004",
    orderNumber: "ORD-2024-004",
    shippingNumber: "12415-123674-14",
    startingRoute: "Cologne, Germany",
    endingRoute: "Stuttgart, Germany",
    status: "returning",
    duration: "2hr 30min",
    estimatedDeliveryTime: new Date(),
    customer: {
      id: "6547",
      firstName: "David",
      lastName: "Wilson",
      email: "david@example.com",
      phone: "+1234567893",
      address: {
        street: "123 Dresden St",
        city: "Dresden",
        state: "Saxony",
        postalCode: "01067",
        country: "Germany",
      },
    },
    shipping: {
      method: "Express",
      cost: 789,
      address: {
        street: "101 Stuttgart Rd",
        city: "Stuttgart",
        state: "Baden-Württemberg",
        postalCode: "70173",
        country: "Germany",
      },
    },
    trackingUpdates: [],
  },
];

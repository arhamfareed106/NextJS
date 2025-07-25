// @/components/carriage/delivery-map.tsx
import { CarriageOrder } from "@/types/carriage.types";

export function DeliveryMap({ order }: { order: CarriageOrder }) {
  if (!order.vehicle) {
    return <div>No vehicle information available</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-500">
          Vehicle Information
        </h3>
        <div className="mt-1 text-sm">
          <p>Vehicle Number: {order.vehicle.vehicleNumber}</p>
          <p>Status: {order.vehicle.status}</p>
        </div>
      </div>

      {order.vehicle.driver && (
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Driver Information
          </h3>
          <div className="mt-1 text-sm">
            <p>Name: {order.vehicle.driver.name}</p>
            <p>Phone: {order.vehicle.driver.phone}</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-medium text-gray-500">Current Location</h3>
        <div className="mt-1 text-sm">
          <p>{order.vehicle.currentLocation?.address}</p>
        </div>
      </div>

      {/* Placeholder for actual map implementation */}
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <p>Map View</p>
      </div>
    </div>
  );
}

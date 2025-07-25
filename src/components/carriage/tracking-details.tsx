// @/components/carriage/tracking-details.tsx
import { CarriageTracking } from "@/types/carriage.types";

export function TrackingDetails({ updates }: { updates: CarriageTracking[] }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
      <ul className="space-y-6">
        {updates.map((update, index) => (
          <li key={update.id} className="relative pl-10">
            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
              {updates.length - index}
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{update.description}</p>
                  <p className="text-sm text-gray-500">{update.location}</p>
                </div>
                <p className="text-sm text-gray-500">
                  {update.timestamp.toLocaleDateString()}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

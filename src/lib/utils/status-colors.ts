// lib/utils/status-colors.ts
export const getStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    CONFIRMED: "bg-blue-100 text-blue-800",
    PROCESSING: "bg-purple-100 text-purple-800",
    OUT_OF_DELIVERY: "bg-indigo-100 text-indigo-800",
    DELIVERED: "border-green-100 text-green-10 bg-green-50",
    CANCELLED: "bg-red-100 text-red-800",
    RETURNED: "bg-gray-100 text-gray-800",
    SEND_BY: "bg-orange-100 text-orange-800",
    DISPATCHED: "bg-teal-100 text-teal-800",
    COMPLETED: "border-green-100 text-green-10 bg-green-50",
  };
  return colors[status.toUpperCase()] || "bg-gray-100 text-gray-800";
};

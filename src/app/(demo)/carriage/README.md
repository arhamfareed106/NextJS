# The Carriage Tracking System

The Carriage Tracking System is a Next.js-based solution for tracking delivery vehicles and orders in real-time. It provides a comprehensive interface for monitoring vehicle status, tracking orders, and viewing detailed delivery information.

```
src/
├── app/
│   └── carriage/
│       ├── [id]/
│       │   └── page.tsx          # Carriage order details page
│       └── page.tsx              # Main carriage dashboard page
│
├── components/
│   │
│   └── carriage/                 # Carriage-specific components
│       ├── delivery-map.tsx      # Map and vehicle info component
│       ├── order-info.tsx        # Order details component
│       ├── orders-table.tsx      # Table with order list
│       ├── tracking-details.tsx  # Tracking timeline component
│       └── vehicles-overview.tsx # Vehicle status overview component
│
├── types/
│   ├── carriage.types.ts        # Carriage-related type definitions
│   └── order.types.ts           # Base order type definitions
│
└── mock/
    └── carriage-data.ts         # Mock data for development
```

The current structure follows these main conventions:

1. Page components in `app/` directory (Next.js App Router)
2. Reusable components in `components/` directory
3. Type definitions in `types/` directory
4. Mock data in `mock/` (lib/data as for now) directory

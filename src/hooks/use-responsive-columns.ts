// @/hooks/use-responsive-columns.ts
import { useEffect, useState } from "react";
import { useMediaQuery } from "./use-media-query";

export function useResponsiveColumns() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [columnVisibility, setColumnVisibility] = useState({
    select: true,
    name: true,
    percentage: true,
    actions: true,
    category: true,
    orders: true,
    currentPrice: true,
  });

  useEffect(() => {
    if (isMobile) {
      setColumnVisibility({
        name: true,
        percentage: true,
        actions: true,
        // Hide these columns on mobile
        select: false,
        category: false,
        orders: false,
        currentPrice: false,
      });
    } else {
      setColumnVisibility({
        select: true,
        name: true,
        category: true,
        percentage: true,
        orders: true,
        currentPrice: true,
        actions: true,
      });
    }
  }, [isMobile]);

  return columnVisibility;
}

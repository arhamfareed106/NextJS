"use client";

import { useState, useEffect, useMemo } from "react";
import { useGetPriceAdjustmentsQuery } from "@/lib/api/hooks";
import { DiscountTable } from "./discount-table";
import { PriceAdjustment } from "@/types";

interface DiscountListProps {
  onEdit: (discount: PriceAdjustment) => void;
  searchQuery?: string;
}

export function DiscountList({ onEdit, searchQuery = "" }: DiscountListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useGetPriceAdjustmentsQuery({
    query: {
      page: currentPage,
    },
  });

  // Filter the current page data based on search query
  const filteredData = useMemo(() => {
    if (!data?.data || !searchQuery) return data?.data || [];

    const query = searchQuery.toLowerCase();
    return data.data.filter((item: PriceAdjustment) => {
      // Search in name
      const nameMatch = item.name?.toLowerCase().includes(query);
      // Search in category name
      const categoryMatch = item.category?.toLowerCase().includes(query);
      // Search in subcategory name
      const subcategoryMatch = item.subcategory?.toLowerCase().includes(query);
      // Search in sub-subcategory name
      const subSubcategoryMatch = item.subsubcategory
        ?.toLowerCase()
        .includes(query);

      return (
        nameMatch || categoryMatch || subcategoryMatch || subSubcategoryMatch
      );
    });
  }, [data?.data, searchQuery]);

  console.log("DiscountList data:", {
    data,
    isLoading,
    error,
    currentPage,
    searchQuery,
    filteredData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading discounts</div>;
  }

  // Ensure we have valid pagination values
  const pagination = {
    currentPage: data?.currentPage || 1,
    lastPage: data?.lastPage || 1,
    perPage: data?.perPage || 10,
    total: data?.total || 0,
  };

  return (
    <DiscountTable
      data={filteredData}
      onEdit={onEdit}
      pagination={pagination}
      onPageChange={setCurrentPage}
    />
  );
}

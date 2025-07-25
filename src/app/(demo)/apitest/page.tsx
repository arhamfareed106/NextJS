"use client";

import {
  useGetProductCatalogsQuery,
  useAddProductCatalogMutation,
} from "@/lib/api/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { ProductCatalog } from "@/types";

export default function ApiTestPage() {
  const [newCatalogUrl, setNewCatalogUrl] = useState("");
  const { data: catalogs, isLoading, error } = useGetProductCatalogsQuery();
  const { mutate: addProductCatalog, isPending: isUpdating } =
    useAddProductCatalogMutation();

  const handleAddCatalog = async () => {
    if (!newCatalogUrl.trim()) return;
    try {
      await addProductCatalog({
        products_xml_url: newCatalogUrl,
        stock_prices_xml_url: newCatalogUrl,
      });
      setNewCatalogUrl("");
    } catch (error) {
      console.error("Failed to add catalog:", error);
    }
  };

  // Debug information
  console.log("Catalogs response:", catalogs);
  console.log("Loading state:", isLoading);
  console.log("Error state:", error);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Catalogs</h1>

      <div className="mb-6">
        <div className="flex gap-2">
          <Input
            value={newCatalogUrl}
            onChange={(e) => setNewCatalogUrl(e.target.value)}
            placeholder="Enter catalog URL"
            className="max-w-sm"
          />
          <Button onClick={handleAddCatalog} disabled={isUpdating}>
            {isUpdating ? "Adding..." : "Add Catalog"}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading catalogs...</p>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">
            Error loading catalogs: {error.message}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {catalogs && (
            <div className="p-4 border rounded-lg">
              <p className="font-medium">
                Products XML: {catalogs.products_xml_url}
              </p>
              <p className="text-sm text-gray-600">
                Stock XML: {catalogs.stock_prices_xml_url}
              </p>
            </div>
          )}
          {!catalogs && <p className="text-gray-500">No catalogs found</p>}
        </div>
      )}
    </div>
  );
}

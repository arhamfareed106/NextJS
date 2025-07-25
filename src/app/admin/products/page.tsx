"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  Pencil,
  Save,
  Search,
  Timer,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductDialog } from "@/components/admin/products/product-dialog";
import { generateMockProducts, type Product } from "@/lib/data/admin-products";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const products = generateMockProducts(20);

const breadcrumbItems = [
  { label: "Home", href: "/dashboard" },
  { label: "Admin Panel: Products", href: "/admin/products" },
];

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expandedProducts, setExpandedProducts] = useState<string[]>([]);

  const toggleProductExpansion = (productId: string) => {
    setExpandedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <ContentLayout title="Products">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="py-4">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col gap-5 p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h1 className="text-lg font-semibold">List all products</h1>
              <div className="flex items-center gap-2">
                <Select defaultValue="10">
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search product..."
                className="w-full sm:w-[300px]"
              />
              <Button type="submit" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto px-6">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[300px]">Product</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Category
                  </TableHead>
                  <TableHead className="hidden md:table-cell">SKU</TableHead>
                  <TableHead className="hidden md:table-cell">QTY</TableHead>
                  <TableHead>Top price</TableHead>
                  <TableHead className="hidden md:table-cell">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <>
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="rounded-lg"
                            width={40}
                            height={40}
                          />
                          <div>
                            <div className="font-medium">{product.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.category}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.sku}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {product.qty}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-between">
                          <span>€{product.price}</span>
                          {product.sellers.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="md:hidden"
                              onClick={() => toggleProductExpansion(product.id)}
                            >
                              {expandedProducts.includes(product.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {expandedProducts.includes(product.id)
                                  ? "Hide"
                                  : "Show"}{" "}
                                all sellers
                              </span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => {
                              setSelectedProduct(product);
                              setDialogOpen(true);
                            }}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">
                              View product details
                            </span>
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Edit product</span>
                          </Button>
                          <Button size="icon" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete product</span>
                          </Button>
                          {product.sellers.length > 1 && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => toggleProductExpansion(product.id)}
                            >
                              {expandedProducts.includes(product.id) ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                              <span className="sr-only">
                                {expandedProducts.includes(product.id)
                                  ? "Hide"
                                  : "Show"}{" "}
                                all sellers
                              </span>
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                    {expandedProducts.includes(product.id) && (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <div className="pl-14">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>User</TableHead>
                                  <TableHead>User price</TableHead>
                                  <TableHead className="hidden md:table-cell">
                                    Action
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {product.sellers.map((seller) => (
                                  <TableRow key={seller.id}>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                          <span className="text-xs font-medium">
                                            {seller.name[0].toUpperCase()}
                                          </span>
                                        </div>
                                        <div>
                                          <div className="font-medium">
                                            {seller.name}
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {seller.email}
                                          </div>
                                        </div>
                                      </div>
                                    </TableCell>
                                    <TableCell>€{seller.price}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      <Button size="sm" variant="ghost">
                                        View
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4">
            <div className="text-sm text-muted-foreground mb-4 sm:mb-0">
              Displaying 1 to 10 of 100 entries
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
        <ProductDialog
          product={selectedProduct}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      </div>
    </ContentLayout>
  );
}

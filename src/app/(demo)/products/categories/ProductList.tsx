// File: ProductList.tsx

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { ProductUI } from '@/types/product.types';
import ViewProduct from '@/components/dialogs/view-product';

type ProductListProps = {
  products: ProductUI[];
  searchTerm: string;
};

const ProductList = ({ products, searchTerm }: ProductListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<ProductUI | null>(null);
  const productsPerPage = 5;

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    const searchLower = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        (product.title || '').toLowerCase().includes(searchLower) ||
        (product.modification_title || '').toLowerCase().includes(searchLower),
    );
  }, [products, searchTerm]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (filteredProducts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 bg-gray-50 rounded-lg">No products found matching your search.</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-white   border-b border-border    hover:border-gray-300 hover:bg-slate-100 transition-colors cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="flex items-center md:space-x-6">
              <Image
                src={product.image_url || ''}
                alt={product.title || ''}
                className="hidden md:block w-20 h-20  "
                width="128"
                height="128"
              />
              <div>
                <h3 className="font-semibold text-gray-900">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{product.modification_title}</p>
              </div>
            </div>
            <div className="h-full flex items-end align-top space-x-12">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-600">Quantity</div>
                <div className="text-lg font-semibold text-gray-900">{product.stock || 0}</div>
              </div>
              <div className="text-right hidden md:block">
                <div className="text-sm font-medium text-gray-600">Total earning</div>
                <div className="text-lg font-semibold text-green-600">
                  €{product.price_after_discount || product.price_before_discount || 0}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent className="cursor-pointer">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="border border-gray-200"
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                  className={`border ${
                    currentPage === page
                      ? 'bg-violet-900 hover:bg-violet-900 text-white hover:text-white'
                      : 'border-gray-200'
                  }`}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="border border-gray-200"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {selectedProduct && <ViewProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </div>
  );
};

export default ProductList;

'use client';

// File: CategorySection.tsx

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import ProductList from './ProductList';
import { useGetProductsQuery } from '@/lib/api/hooks';
import { ProductUI } from '@/types/product.types';
import Image from 'next/image';

type CategorySectionProps = {
  searchTerm: string;
};

type CategoryData = {
  name: string;
  products: ProductUI[];
};

const CategorySection = ({ searchTerm }: CategorySectionProps) => {
  const [expandedCategories, setExpandedCategories] = useState(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState(new Set());

  const { data: products, isLoading, error } = useGetProductsQuery();

  // Group products by category
  const categories: CategoryData[] = React.useMemo(() => {
    if (!products?.data) return [];

    const categoryMap = new Map<string, ProductUI[]>();

    products.data.forEach((product: any) => {
      const productUI: ProductUI = {
        id: product.id?.toString() || '',
        title: product.title || '',
        modification_title: product.modification_title || '',
        category: product.category || '',
        sku: product.sku || '',
        image_url: product.image_url || '',
        stock: product.stock || 0,
        price_before_discount: product.price_before_discount || 0,
        price_after_discount: product.price_after_discount || 0,
        status: true, // Default to true for now
      };

      if (productUI.category) {
        if (!categoryMap.has(productUI.category)) {
          categoryMap.set(productUI.category, []);
        }
        categoryMap.get(productUI.category)?.push(productUI);
      }
    });

    return Array.from(categoryMap.entries()).map(([name, products]) => ({
      name,
      products,
    }));
  }, [products]);

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName);
    } else {
      newExpanded.add(categoryName);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategory = (subcategoryName: string) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryName)) {
      newExpanded.delete(subcategoryName);
    } else {
      newExpanded.add(subcategoryName);
    }
    setExpandedSubcategories(newExpanded);
  };

  if (isLoading) {
    return <div className="p-4 text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      {categories.map((category) => (
        <Collapsible key={category.name} className="w-full" open={expandedCategories.has(category.name)}>
          <CollapsibleTrigger className="w-full" onClick={() => toggleCategory(category.name)}>
            <div
              className={`flex items-center  gap-3.5 w-full py-3 px-6 
              ${expandedCategories.has(category.name) ? 'bg-container' : 'bg-gray-100'}
                   rounded-sm      transition-colors`}
            >
              <span className="text-[13px] font-medium text-muted-foreground">{category.name}</span>
              <span
                className={`transform transition-transform ${
                  expandedCategories.has(category.name) ? 'rotate-[-180]' : 'rotate-180'
                }`}
              >
                <Image src="/icons/arrow-down-blue.svg" width={14} height={14} alt="" />
              </span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 lg:pl-10 mt-4 space-y-4">
            {category.products.map((product) => (
              <Collapsible key={product.id} open={expandedSubcategories.has(product.id)}>
                <CollapsibleTrigger className="w-full" onClick={() => toggleSubcategory(product.id)}>
                  <div
                    className={`flex items-center  gap-3.5 w-full py-3 px-6
                        ${expandedSubcategories.has(product.id) ? 'bg-container' : 'bg-gray-100'}
                        rounded-sm   transition-colors`}
                  >
                    <span className="text-[13px] font-medium text-muted-foreground">{product.title}</span>
                    <span
                      className={`transform transition-transform ${
                        expandedSubcategories.has(product.id) ? 'rotate-[-180]' : 'rotate-180'
                      }`}
                    >
                      <Image src="/icons/arrow-down-blue.svg" width={14} height={14} alt="" />
                    </span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 mx-2">
                  <ProductList products={[product]} searchTerm={searchTerm} />
                </CollapsibleContent>
              </Collapsible>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default CategorySection;

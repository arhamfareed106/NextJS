'use client';
import { ContentLayout } from '@/components/admin-panel/content-layout';
import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';
import { Separator } from '@radix-ui/react-dropdown-menu';
import CardsCarousel from '@/components/blocks/cards-carousel';
import Breadcrumbs from '@/components/wrappers/breadcrumbs';
import ProductTable from '@/components/blocks/product-table';
import { useGetProductsQuery } from '@/lib/api/hooks';
import { ProductUI, ProductApi } from '@/types/product.types';
import { useMemo, useState } from 'react';
import ViewProduct from '@/components/dialogs/view-product';

export default function ProductsPage() {
  const sidebar = useStore(useSidebar, (x) => x);
  const { data, isLoading, error } = useGetProductsQuery();
  const [selectedProduct, setSelectedProduct] = useState<ProductUI | null>(null);

  const products: ProductUI[] = useMemo(() => {
    if (!data?.data) {
      console.log('No data available, returning empty array');
      return [];
    }

    return data.data.map((item: ProductApi) => ({
      id: item.id?.toString() || '',
      title: item.title || '',
      modification_title: item.modification_title || '',
      category: item.category || '',
      sku: item.sku || '',
      price_before_discount: item.price_before_discount || 0,
      price_after_discount: item.price_after_discount || 0,
      stock: item.stock || 0,
      image_url: item.image_url || '',
      status: true, // UI-only field, default to true
    }));
  }, [data]);

  if (!sidebar) return null;
  const { settings, setSettings } = sidebar;

  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard' },
    { label: 'Product List', href: '/products/list' },
  ];

  return (
    <ContentLayout title="Dashboard">
      {/* <Breadcrumbs items={breadcrumbItems} /> */}

      {/* CONTENT */}

      {/* <Separator className="py-primary-half" /> */}

      <CardsCarousel />

      <Separator className="py-primary-half" />
      {isLoading ? (
        <div>Loading products...</div>
      ) : error ? (
        <div className="text-red-500">Failed to load products: {error.message}</div>
      ) : (
        <ProductTable products={products || []} onViewProduct={(product) => setSelectedProduct(product)} />
      )}

      {selectedProduct && <ViewProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </ContentLayout>
  );
}

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function AddProduct() {
  return (
    <Link href="/settings/xml">
      <Button size="md">
        <Image width={24} height={24} src="/icons/add.svg" alt="Add Product" />
        Add Product
      </Button>
    </Link>
  );
}

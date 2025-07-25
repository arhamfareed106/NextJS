'use client';
import { ProductUI } from '@/types/product.types';
import { columns } from '@/types/product.columns';

import * as React from 'react';
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table';
import { ChevronDown, DownloadIcon, PlusIcon, UploadIcon, MoreHorizontal, Filter, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '../wrappers/heading';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface ProductTableProps {
  products: ProductUI[];
  onViewProduct?: (product: ProductUI) => void;
}

export default function ProductTable({ products = [], onViewProduct }: ProductTableProps) {
  const [isMobile, setIsMobile] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileColumns = React.useMemo(() => {
    if (isMobile) {
      return columns.filter((column) => {
        if ('accessorKey' in column) {
          return !['category', 'SKU', 'qty', 'status'].includes(column.accessorKey as string);
        }
        // Keep columns without accessorKey (like 'select' and 'actions')
        return true;
      });
    }
    return columns;
  }, [isMobile]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Filter states
  const [filters, setFilters] = React.useState({
    status: 'all',
    category: 'all',
    stock: 'all',
    ean: '',
    sku: '',
    subcategory: 'all',
    productName: '',
  } as const);

  // Get unique values for filter options
  const uniqueCategories = React.useMemo(() => {
    const categories = new Set(products.map((p) => p.category).filter((cat): cat is string => Boolean(cat)));
    return Array.from(categories).sort();
  }, [products]);

  const uniqueSubcategories = React.useMemo(() => {
    const subcategories = new Set(
      products.map((p) => p.modification_title).filter((sub): sub is string => Boolean(sub)),
    );
    return Array.from(subcategories).sort();
  }, [products]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);

    // Update table filters
    const newColumnFilters = [...columnFilters];

    // Remove existing filter for this column
    const existingIndex = newColumnFilters.findIndex((f) => f.id === key);
    if (existingIndex !== -1) {
      newColumnFilters.splice(existingIndex, 1);
    }

    // Add new filter if value is not "all" and not empty
    if (value && value !== 'all') {
      newColumnFilters.push({ id: key, value });
    }

    setColumnFilters(newColumnFilters);
  };

  const clearAllFilters = () => {
    setFilters({
      status: 'all',
      category: 'all',
      stock: 'all',
      ean: '',
      sku: '',
      subcategory: 'all',
      productName: '',
    });
    setColumnFilters([]);
  };

  const hasActiveFilters = React.useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      if (key === 'ean' || key === 'sku' || key === 'productName') {
        return value !== '';
      }
      return value !== 'all';
    });
  }, [filters]);

  const tableColumns = React.useMemo(() => {
    return mobileColumns.map((column) => {
      if (column.id === 'actions') {
        return {
          ...column,
          cell: ({ row }) => {
            const product = row.original as ProductUI;
            return (
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => onViewProduct?.(product)}>
                  <Image className="filter-secondary" src={'/icons/edit-2.svg'} alt="edit" width={24} height={24} />
                </Button>
                <Button variant="ghost" size="icon">
                  <Image src={'/icons/bag-cross.svg'} alt="delete" width={24} height={24} />
                </Button>
              </div>
              // <DropdownMenu>
              //   <DropdownMenuTrigger asChild>
              //     <Button variant="ghost" className="h-8 w-8 p-0">
              //       <span className="sr-only">Open menu</span>
              //       <MoreHorizontal className="h-4 w-4" />
              //     </Button>
              //   </DropdownMenuTrigger>
              //   <DropdownMenuContent align="end">
              //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
              //     <DropdownMenuItem
              //       onClick={() =>
              //         navigator.clipboard.writeText(product.sku || "")
              //       }
              //     >
              //       Copy SKU
              //     </DropdownMenuItem>
              //     <DropdownMenuSeparator />
              //     <DropdownMenuItem onClick={() => onViewProduct?.(product)}>
              //       View product details
              //     </DropdownMenuItem>
              //     <DropdownMenuItem className="text-red-400">
              //       Delete
              //     </DropdownMenuItem>
              //   </DropdownMenuContent>
              // </DropdownMenu>
            );
          },
        } as ColumnDef<ProductUI>;
      }
      return column;
    });
  }, [mobileColumns, onViewProduct]);

  const table = useReactTable({
    data: products,
    columns: tableColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <p className="font-bold">Product List</p>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters} className="px-2 text-sm">
              Clear all
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-sm"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
            {showFilters ? (
              <Image src="/icons/arrow-up.svg" alt="Hide Filters" width={18} height={18} className="filter-primary" />
            ) : (
              <Image src="/icons/arrow-down.svg" alt="Show Filters" width={18} height={18} className="filter-primary" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Collapsible Filters Section */}
        <Collapsible open={showFilters} onOpenChange={setShowFilters}>
          <CollapsibleContent>
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Status Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <Select value={filters.status} onValueChange={(value) => handleFilterChange('status', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category</label>
                  <Select value={filters.category} onValueChange={(value) => handleFilterChange('category', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {uniqueCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Stock Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Stock</label>
                  <Select value={filters.stock} onValueChange={(value) => handleFilterChange('stock', value)}>
                    <SelectTrigger className="h-12 px-4">
                      <SelectValue placeholder="Stock" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="in-stock">In Stock</SelectItem>
                      <SelectItem value="low-stock">Low Stock</SelectItem>
                      <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* EAN Code Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">EAN Code</label>
                  <Input
                    placeholder="Search by EAN..."
                    value={filters.ean}
                    onChange={(e) => handleFilterChange('ean', e.target.value)}
                    className="h-12 px-4"
                  />
                </div>

                {/* SKU Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">SKU</label>
                  <Input
                    placeholder="Search by SKU..."
                    value={filters.sku}
                    onChange={(e) => handleFilterChange('sku', e.target.value)}
                    className="h-12 px-4"
                  />
                </div>

                {/* Subcategory Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Subcategory</label>
                  <Select
                    value={filters.subcategory}
                    onValueChange={(value) => handleFilterChange('subcategory', value)}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {uniqueSubcategories.map((subcategory) => (
                        <SelectItem key={subcategory} value={subcategory}>
                          {subcategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Product Name Filter */}
                <div className="space-y-2 md:col-span-2 lg:col-span-3">
                  <label className="text-sm font-medium text-gray-700">Product Name</label>
                  <Input
                    placeholder="Search by product name..."
                    value={filters.productName}
                    onChange={(e) => handleFilterChange('productName', e.target.value)}
                    className="h-12 px-4"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex flex-wrap items-center gap-4 ">
          <div className="flex items-center gap-2 flex-1">
            {/* Search Bar */}
            <div className="hidden sm:block relative flex-1 max-w-[220px]">
              <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none pl-6">
                <Image
                  src="/icons/search-normal.svg"
                  alt="Search"
                  className="icon filter-secondary"
                  width={24}
                  height={24}
                />
              </div>
              <input
                type="text"
                placeholder="Filter products..."
                value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                onChange={(event) => table.getColumn('title')?.setFilterValue(event.target.value)}
                className="block w-full pl-16 pr-6 py-4 rounded-2xl border text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-transparent"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 lg:flex gap-4 justify-between">
            <Select value="10">
              <SelectTrigger className="h-12 w-auto hidden lg:block gap-4 focus:ring-0">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="30">30</SelectItem>
              </SelectContent>
            </Select>
            {/* Import via XML button */}
            <Button variant="secondary" className="flex gap-1">
              <Image src="/icons/export.svg" alt="Import via XML" width={24} height={24} />
              import via XML
            </Button>

            {/* Export button */}
            <Button variant="secondary" className="flex gap-1">
              <Image src="/icons/export.svg" alt="Export" width={24} height={24} />
              Export
            </Button>
          </div>
        </div>
        <div className="rounded-md ">
          <Table>
            <TableHeader className="">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} className="py-0">
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-5 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
            selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Image src="/icons/arrow-left.svg" alt="Previous" width={24} height={24} />
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              <Image src="/icons/arrow-right.svg" alt="Next" width={24} height={24} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

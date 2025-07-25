'use client';

import { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';

const categoriesData = {
  shoes: { name: 'Shoes', subcategories: { sneakers: ['Running'], boots: ['Work'] } },
  clothing: { name: 'Clothing', subcategories: { shirts: ['T-Shirts'], pants: ['Jeans'] } },
  accessories: { name: 'Accessories', subcategories: { hats: ['Beanie'], bags: ['Backpack'] } },
  equipment: { name: 'Equipment', subcategories: { gym: ['Dumbbells'], outdoor: ['Tent'] } },
} as const;

type CategoryKey = keyof typeof categoriesData;

export default function CategorySelector() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey | ''>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | ''>('');
  const [selectedSubSubcategory, setSelectedSubSubcategory] = useState<string | ''>('');

  // ✅ Run only on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // ⛔ prevent server-side mismatch

  const subcategories = selectedCategory !== '' ? Object.keys(categoriesData[selectedCategory].subcategories) : [];

  const subSubcategories =
    selectedCategory !== '' && selectedSubcategory !== ''
      ? categoriesData[selectedCategory].subcategories[
          selectedSubcategory as keyof (typeof categoriesData)[CategoryKey]['subcategories']
        ] ?? []
      : [];

  return (
    <div className="flex flex-col gap-4">
      {/* CATEGORY */}
      <div>
        <span className="text-sm font-medium">Category</span>
        <Select
          value={selectedCategory}
          onValueChange={(value: CategoryKey | '') => {
            setSelectedCategory(value);
            setSelectedSubcategory('');
            setSelectedSubSubcategory('');
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {Object.entries(categoriesData).map(([key, val]) => (
              <SelectItem key={key} value={key}>
                {val.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* SUBCATEGORY */}
      {selectedCategory !== '' && (
        <div>
          <span className="text-sm font-medium">Subcategory</span>
          <Select
            value={selectedSubcategory}
            onValueChange={(value) => {
              setSelectedSubcategory(value);
              setSelectedSubSubcategory('');
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Subcategories</SelectItem>
              {subcategories.map((sub) => (
                <SelectItem key={sub} value={sub}>
                  {sub.charAt(0).toUpperCase() + sub.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* SUB-SUBCATEGORY */}
      {selectedSubcategory !== '' && (
        <div>
          <span className="text-sm font-medium">Sub-subcategory</span>
          <Select value={selectedSubSubcategory} onValueChange={setSelectedSubSubcategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select sub-subcategory" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sub-subcategories</SelectItem>
              {subSubcategories.map((subsub) => (
                <SelectItem key={subsub} value={subsub}>
                  {subsub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}

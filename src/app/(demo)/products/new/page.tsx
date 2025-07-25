/*
Update code:
- Language Dialog Dropdown: Update the dialog for adding a new language to include a dropdown with predefined language options.
- Language Tabs to Dropdown: Change the language selection tabs to a dropdown for easier management of multilingual content.
- Time Settings Name as Dropdown: Modify the name field in the time settings to use a dropdown with predefined options.
- Add Delete Language Variant Button.
- Add Language Button should be in the same line as Language Dropdown Form.
*/
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PlusCircle, Upload, CircleXIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import Breadcrumbs from "@/components/wrappers/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/wrappers/heading";

import TimePickerDemo from "@/components/time-picker/time-picker-demo";

const VARIANT_OPTIONS = ["Size", "Color", "Brand", "Weight"] as const;
const TIME_SETTING_OPTIONS = [
  "Delivery hours",
  "Preparation time",
  "Pick-up time",
] as const;
const LANGUAGE_OPTIONS = ["en", "es", "fr", "de", "it"] as const;
const DEFAULT_TIME_VARIANT = { name: "", hours: 0, minutes: 0, seconds: 0 };

const AddProductForm = () => {
  const [date, setDate] = React.useState<Date>();
  const [formData, setFormData] = React.useState({
    sku: "",
    barcode: "",
    image: "",
    category: "",
    qty: 0,
    basePrice: 0,
    discountPrice: 0,
    status: false,
  });

  const [variants, setVariants] = React.useState([
    { option: VARIANT_OPTIONS[0], size: "", eanCode: "" },
  ]);
  const [languages, setLanguages] = React.useState(["en"]);
  const [selectedLanguage, setSelectedLanguage] = React.useState("en");
  const [names, setNames] = React.useState<Record<string, string>>({});
  const [descriptions, setDescriptions] = React.useState<
    Record<string, string>
  >({});
  const [timeVariants, setTimeVariants] = React.useState([
    { ...DEFAULT_TIME_VARIANT, name: "Delivery hours" },
  ]);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = React.useState(false);
  const [newLanguage, setNewLanguage] = React.useState("");

  const handleTimeVariantChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newTimeVariants = [...timeVariants];
    newTimeVariants[index] = {
      ...newTimeVariants[index],
      [field]: field === "name" ? value : Number(value),
    };
    setTimeVariants(newTimeVariants);
  };

  const addTimeVariant = () => {
    setTimeVariants([...timeVariants, { ...DEFAULT_TIME_VARIANT }]);
  };

  const removeTimeVariant = (index: number) => {
    setTimeVariants(timeVariants.filter((_, i) => i !== index));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleVariantChange = (index: number, field: string, value: string) => {
    const newVariants = [...variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setVariants(newVariants);
  };

  const handleMultilingualChange = (
    type: "names" | "descriptions",
    lang: string,
    value: string
  ) => {
    const setter = type === "names" ? setNames : setDescriptions;
    setter((prev) => ({
      ...prev,
      [lang]: value,
    }));
  };

  const addVariant = () => {
    setVariants([
      ...variants,
      { option: VARIANT_OPTIONS[0], size: "", eanCode: "" },
    ]);
  };

  const removeVariant = (index: number) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    if (newLanguage && !languages.includes(newLanguage.toLowerCase())) {
      const lang = newLanguage.toLowerCase();
      setLanguages([...languages, lang]);
      setSelectedLanguage(lang);
      setNewLanguage("");
      setIsLanguageDialogOpen(false);
    }
  };

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang));
    setSelectedLanguage(languages[0] || "en");
    setNames((prev) => {
      const updated = { ...prev };
      delete updated[lang];
      return updated;
    });
    setDescriptions((prev) => {
      const updated = { ...prev };
      delete updated[lang];
      return updated;
    });
  };

  const handleSubmit = (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();
    const productData = {
      ...formData,
      name: names,
      descriptions,
      variants,
      price: {
        base: Number(formData.basePrice),
        discountPrice: Number(formData.discountPrice) || undefined,
      },
      status: isDraft ? "inactive" : formData.status ? "active" : "inactive",
      timeVariants,
    };
    console.log("Submitting product:", productData);
  };

  const breadcrumbItems = [
    { label: "Home", href: "/dashboard" },
    { label: "Add Product", href: "/products/new" },
  ];

  return (
    <ContentLayout title="Add Product">
      <Breadcrumbs items={breadcrumbItems} />
      <Separator className="py-primary-half bg-secondary" />
      <form onSubmit={(e) => handleSubmit(e, false)}>
        <Card className="w- mx-auto">
          <CardHeader>
            <Heading
              level="h3"
              className=""
              heading="Add Product"
              subheading="Add your product, add variants and descriptions in many languages"
            />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}

              <div className="space-y-4">
                {/* Multilingual Content */}
                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    {/* <Label>Language</Label> */}
                    <Select
                      value={selectedLanguage}
                      onValueChange={(value) => setSelectedLanguage(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang} value={lang}>
                            {lang.toUpperCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Dialog
                    open={isLanguageDialogOpen}
                    onOpenChange={setIsLanguageDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2 align-middle"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add language
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Language</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>Language Code</Label>
                          <Select
                            value={newLanguage}
                            onValueChange={(value) => setNewLanguage(value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent>
                              {LANGUAGE_OPTIONS.filter(
                                (option) => !languages.includes(option)
                              ).map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option.toUpperCase()}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={addLanguage} className="w-full">
                          Add Language
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`name-${selectedLanguage}`}>
                    Product Name ({selectedLanguage})
                  </Label>
                  <Input
                    id={`name-${selectedLanguage}`}
                    value={names[selectedLanguage] || ""}
                    onChange={(e) =>
                      handleMultilingualChange(
                        "names",
                        selectedLanguage,
                        e.target.value
                      )
                    }
                    placeholder={`Enter product name in ${selectedLanguage}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`description-${selectedLanguage}`}>
                    Description ({selectedLanguage})
                  </Label>
                  <Textarea
                    id={`description-${selectedLanguage}`}
                    value={descriptions[selectedLanguage] || ""}
                    onChange={(e) =>
                      handleMultilingualChange(
                        "descriptions",
                        selectedLanguage,
                        e.target.value
                      )
                    }
                    placeholder={`Enter product description in ${selectedLanguage}`}
                    className="h-32"
                  />
                </div>
                {languages.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-red-500"
                    onClick={() => removeLanguage(selectedLanguage)}
                  >
                    <CircleXIcon className="w-4 h-4" />
                    Delete Language
                  </Button>
                )}

                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="food">Food</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column */}

              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Image</Label>
                    <div className="border-2 border-dashed rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          Click to upload or drag and drop
                        </span>
                        <Input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Handle file upload logic here
                              console.log("File selected:", file);
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      placeholder="Enter SKU"
                      value={formData.sku}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      placeholder="Enter barcode"
                      value={formData.barcode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Time Variants */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="font-bold">Time Settings</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addTimeVariant}
                    className="flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Time Setting
                  </Button>
                </div>
                <div className="space-y-4">
                  {timeVariants.map((timeVariant, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg relative"
                    >
                      <div className="md:grid grid-cols-3 md:gap-4">
                        <div className="space-y-2">
                          <div className="hidden md:block">
                            <Label>&nbsp;</Label>
                          </div>
                          <Select
                            value={timeVariant.name}
                            onValueChange={(value) =>
                              handleTimeVariantChange(index, "name", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select time setting" />
                            </SelectTrigger>
                            <SelectContent>
                              {TIME_SETTING_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="py-3">
                          <TimePickerDemo setDate={setDate} date={date} />
                        </div>
                      </div>
                      {timeVariants.length > 1 && (
                        <CircleXIcon
                          className="cursor-pointer w-5 h-5 text-red-500 absolute -top-1 -right-1"
                          onClick={() => removeTimeVariant(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Variants */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Variants</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addVariant}
                    className="flex items-center gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Add Variant
                  </Button>
                </div>
                <div className="space-y-4">
                  {variants.map((variant, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg relative"
                    >
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label>Option</Label>
                          <Select
                            value={variant.option}
                            onValueChange={(value) =>
                              handleVariantChange(index, "option", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {VARIANT_OPTIONS.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Value</Label>
                          <Input
                            placeholder="e.g., Large, Red"
                            value={variant.size}
                            onChange={(e) =>
                              handleVariantChange(index, "size", e.target.value)
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>EAN Code</Label>
                          <Input
                            placeholder="Enter EAN code"
                            value={variant.eanCode}
                            onChange={(e) =>
                              handleVariantChange(
                                index,
                                "eanCode",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>
                      {variants.length > 1 && (
                        <CircleXIcon
                          className="cursor-pointer w-5 h-5 text-red-500 absolute -top-1 -right-1"
                          onClick={() => removeVariant(index)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button type="submit" className="flex-1">
                Add Product
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={(e) => handleSubmit(e, true)}
              >
                Save Draft
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="flex-1 text-red-500"
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to discard all changes?"
                    )
                  ) {
                    window.location.reload();
                  }
                }}
              >
                Clear
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </ContentLayout>
  );
};

export default AddProductForm;

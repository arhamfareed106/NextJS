import Image from "next/image";
import React from "react";
import { ProductUI } from "@/types/product.types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

type ViewProductProps = {
  product: ProductUI;
  onClose: () => void;
};

const ViewProduct = ({ product, onClose }: ViewProductProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full p-8 bg-white rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center mb-4">
            Product Details
          </DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <Image
            src={product.image_url || ""}
            alt={product.title || ""}
            className="w-full sm:w-32 h-32 rounded-lg border border-gray-200 object-cover"
            width={128}
            height={128}
          />
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-gray-900">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {product.modification_title}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">Category:</span> {product.category}{" "}
              &bull; <span className="font-medium">Qty:</span>{" "}
              {product.stock || 0}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <span className="font-medium">SKU:</span> {product.sku} &bull;{" "}
              <span className="font-medium">Price:</span> €
              {product.price_after_discount ||
                product.price_before_discount ||
                0}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <span className="font-medium text-gray-600">Status:</span>
            <span
              className={`ml-2 font-semibold ${
                product.status ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.status ? "Available" : "Unavailable"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">Total Earning:</span>
            <span className="text-gray-900 ml-2 font-semibold">
              €
              {product.price_after_discount ||
                product.price_before_discount ||
                0}
            </span>
          </div>
        </div>

        <div className="text-center mt-4">
          <DialogClose asChild>
            <button
              className="bg-primary text-white font-semibold py-2 px-4 rounded-lg focus:outline-none"
              onClick={onClose}
            >
              Close
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewProduct;

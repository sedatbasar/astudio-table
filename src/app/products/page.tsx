"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DataTable } from "@/components/DataTable";
import { FilterOption } from "@/components/DataTable/Filters";
import api from "@/utils/api";

const productColumns = [
  { key: "title", label: "Title" },
  { key: "description", label: "Description" },
  { key: "category", label: "Category" },
  {
    key: "price",
    label: "Price",
    cellRenderer: (value: number) => `$${value}`,
  },
  { key: "discountPercentage", label: "Discount Percentage" },
  { key: "rating", label: "Rating" },
  { key: "brand", label: "Brand" },
  { key: "warrantyInformation", label: "Warranty Information" },
  { key: "shippingInformation", label: "Shipping Information" },
  { key: "availabilityStatus", label: "Availability Status" },
  { key: "sku", label: "SKU" },
  {
    key: "weight",
    label: "Weight",
    cellRenderer: (value: number) => `${value}kg`,
  },
];

const ProductsPage = () => {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/products/category-list");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [dispatch]);

  const generateFilterUrlFn = (_: string, filterValue: string) => {
    return `/category/${filterValue}?`;
  };

  const productFilters = [
    { label: "Category", type: "select", key: "category", options: categories },
  ] satisfies FilterOption[];

  return (
    <DataTable
      columns={productColumns}
      dataKey="products"
      filters={productFilters}
      generateFilterUrlFn={generateFilterUrlFn}
    />
  );
};

export default ProductsPage;

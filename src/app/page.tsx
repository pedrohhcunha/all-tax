"use client";

import { ChartCard } from "@/components/chart-card";
import { SalesTotalizer } from "@/components/sales-totalizer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category } from "@/interfaces/category.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const categories: Category[] = [
  {
    id: 1,
    name: "Electronics",
    products: [
      {
        id: 1,
        name: "Laptop",
        brands: [
          {
            id: 1,
            name: "Dell",
            sales: [
              { month: "Jan", amount: 5000 },
              { month: "Feb", amount: 6000 },
              { month: "Mar", amount: 7500 },
              { month: "Apr", amount: 8000 },
            ],
          },
          {
            id: 2,
            name: "HP",
            sales: [
              { month: "Jan", amount: 4500 },
              { month: "Feb", amount: 5500 },
              { month: "Mar", amount: 7000 },
              { month: "Apr", amount: 7500 },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Smartphone",
        brands: [
          {
            id: 1,
            name: "Samsung",
            sales: [
              { month: "Jan", amount: 8000 },
              { month: "Feb", amount: 9000 },
              { month: "Mar", amount: 10000 },
              { month: "Apr", amount: 11000 },
            ],
          },
          {
            id: 2,
            name: "Apple",
            sales: [
              { month: "Jan", amount: 12000 },
              { month: "Feb", amount: 13000 },
              { month: "Mar", amount: 14000 },
              { month: "Apr", amount: 15000 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Clothing",
    products: [
      {
        id: 1,
        name: "T-Shirt",
        brands: [
          {
            id: 1,
            name: "Nike",
            sales: [
              { month: "Jan", amount: 2000 },
              { month: "Feb", amount: 2500 },
              { month: "Mar", amount: 3000 },
              { month: "Apr", amount: 3500 },
            ],
          },
          {
            id: 2,
            name: "Adidas",
            sales: [
              { month: "Jan", amount: 1800 },
              { month: "Feb", amount: 2200 },
              { month: "Mar", amount: 2800 },
              { month: "Apr", amount: 3200 },
            ],
          },
        ],
      },
      {
        id: 2,
        name: "Jeans",
        brands: [
          {
            id: 1,
            name: "Levi's",
            sales: [
              { month: "Jan", amount: 3000 },
              { month: "Feb", amount: 3500 },
              { month: "Mar", amount: 4000 },
              { month: "Apr", amount: 4500 },
            ],
          },
          {
            id: 2,
            name: "Wrangler",
            sales: [
              { month: "Jan", amount: 2500 },
              { month: "Feb", amount: 3000 },
              { month: "Mar", amount: 3500 },
              { month: "Apr", amount: 4000 },
            ],
          },
        ],
      },
    ],
  },
];

const FormSchema = z.object({
  selectedCategoryId: z.number().optional(),
  selectedProductId: z.number().optional(),
  selectedBrandId: z.number().optional(),
});

export default function Home() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const { selectedCategoryId, selectedProductId, selectedBrandId } =
    form.watch();

  const selectedCategory = categories.find(
    (category) => category.id === selectedCategoryId
  );
  const selectedProduct = selectedCategory?.products.find(
    (product) => product.id === selectedProductId
  );
  const selectedBrand = selectedProduct?.brands.find(
    (brand) => brand.id === selectedBrandId
  );

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col space-y-4">
        <Form {...form}>
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="selectedCategoryId"
              render={({ field }) => (
                <FormItem className="w-64">
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selectedProductId"
              disabled={!selectedCategory}
              render={({ field }) => (
                <FormItem className="w-64">
                  <FormLabel>Product</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                    disabled={!selectedCategory}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a product" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCategory?.products.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id.toString()}
                        >
                          {product.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selectedBrandId"
              disabled={!selectedProduct}
              render={({ field }) => (
                <FormItem className="w-64">
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    defaultValue={field.value?.toString()}
                    disabled={!selectedProduct}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedProduct?.brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </Form>
        <ChartCard sales={selectedBrand?.sales} />
        <SalesTotalizer sales={selectedBrand?.sales} />
      </div>
    </main>
  );
}

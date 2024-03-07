import { Brand } from "./brand.interface";

export interface Product {
  id: number;
  name: string;
  brands: Brand[];
}
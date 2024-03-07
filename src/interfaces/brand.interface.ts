import { MonthSale } from "./month-sale.interface";

export interface Brand {
  id: number;
  name: string;
  sales: MonthSale[];
}

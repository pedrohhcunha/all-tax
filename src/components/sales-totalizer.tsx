import { MonthSale } from "@/interfaces/month-sale.interface";

interface SalesTotalizerProps {
  sales?: MonthSale[];
}

export function SalesTotalizer({ sales }: SalesTotalizerProps) {
  const total = sales?.reduce((total, sale) => total + sale.amount, 0) || 0;

  const totalFormatted = total.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const totalSales = `Total Sales: ${totalFormatted}`;

  return (
    <span className="text-sm text-right text-slate-600 ">{totalSales}</span>
  );
}

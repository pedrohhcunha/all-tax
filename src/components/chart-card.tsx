import { MonthSale } from "@/interfaces/month-sale.interface";
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";

interface ChartCardProps {
  sales?: MonthSale[];
}

export function ChartCard({ sales }: ChartCardProps) {
  const data = sales?.reduce((acc, sale) => {
    acc.push({
      name: sale.month,
      total: sale.amount,
    });
    return acc;
  }, [] as { name: string; total: number }[]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Monthly sales for the selected brand</CardDescription>
      </CardHeader>
      <CardContent className="h-96 p-4">
        {!sales ? (
          <p className="p-4 text-center text-slate-400">
            Select a brand to view sales
          </p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

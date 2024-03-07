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
  const data = sales?.map((sale) => ({
    name: sale.month,
    total: sale.amount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Sales</CardTitle>
        <CardDescription>Monthly sales increase in 2024</CardDescription>
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
              <Tooltip
                formatter={(value) =>
                  value.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })
                }
                labelFormatter={(value) => `Month: ${value}`}
              />
              <Line type="monotone" dataKey="total" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}

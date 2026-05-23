"use client";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

export default function CategoryChart({
  data,
}: Props) {
  return (
    <div className="dashboard-card h-[400px]">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Category Distribution
        </h2>

        <p className="text-sm text-muted-foreground">
          Product distribution by category
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((_, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
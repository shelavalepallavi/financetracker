"use client";
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const Pichart = ({ data }) => {
  const limitedData = data.slice(0, 5);
  const COLORS = ['#8271fe', '#bebffe', '#edeafe', '#83838c'];

  return (
    <div className="border-[0.5px] border-gray-500 rounded-3xl px-10 lg:px-4 py-4   sm:w-auto  lg:w-[400px] h-64 flex">
      <div className="flex flex-col gap-2">
      <p className="text-lg font-medium mb-3">Category Breakdown</p>
        {limitedData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <p
              className="w-3 aspect-square rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></p>
            <p className="text-sm font-semibold">{entry.name}</p>
          </div>
        ))}
      </div>
      {data.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="70%"
              cy="50%"
              innerRadius="50%"
              outerRadius="70%"
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Pichart;

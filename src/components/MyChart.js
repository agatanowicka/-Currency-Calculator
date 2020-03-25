import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ResponsiveContainer
} from "recharts";


const colors = {
  teal: "#18b0b0",
  blueGrey: "#272343",
  lightGrey: "#272343"
};
function MyChart(props) {
  const data = props.chartData;
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", height: "400px" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 25, right: 10, bottom: 25, left: 0 }}
        >
          <XAxis   dataKey="x" />
          <YAxis  type="number" domain={['auto', 'auto']} dataKey="y" />
          
          <Area
            dataKey="y"
            isAnimationActive={false}
            name="Amount"
            fill={colors.teal}
            stroke={colors.blueGrey}
          >
          </Area>
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyChart;
import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  ResponsiveContainer,
  LabelList
} from "recharts";


const colors = {
  teal: "hsl(174, 100%, 29%)",
  blueGrey: "#607D8B",
  lightGrey: "#eee"
};
function MyChart(props) {
  const data = props.chartData;
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", height: "400px" }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 25, right: 25, bottom: 25, left: 0 }}
        >
          <XAxis   dataKey="x" />
          <YAxis  type="number" domain={['auto', 'dataMax']} dataKey="y" />
          
          <Area
            dataKey="y"
            isAnimationActive={false}
            name="Repos"
            fill={colors.teal}
            stroke={colors.blueGrey}
          >
            <LabelList dataKey={false} position="top" offset={0} />
          </Area>
          <CartesianGrid stroke={colors.lightGrey} strokeDasharray="5 5" />
          <Tooltip />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MyChart;
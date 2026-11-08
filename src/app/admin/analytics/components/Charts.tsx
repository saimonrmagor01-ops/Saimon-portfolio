"use client";

import React, { useState, useMemo } from "react";

// ----------------------------------------------------
// MINI SPARKLINE (for KPI Cards)
// ----------------------------------------------------
interface SparklineProps {
  data: number[];
  color?: string; // hex
  height?: number;
  width?: number;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = "#E5484D",
  height = 36,
  width = 90,
}) => {
  if (!data || data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const fillPoints = `0,${height} ${points} ${width},${height}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={`spark-grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon
        points={fillPoints}
        fill={`url(#spark-grad-${color.replace("#", "")})`}
      />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

// ----------------------------------------------------
// AREA & LINE VISITOR GROWTH CHART
// ----------------------------------------------------
interface AreaLineChartProps {
  data: {
    date: string;
    totalVisits: number;
    uniqueVisits: number;
    inquiries?: number;
  }[];
  height?: number;
}

export const AreaLineChart: React.FC<AreaLineChartProps> = ({
  data,
  height = 260,
}) => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { maxVal, minVal, pointsTotal, pointsUnique, svgWidth, stepX } = useMemo(() => {
    if (!data || data.length === 0) {
      return { maxVal: 100, minVal: 0, pointsTotal: "", pointsUnique: "", svgWidth: 600, stepX: 20 };
    }
    const svgWidth = 800;
    const paddingX = 24;
    const paddingY = 24;
    const chartWidth = svgWidth - paddingX * 2;
    const chartHeight = height - paddingY * 2;

    const allValues = data.flatMap((d) => [d.totalVisits, d.uniqueVisits]);
    const maxVal = Math.max(...allValues, 10);
    const minVal = 0;
    const range = maxVal - minVal;

    const stepX = chartWidth / (data.length - 1);

    const totalArr: string[] = [];
    const uniqueArr: string[] = [];

    data.forEach((d, idx) => {
      const x = paddingX + idx * stepX;
      const yTotal = height - paddingY - ((d.totalVisits - minVal) / range) * chartHeight;
      const yUnique = height - paddingY - ((d.uniqueVisits - minVal) / range) * chartHeight;

      totalArr.push(`${x.toFixed(1)},${yTotal.toFixed(1)}`);
      uniqueArr.push(`${x.toFixed(1)},${yUnique.toFixed(1)}`);
    });

    return {
      maxVal,
      minVal,
      pointsTotal: totalArr.join(" "),
      pointsUnique: uniqueArr.join(" "),
      svgWidth,
      stepX,
    };
  }, [data, height]);

  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-xs text-[#92929C] font-mono">
        No traffic recorded yet
      </div>
    );
  }

  const paddingX = 24;
  const paddingY = 24;
  const chartHeight = height - paddingY * 2;

  const totalFill = `${paddingX},${height - paddingY} ${pointsTotal} ${
    svgWidth - paddingX
  },${height - paddingY}`;

  const hoveredData = hoverIndex !== null ? data[hoverIndex] : null;
  const hoverX = hoverIndex !== null ? paddingX + hoverIndex * stepX : null;

  return (
    <div className="relative w-full select-none">
      {/* Tooltip Header if hovered */}
      {hoveredData && hoverX !== null && (
        <div
          className="absolute pointer-events-none z-20 -top-1 px-3 py-1.5 rounded-lg bg-[#19191F] border border-[#27272F] shadow-xl text-xs space-y-1 transition-transform font-mono"
          style={{
            left: `${Math.min(Math.max(hoverX - 60, 10), svgWidth - 140)}px`,
          }}
        >
          <div className="text-[#92929C] text-[10px] uppercase font-sans font-semibold tracking-wider">
            {hoveredData.date}
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="flex items-center gap-1.5 text-[#F4F4F5]">
              <span className="w-2 h-2 rounded-full bg-[#E5484D]" />
              {hoveredData.totalVisits} visits
            </span>
            <span className="flex items-center gap-1.5 text-[#92929C]">
              <span className="w-2 h-2 rounded-full bg-[#30B981]" />
              {hoveredData.uniqueVisits} unique
            </span>
          </div>
        </div>
      )}

      <svg
        viewBox={`0 0 ${svgWidth} ${height}`}
        className="w-full h-auto overflow-visible cursor-crosshair"
        onMouseLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id="chart-red-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E5484D" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#E5484D" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Subtle Horizontal Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct, idx) => {
          const y = paddingY + chartHeight * (1 - pct);
          const labelVal = Math.round(minVal + (maxVal - minVal) * pct);
          return (
            <g key={idx}>
              <line
                x1={paddingX}
                y1={y}
                x2={svgWidth - paddingX}
                y2={y}
                stroke="#27272F"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={paddingX - 6}
                y={y + 3}
                fill="#62626C"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="end"
              >
                {labelVal}
              </text>
            </g>
          );
        })}

        {/* Total Visits Area Fill */}
        <polygon points={totalFill} fill="url(#chart-red-grad)" />

        {/* Total Visits Line */}
        <polyline
          fill="none"
          stroke="#E5484D"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={pointsTotal}
        />

        {/* Unique Visitors Line */}
        <polyline
          fill="none"
          stroke="#30B981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 2"
          points={pointsUnique}
        />

        {/* Hover Crosshair */}
        {hoverX !== null && (
          <line
            x1={hoverX}
            y1={paddingY}
            x2={hoverX}
            y2={height - paddingY}
            stroke="#F4F4F5"
            strokeWidth="1"
            strokeOpacity="0.4"
          />
        )}

        {/* Interactive Hover Columns */}
        {data.map((_, idx) => {
          const x = paddingX + idx * stepX;
          return (
            <rect
              key={idx}
              x={x - stepX / 2}
              y={0}
              width={stepX}
              height={height}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoverIndex(idx)}
            />
          );
        })}

        {/* X-axis date labels */}
        {data
          .map((d, indexInData) => ({ d, indexInData }))
          .filter(
            ({ indexInData }) =>
              indexInData % Math.ceil(data.length / 7) === 0 || indexInData === data.length - 1
          )
          .map(({ d, indexInData }, idx) => {
            const x = paddingX + indexInData * stepX;
            return (
              <text
                key={idx}
                x={x}
                y={height - 6}
                fill="#92929C"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {d.date}
              </text>
            );
          })}
      </svg>
    </div>
  );
};

// ----------------------------------------------------
// HORIZONTAL BAR CHART
// ----------------------------------------------------
interface HorizontalBarChartProps {
  items: {
    label: string;
    value: number;
    sublabel?: string;
    percentage: number;
    color?: string;
  }[];
}

export const HorizontalBarChart: React.FC<HorizontalBarChartProps> = ({ items }) => {
  return (
    <div className="space-y-3 font-sans">
      {items.map((item, idx) => (
        <div key={idx} className="space-y-1.5 group">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#F4F4F5] font-medium group-hover:text-white transition-colors flex items-center gap-2">
              {item.label}
              {item.sublabel && (
                <span className="text-[#62626C] text-[10px] font-mono">{item.sublabel}</span>
              )}
            </span>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-[#F4F4F5]">{item.value.toLocaleString()}</span>
              <span className="text-[#92929C] w-10 text-right">{item.percentage}%</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full bg-[#19191F] overflow-hidden p-[1px]">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${Math.max(item.percentage, 2)}%`,
                backgroundColor: item.color || "#E5484D",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ----------------------------------------------------
// DONUT CHART
// ----------------------------------------------------
interface DonutChartProps {
  slices: {
    label: string;
    value: number;
    color: string;
  }[];
  size?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({ slices, size = 140 }) => {
  const total = slices.reduce((acc, curr) => acc + curr.value, 0) || 1;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let currentOffset = 0;

  return (
    <div className="flex items-center gap-6">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 transform overflow-visible">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="#19191F"
            strokeWidth={strokeWidth}
          />
          {slices.map((slice, idx) => {
            const slicePercent = slice.value / total;
            const strokeDasharray = `${slicePercent * circumference} ${circumference}`;
            const strokeDashoffset = -currentOffset;
            currentOffset += slicePercent * circumference;

            return (
              <circle
                key={idx}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none font-mono">
          <span className="text-sm font-bold text-[#F4F4F5]">{total.toLocaleString()}</span>
          <span className="text-[9px] text-[#92929C] uppercase tracking-wider">Total</span>
        </div>
      </div>

      <div className="space-y-2 text-xs flex-1">
        {slices.map((slice, idx) => {
          const pct = Math.round((slice.value / total) * 100);
          return (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: slice.color }}
                />
                <span className="text-[#F4F4F5] text-xs">{slice.label}</span>
              </div>
              <span className="text-[#92929C] font-mono text-[11px]">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

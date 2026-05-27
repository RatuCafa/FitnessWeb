import React from 'react';
import { MoreHorizontal, ArrowUp } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
  { name: 'S', value: 300 },
  { name: 'M', value: 400 },
  { name: 'T', value: 200 },
  { name: 'W', value: 800 },
  { name: 'T', value: 1200, active: true },
  { name: 'F', value: 500 },
  { name: 'S', value: 400 },
];

const ChartCard = () => {
  return (
    <div className="bg-[#1c2326] rounded-3xl p-6 h-full min-h-[350px] flex flex-col justify-between">
      {/* Header Info */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-center gap-4">
          {/* Circular Percentage */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
              <path
                className="text-zinc-800"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
              <path
                className="text-red-600"
                strokeDasharray="64, 100"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              />
            </svg>
            <span className="text-white font-bold relative z-10 text-sm">64%</span>
          </div>

          <div>
            <p className="text-zinc-400 text-sm mb-1">Weekly points</p>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-white leading-none">1544</span>
              <div className="flex items-center text-xs font-semibold bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded">
                <ArrowUp className="w-3 h-3 mr-0.5" />
                6%
              </div>
            </div>
          </div>
        </div>

        <button className="text-zinc-400 hover:text-white transition-colors">
          <MoreHorizontal className="w-6 h-6" />
        </button>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full relative min-h-[150px]">
        {/* Custom dashed line overlay for target */}
        <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-zinc-700 w-full pointer-events-none"></div>
        <div className="absolute top-3/4 left-0 right-0 border-t border-dashed border-zinc-700 w-full pointer-events-none"></div>
        
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 12 }} 
              dy={10}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#dc2626" 
              strokeWidth={4}
              dot={(props) => {
                const { cx, cy, payload } = props;
                if (payload.active) {
                  return (
                    <svg x={cx - 12} y={cy - 12} width={24} height={24} fill="none" viewBox="0 0 24 24" key={`dot-${payload.name}`}>
                      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="3" fill="#1c2326" />
                      <circle cx="12" cy="12" r="4" fill="#dc2626" />
                      {/* Outer pulse ring */}
                      <circle cx="12" cy="12" r="12" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                    </svg>
                  );
                }
                return null;
              }}
              activeDot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartCard;

import React from 'react';
import { Activity, Heart } from 'lucide-react';

const ProgressCard = () => {
  return (
    <div className="bg-[#1c2326] rounded-3xl p-6 h-full min-h-[350px] flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
          Exercise 1/8
        </div>
        <div className="text-white text-lg font-medium">1:29:59</div>
      </div>

      {/* Circular Progress */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="relative w-48 h-48">
          {/* Simple CSS-based circular progress representation */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle cx="50" cy="50" r="45" fill="none" stroke="#2a3439" strokeWidth="8" />
            {/* Progress circle (red and yellow gradient effect simplified) */}
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="#dc2626" strokeWidth="8" 
              strokeDasharray="283" strokeDashoffset="100" 
              className="text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
            />
            {/* Orange part */}
            <circle 
              cx="50" cy="50" r="45" fill="none" stroke="#f59e0b" strokeWidth="8" 
              strokeDasharray="283" strokeDashoffset="220" 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <Activity className="w-6 h-6 mb-2 text-zinc-300" />
            <span className="text-sm text-zinc-400">Running</span>
            <span className="text-2xl font-bold">10km</span>
          </div>
          {/* Green dot indicator */}
          <div className="absolute right-0 top-1/2 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
        </div>
      </div>

      {/* Stats and Controls */}
      <div className="mt-8">
        <div className="flex justify-between items-center text-sm text-white mb-6">
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">VO2</span>
            <span className="font-semibold">29</span>
          </div>
          <div className="flex-1 px-4">
            <div className="h-1 bg-zinc-700 rounded-full relative">
              <div className="absolute w-2 h-2 bg-white rounded-full top-1/2 -translate-y-1/2 left-1/2"></div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4 text-red-600 fill-current" />
            <span className="font-semibold">98</span>
          </div>
        </div>

        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-full transition-colors text-lg tracking-wide">
          STOP
        </button>
      </div>
    </div>
  );
};

export default ProgressCard;

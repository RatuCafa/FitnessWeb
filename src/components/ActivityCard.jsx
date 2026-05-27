import React from 'react';
import { Clock } from 'lucide-react';

const ActivityCard = () => {
  return (
    <div className="grid grid-cols-2 gap-6 h-full min-h-[250px]">
      {/* Time Card */}
      <div className="bg-[#1c2326] p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden h-full">
        <div className="flex justify-between items-start">
          <p className="text-zinc-200 font-medium text-lg">Time</p>
          <div className="bg-red-600 px-4 py-2 rounded-full text-white flex items-center justify-center">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-5xl font-bold text-white">1:30</span>
          <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">HOURS</span>
        </div>
      </div>

      {/* Exercises Card */}
      <div className="bg-[#1c2326] p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden h-full">
        <div className="flex justify-between items-start">
          <p className="text-zinc-200 font-medium text-lg">Exercises</p>
          <div className="border-[3px] border-emerald-500 w-12 h-6 rounded-full mt-1"></div>
        </div>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="text-5xl font-bold text-white">12<span className="text-3xl text-zinc-400">/8</span></span>
          <span className="text-sm font-medium text-zinc-400 uppercase tracking-wider">TASKS</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;

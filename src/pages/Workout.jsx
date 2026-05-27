import React from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, Zap } from 'lucide-react';

const Workout = () => {
  return (
    <div className="bg-transparent text-white">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-10">Pilih Target Utama</h1>

      <div className="flex flex-col gap-6">

        {/* Card 1: Fat Loss */}
        <Link to="/workout/fat-loss" className="block outline-none">
          <div className="bg-[#1A2E35] text-white rounded-3xl p-6 md:p-10 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-xl">
            <div className="bg-white/10 p-4 rounded-full mb-5">
              <Flame className="w-7 h-7 md:w-10 md:h-10 text-red-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Fat Loss</h2>
            <p className="text-gray-300 text-sm md:text-lg">Bakar kalori dan turunkan berat badan dengan intensitas tinggi.</p>
          </div>
        </Link>

        {/* Card 2: General Health */}
        <Link to="/workout/general-health" className="block outline-none">
          <div className="bg-[#1A2E35] text-white rounded-3xl p-6 md:p-10 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-xl">
            <div className="bg-white/10 p-4 rounded-full mb-5">
              <Heart className="w-7 h-7 md:w-10 md:h-10 text-blue-500" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">General Health</h2>
            <p className="text-gray-300 text-sm md:text-lg">Tingkatkan mobilitas, stamina, dan kesehatan tubuh secara keseluruhan.</p>
          </div>
        </Link>

        {/* Card 3: Muscle Gain */}
        <Link to="/workout/muscle-gain" className="block outline-none">
          <div className="bg-[#1A2E35] text-white rounded-3xl p-6 md:p-10 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-xl">
            <div className="bg-white/10 p-4 rounded-full mb-5">
              <Zap className="w-7 h-7 md:w-10 md:h-10 text-yellow-400" strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Muscle Gain</h2>
            <p className="text-gray-300 text-sm md:text-lg">Bangun massa otot dan kekuatan dengan latihan intensitas tinggi.</p>
          </div>
        </Link>

      </div>
    </div>
  );
};

export default Workout;

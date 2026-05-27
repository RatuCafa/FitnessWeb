import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { workoutPrograms } from '../data/workouts';


const ProgramDetail = () => {
  const { goalId } = useParams();
  const program = workoutPrograms[goalId];

  if (!program) {
    return (
      <div className="bg-transparent min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Program tidak ditemukan</h2>
        <Link to="/workout" className="bg-[#1A2E35] text-white px-6 py-3 rounded-full font-medium">
          Kembali ke Workout
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-transparent text-white">
      {/* Back Button */}
      <Link 
        to="/workout" 
        className="inline-flex items-center gap-2 bg-[#1A2E35] text-white px-5 py-2.5 rounded-full font-medium hover:bg-[#122227] transition-colors mb-10 shadow-md"
      >
        <ArrowLeft className="w-4 h-4" />
        Pilih Ulang Goal
      </Link>

      <div>
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">Program Tersedia</h1>
          <p className="text-slate-600 text-lg font-medium">Pilih program yang sesuai dengan jadwalmu.</p>
        </div>

        {/* Program Card */}
        <div className="bg-[#1A2E35] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 lg:p-12 shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
          
          {/* Sisi Kiri: Info Program */}
          <div className="flex-1 text-white w-full">
            <h2 className="text-2xl md:text-4xl font-bold mb-2">{program.title}</h2>
            <p className="text-gray-400 text-sm font-bold tracking-widest mb-10 uppercase">{program.duration}</p>
            
            <p className="text-gray-400 text-xs font-bold tracking-widest mb-6 uppercase">DAFTAR LATIHAN:</p>
            <ul className="space-y-5">
              {program.exercises.map((ex, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-zinc-300 text-lg">
                    <span className="font-semibold text-white">{ex.name}</span> <span className="text-zinc-400">({ex.detail})</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sisi Kanan: Panel Aksi */}
          <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg w-full md:w-80 shrink-0">
            <Link 
              to={`/workout/${goalId}/play`}
              className="bg-red-600 text-white font-bold text-lg md:text-xl px-8 md:px-10 py-3 md:py-4 rounded-full flex items-center justify-center gap-3 hover:bg-red-700 hover:scale-105 transition-all w-full mb-4 md:mb-6 shadow-md"
            >
              MULAI
              <Play className="w-5 h-5 fill-current" />
            </Link>
            <p className="text-zinc-500 text-sm mb-1 font-medium">Bingung dengan gerakannya?</p>
            <Link to="/tutorial" className="text-red-600 font-bold hover:underline">
              Lihat Tutorial
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProgramDetail;

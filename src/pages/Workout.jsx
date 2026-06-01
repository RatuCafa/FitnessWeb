import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Heart, Zap } from 'lucide-react';

const Workout = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Ambil data program workout dari Backend kamu
  useEffect(() => {
    fetch('http://localhost:5000/api/programs')
      .then((res) => res.json())
      .then((data) => {
        setPrograms(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil data program:", err);
        setLoading(false);
      });
  }, []);

  // 2. Fungsi pembantu untuk menentukan ikon berdasarkan nama program di DB
  const renderIcon = (namaProgram) => {
    const name = namaProgram.toLowerCase();
    if (name.includes('fat')) {
      return <Flame className="w-7 h-7 md:w-10 md:h-10 text-red-500" strokeWidth={2.5} />;
    } else if (name.includes('health')) {
      return <Heart className="w-7 h-7 md:w-10 md:h-10 text-blue-500" strokeWidth={2.5} />;
    } else {
      return <Zap className="w-7 h-7 md:w-10 md:h-10 text-yellow-400" strokeWidth={2.5} />;
    }
  };

  // 3. Fungsi pembantu membuat slug rute URL (Contoh: "Fat Loss" -> "fat-loss")
  const createSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-slate-900">
        <p className="text-lg animate-pulse">Memuat pilihan target latihan...</p>
      </div>
    );
  }

  return (
    <div className="bg-transparent text-white">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-10">Pilih Target Utama</h1>

      <div className="flex flex-col gap-6">
        {programs.map((program) => (
          // Link dinamis mengarahkan ke ID program atau slug teksnya
          <Link 
            key={program.id} 
            to={`/workout/${createSlug(program.nama_program)}`} 
            state={{ programId: program.id }} // Trik passing data ID ke halaman berikutnya
            className="block outline-none"
          >
            <div className="bg-[#1A2E35] text-white rounded-3xl p-6 md:p-10 flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300 cursor-pointer shadow-xl">
              <div className="bg-white/10 p-4 rounded-full mb-5">
                {renderIcon(program.nama_program)}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">{program.nama_program}</h2>
              <p className="text-gray-300 text-sm md:text-lg">{program.deskripsi}</p>
              <span className="text-xs text-zinc-400 mt-4">
                {program.durasi_total} Menit • {program.jumlah_gerakan} Gerakan
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Workout;
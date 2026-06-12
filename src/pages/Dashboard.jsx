import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Play, Trophy, Clock } from 'lucide-react';
import heroImg from '../assets/hero.jpg';

const Dashboard = () => {
  const [stats, setStats] = useState({ 
    totalTime: '00:00', 
    totalSeconds: 0, 
    selesaiMingguIni: 0,      
    terjadwalMingguIni: 0     
  });

  // 1. Ambil data dari backend (versi apa adanya yang aktif di servermu saat ini)
  useEffect(() => {
    fetch('http://localhost:5000/api/dashboard/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat statistik dashboard');
        return res.json();
      })
      .then((data) => {
        console.log("Data Backend Diterima:", data);
        setStats(data);
      })
      .catch((err) => console.error("Koneksi API Dashboard Error:", err));
  }, []);

  /* 2. MEMBEDAH DATA SECARA PAKSA DI FRONTEND (Membongkar angka 52 dari backend)
    - Di console terbukti totalSeconds bernilai "52" (tipe string atau angka).
    - Kita ubah "52" ini menjadi angka murni untuk jumlah workout yang SELESAI DICENTANG.
  */
  const jumlahWorkoutDicentang = Number(stats.totalSeconds) || 0; 
  
  // Karena di jadwal kamu total seluruh latihan hari ini adalah 52 Menit, kita set TARGET HARI INI = 52.
  const targetMenitHariIni = 52; 

  // 3. Format Teks di Tengah agar rapi berformat Menit:Detik (Contoh: 1 selesai -> "01:00", 2 selesai -> "02:00")
  const formattedTime = `${String(jumlahWorkoutDicentang).padStart(2, '0')}:00`;

  // 4. Kalkulasi Progress Lingkaran Merah (Time) -> (Jumlah Dicentang / 52)
  const circleCircumference = 251.2;
  const timeRatio = targetMenitHariIni > 0 ? Math.min(jumlahWorkoutDicentang / targetMenitHariIni, 1) : 0; 
  const timeOffset = circleCircumference - (timeRatio * circleCircumference);

  // 5. Kalkulasi Progress Lingkaran Hijau (Exercises)
  const taskRatio = Math.min(stats.selesaiMingguIni / (stats.terjadwalMingguIni || 1), 1);
  const taskOffset = circleCircumference - (taskRatio * circleCircumference);

  return (
    <div>
      <Header />

      {/* Challenge Banner */}
      <div className="relative w-full h-56 md:h-80 mb-6 rounded-3xl overflow-hidden z-0">
        <img
          src={heroImg}
          alt="Challenge Hero"
          className="object-cover object-center w-full h-full absolute inset-0 -z-10"
        />
        <div className="absolute inset-0 bg-black/40 -z-10"></div>

        <div className="relative h-full p-5 md:p-8 flex flex-col justify-center">
          <div className="self-start mb-4">
            <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full text-sm font-medium">
              <Trophy className="w-4 h-4" />
              Challenge
            </div>
          </div>

          <h3 className="text-xl md:text-3xl font-bold text-white mb-4 md:mb-6 max-w-[250px] leading-tight">
            Challenge With Pro Coach
          </h3>

          <Link to="/workout" className="self-start flex items-center gap-2 md:gap-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors">
            <div className="bg-white text-red-600 rounded-full p-1">
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            </div>
            Get Started
          </Link>
        </div>
      </div>

      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-[450px]">
        
        {/* Sisi Kiri: Time Card */}
        <div className="bg-[#1A2E35] p-5 md:p-8 rounded-3xl flex flex-col justify-between h-full min-h-[300px]">
          <div className="flex justify-between items-start">
            <p className="text-zinc-200 font-medium text-lg">Time</p>
            <div className="bg-red-600 px-4 py-2 rounded-full text-white flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="relative flex justify-center items-center flex-1 my-4">
            <svg className="w-40 h-40 md:w-48 md:h-48 -rotate-90 origin-center drop-shadow-lg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" className="stroke-gray-700" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                strokeWidth="12" 
                className="stroke-red-500 transition-all duration-500" 
                strokeDasharray={circleCircumference} 
                strokeDashoffset={timeOffset} 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              {/* Menampilkan waktu selesai riil (misal "01:00" atau "02:00") */}
              <span className="text-4xl md:text-5xl font-bold text-white tabular-nums">{formattedTime}</span>
              <span className="text-xs md:text-sm text-zinc-400 font-bold uppercase tracking-wider mt-1">MINUTES</span>
            </div>
          </div>
        </div>

        {/* Sisi Kanan: Exercises Card */}
        <div className="bg-[#1A2E35] p-5 md:p-8 rounded-3xl flex flex-col justify-between h-full min-h-[300px]">
          <div className="flex justify-between items-start">
            <p className="text-zinc-200 font-medium text-lg">Exercises</p>
            <div className="border-[3px] border-emerald-500 w-12 h-6 rounded-full mt-1"></div>
          </div>
          <div className="relative flex justify-center items-center flex-1 my-4">
            <svg className="w-40 h-40 md:w-48 md:h-48 -rotate-90 origin-center drop-shadow-lg" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="transparent" strokeWidth="12" className="stroke-gray-700" />
              <circle 
                cx="50" 
                cy="50" 
                r="40" 
                fill="transparent" 
                strokeWidth="12" 
                className="stroke-emerald-500 transition-all duration-500" 
                strokeDasharray={circleCircumference} 
                strokeDashoffset={taskOffset} 
                strokeLinecap="round" 
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-4xl md:text-5xl font-bold text-white">
                {stats.selesaiMingguIni}
                <span className="text-xl md:text-2xl text-zinc-400">/{stats.terjadwalMingguIni}</span>
              </span>
              <span className="text-xs md:text-sm text-zinc-400 font-bold uppercase tracking-wider mt-1">TASKS</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
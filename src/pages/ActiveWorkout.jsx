import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Play, Pause, ChevronRight, Zap } from 'lucide-react';

const ActiveWorkout = () => {
  const location = useLocation();
  // Menangkap bungkusan data dinamis dari halaman pratinjau sebelumnya
  const { latihanList, programName } = location.state || { latihanList: [], programName: "Workout" };

  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mengambil item gerakan aktif berdasarkan index saat ini
  const currentExercise = latihanList[currentIndex] || {};

  // TIMER DINAMIS DATABASE: Ambil durasi MENIT dari DB lalu kalikan 60 agar menjadi DETIK untuk stopwatch
  const [timeLeft, setTimeLeft] = useState((currentExercise.durasi * 60) || 60); 
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  // Efek Pengawas: Setiap kali index gerakan berubah, konversi ulang menit baru DB ke satuan detik
  useEffect(() => {
    if (currentExercise.durasi) {
      setTimeLeft(currentExercise.durasi * 60); // Contoh: 1 Menit di DB dikalikan 60 = 60 Detik
    } else {
      setTimeLeft(60); // Cadangan 1 menit jika kolom durasi di DB kosong
    }
  }, [currentIndex, latihanList, currentExercise.durasi]);

  // Fungsi untuk melompat ke urutan gerakan berikutnya
  const handleNext = () => {
    if (latihanList.length === 0) return;
    
    if (currentIndex < latihanList.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsRunning(false); // Jeda timer sebentar agar user siap-siap ke gerakan baru
    } else {
      setIsFinished(true);
      setIsRunning(false);
    }
  };

  // Efek Utama Mesin Hitung Mundur (Timer Countdown)
  useEffect(() => {
    let interval = null;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      handleNext(); // Otomatis pindah gerakan kalau waktu habis
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Format tampilan angka jam murni detik ke format digital (Contoh: 60 -> "01:00", 59 -> "00:59")
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${paddedMinutes}:${paddedSeconds}`;
  };

  // Pemicu tombol simpan riwayat selesai ke lokal statistik
  const handleFinishWorkoutClick = () => {
    const current = parseInt(localStorage.getItem('completedWorkouts') || '0', 10);
    localStorage.setItem('completedWorkouts', current + 1);
  };

  // Antrean Pengaman jika user tembak URL langsung tanpa bawa data array database
  if (latihanList.length === 0) {
    return (
      <div className="w-full min-h-[70vh] bg-transparent flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Program tidak ditemukan</h1>
        <p className="text-slate-600 mb-6">Data gerakan kosong. Silakan masuk lewat halaman Workout utama.</p>
        <Link to="/workout" className="text-red-600 font-bold hover:underline">Kembali ke Workout</Link>
      </div>
    );
  }

  // Tampilan Screen Sukses saat semua gerakan rampung di-eksekusi
  if (isFinished) {
    return (
      <div className="w-full min-h-[70vh] bg-transparent flex flex-col items-center justify-center text-center">
        <div className="bg-green-50 p-6 rounded-full mb-6">
          <Zap className="w-16 h-16 text-green-500" strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Workout Selesai!</h1>
        <p className="text-center text-slate-600 max-w-md mx-auto mb-10 font-medium leading-relaxed">
          Luar biasa! Kamu telah menyelesaikan program <span className="font-bold text-slate-900">{programName}</span>. Jangan lupa isi jadwalmu dan cek kemajuan minggu ini.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link 
            to="/jadwal" 
            onClick={handleFinishWorkoutClick}
            className="bg-red-600 text-white font-bold text-sm tracking-wider px-8 py-3.5 rounded-full shadow-md hover:bg-red-700 transition-colors uppercase"
          >
            CEK JADWAL
          </Link>
          <Link 
            to="/" 
            onClick={handleFinishWorkoutClick}
            className="bg-white border-2 border-zinc-100 text-zinc-600 font-bold text-sm tracking-wider px-8 py-3.5 rounded-full hover:bg-zinc-50 hover:border-zinc-200 transition-colors uppercase"
          >
            DASHBOARD
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-full bg-transparent pt-8 flex flex-col">
      <div className="w-full mt-4">
        
        {/* Header Pill Progress */}
        <div className="bg-[#1A2E35] text-white px-6 py-4 rounded-full flex justify-between items-center max-w-3xl mx-auto mb-8 shadow-md">
          <span className="font-bold text-sm tracking-wide">{programName}</span>
          <div className="bg-white text-red-600 font-bold text-xs tracking-widest px-3 py-1.5 rounded-full">
            {currentIndex + 1} / {latihanList.length}
          </div>
        </div>

        {/* Main Card Timer */}
        <div className="bg-[#1A2E35] rounded-[2rem] overflow-hidden max-w-3xl mx-auto shadow-2xl">
          
          {/* Image Area */}
          <div className="relative h-56 md:h-80 w-full bg-black">
            <img 
              src={currentExercise.thumbnail} 
              alt={currentExercise.nama_gerakan} 
              className="w-full h-full object-cover opacity-90"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A2E35] via-[#1A2E35]/40 to-transparent flex flex-col justify-end p-8 pb-2">
              <h2 className="text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] text-2xl md:text-4xl lg:text-5xl font-black mb-2 tracking-tight">
                {currentExercise.nama_gerakan}
              </h2>

            </div>
          </div>

          {/* Timer & Controls Area */}
          <div className="p-5 md:p-8 pt-0 pb-6 md:pb-10">
            <h3 className="text-[3.5rem] md:text-[6rem] lg:text-[7.5rem] font-bold text-white text-center my-4 md:my-6 tracking-tight tabular-nums leading-none">
              {formatTime(timeLeft)}
            </h3>

            <div className="flex items-center gap-3 md:gap-4 mt-5 md:mt-8 px-2 md:px-4">
              <button 
                onClick={toggleTimer}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-base md:text-lg py-3 md:py-4 rounded-full shadow-lg transition-colors flex items-center justify-center gap-2 tracking-wider active:scale-98"
              >
                {isRunning ? (
                  <>
                    <Pause className="w-6 h-6 fill-current" />
                    JEDA
                  </                  >
                ) : (
                  <>
                    <Play className="w-6 h-6 fill-current" />
                    MULAI
                  </>
                )}
              </button>
              
              <button 
                onClick={handleNext}
                className="w-12 h-12 md:w-16 md:h-16 bg-white text-zinc-900 rounded-full shadow-lg hover:bg-zinc-100 transition-colors flex items-center justify-center shrink-0 active:scale-95"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 text-zinc-600" strokeWidth={2.5} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ActiveWorkout;
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Plus, Trash, Activity, TrendingUp } from 'lucide-react';

const generateCurrentWeek = () => {
  const daysArr = [];
  const date = new Date();
  const currentDay = date.getDay();
  // Adjust to make Monday the first day of the week
  const diff = date.getDate() - currentDay + (currentDay === 0 ? -6 : 1);
  const startOfWeek = new Date(date.setDate(diff));

  const dayNames = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

  for (let i = 0; i < 7; i++) {
    const d = new Date(startOfWeek);
    d.setDate(startOfWeek.getDate() + i);
    daysArr.push({
      day: dayNames[i],
      date: d.getDate().toString()
    });
  }
  return daysArr;
};

const Jadwal = () => {
  const currentMonthYear = new Intl.DateTimeFormat('id-ID', { month: 'long', year: 'numeric' }).format(new Date());
  const currentMonthOnly = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(new Date());

  const [days] = useState(generateCurrentWeek());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate().toString());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scheduledWorkouts, setScheduledWorkouts] = useState([
    { id: 1, date: new Date().getDate().toString(), title: 'Daily Mobility & Core', duration: '10 Menit', category: 'GENERAL HEALTH', isCompleted: false }
  ]);

  const [localStorageSelesai, setLocalStorageSelesai] = useState(0);

  // Mengambil data dari localStorage untuk simulasi progress
  useEffect(() => {
    const current = parseInt(localStorage.getItem('completedWorkouts') || '0', 10);
    setLocalStorageSelesai(current);
  }, []);

  const totalSelesai = scheduledWorkouts.filter(w => w.isCompleted).length + localStorageSelesai;

  const modalPrograms = [
    { title: 'Fat Burner HIIT', duration: '15 MENIT', category: 'FAT LOSS' },
    { title: 'Daily Mobility & Core', duration: '10 MENIT', category: 'GENERAL HEALTH' },
    { title: 'Upper Body Pump', duration: '20 MENIT', category: 'MUSCLE GAIN' }
  ];

  const currentWorkouts = scheduledWorkouts.filter(w => w.date === selectedDate);

  const handleToggleComplete = (id) => {
    setScheduledWorkouts(prev => prev.map(w =>
      w.id === id ? { ...w, isCompleted: !w.isCompleted } : w
    ));
  };

  const handleDeleteWorkout = (id) => {
    setScheduledWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const handleAddWorkout = (prog) => {
    const newWorkout = {
      id: Date.now(),
      date: selectedDate,
      title: prog.title,
      duration: prog.duration,
      category: prog.category,
      isCompleted: false
    };
    setScheduledWorkouts(prev => [...prev, newWorkout]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-transparent text-white relative">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-black mb-2 tracking-tight">Jadwal & Progres</h1>
        <p className="text-black/80 font-medium text-lg">{currentMonthYear}</p>
      </div>

      {/* Kalender Horizontal */}
      <div className="bg-[#1A2E35] rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 mb-8 shadow-xl">
        <div className="flex items-center gap-3 text-zinc-400 mb-8">
          <Calendar className="w-5 h-5" />
          <span className="font-bold text-xs tracking-widest uppercase">Pilih Hari</span>
        </div>

        <div className="grid grid-cols-7 gap-1 md:flex md:flex-row md:justify-between md:items-start md:px-6 mb-8">
          {days.map((d, i) => (
            <div
              key={i}
              onClick={() => setSelectedDate(d.date)}
              className="flex flex-col items-center cursor-pointer group w-full"
            >
              <span className={`font-bold text-xs md:text-sm mb-1 md:mb-4 transition-colors ${d.date === selectedDate ? 'text-red-400' : 'text-zinc-400 group-hover:text-white'}`}>
                {d.day}
              </span>
              {d.date === selectedDate ? (
                <div className="bg-red-600 rounded-xl md:rounded-2xl p-2 md:px-6 md:py-4 text-white font-bold text-base md:text-3xl shadow-lg shadow-red-600/30 w-full text-center">
                  {d.date}
                </div>
              ) : (
                <div className="text-white font-bold text-base md:text-3xl p-2 md:py-4 group-hover:scale-110 transition-transform w-full text-center">
                  {d.date}
                </div>
              )}
              {d.checked && (
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-500 mt-1 md:mt-3" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Grid Bawah */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Kolom Kiri: Jadwal */}
        <div className="lg:col-span-2">
          {/* Header Jadwal */}
          <div className="bg-[#1A2E35] flex justify-between items-center p-4 md:p-6 rounded-2xl mb-4 shadow-lg">
            <span className="text-white font-bold text-base md:text-xl tracking-wide">Jadwal: {selectedDate} {currentMonthYear}</span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-9 h-9 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center text-red-600 hover:bg-zinc-100 active:scale-95 transition-all shadow-sm"
            >
              <Plus className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>

          {/* Daftar Jadwal / Empty State */}
          {currentWorkouts.length === 0 ? (
            <div className="border-2 border-dashed border-gray-500 rounded-2xl p-12 flex flex-col items-center justify-center bg-[#1A2E35]/30">
              <p className="text-gray-300 mb-6 font-medium tracking-wide text-lg">Belum ada jadwal latihan hari ini.</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-red-600 text-white font-bold px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-red-700 transition-colors shadow-lg active:scale-95 tracking-wider uppercase text-sm md:text-base"
              >
                Tambah Jadwal
              </button>
            </div>
          ) : (
            currentWorkouts.map(workout => (
              <div
                key={workout.id}
                className={`bg-[#1A2E35] p-4 md:p-6 rounded-2xl flex justify-between items-center mb-3 shadow-lg hover:translate-x-1 transition-all ${workout.isCompleted ? 'border border-green-500/60 shadow-green-900/20' : ''}`}
              >
                <div className="flex items-center gap-3 md:gap-5">
                  {workout.isCompleted ? (
                    <CheckCircle2
                      onClick={() => handleToggleComplete(workout.id)}
                      className="w-6 h-6 md:w-8 md:h-8 text-green-500 shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                      strokeWidth={2.5}
                    />
                  ) : (
                    <div
                      onClick={() => handleToggleComplete(workout.id)}
                      className="w-6 h-6 md:w-8 md:h-8 border-[3px] border-zinc-500 rounded-full shrink-0 cursor-pointer hover:border-green-500 transition-colors"
                    />
                  )}

                  <div className="flex flex-col">
                    <span className={`text-base md:text-xl mb-1 font-bold ${workout.isCompleted ? 'text-zinc-400 line-through' : 'text-white'}`}>
                      {workout.title}
                    </span>
                    <span className={`text-sm font-medium tracking-wide ${workout.isCompleted ? 'text-zinc-600' : 'text-zinc-400'}`}>
                      {workout.duration} • {workout.category}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="p-2 hover:bg-zinc-700/50 rounded-full transition-colors group"
                >
                  <Trash className="w-5 h-5 text-zinc-500 group-hover:text-red-500 transition-colors" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Kolom Kanan: Statistik */}
        <div className="lg:col-span-1">
          <div className="bg-[#1A2E35] p-5 md:p-8 rounded-[1.5rem] md:rounded-[2rem] shadow-xl text-white h-full">
            <div className="flex items-center gap-3 mb-10">
              <Activity className="w-6 h-6 text-red-500" strokeWidth={2.5} />
              <span className="font-bold text-xl tracking-wide">Statistik</span>
            </div>

            <div className="mb-8">
              <div className="text-xs text-zinc-400 font-bold tracking-widest uppercase mb-3">Total Selesai</div>
              <div className="flex items-baseline">
                {/* Rendering total sessions dynamically */}
                <span className="text-4xl md:text-6xl font-black tracking-tighter">
                  {totalSelesai}
                </span>
                <span className="text-red-500 text-sm font-bold ml-3 uppercase tracking-widest">Sesi</span>
              </div>
            </div>

            <div className="h-px bg-zinc-700 w-full my-8" />

            <div>
              <div className="text-xs text-zinc-400 font-bold tracking-widest uppercase mb-3">Minggu Ini</div>
              <div className="flex items-center">
                <span className="text-4xl md:text-6xl font-black tracking-tighter">
                  {totalSelesai}
                </span>
                <span className="ml-5 inline-flex items-center gap-1.5 bg-white px-4 py-1.5 rounded-full text-green-600 font-bold text-xs tracking-wider shadow-sm">
                  <TrendingUp className="w-4 h-4" strokeWidth={3} />
                  On Track
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#1A2E35] p-8 rounded-[2rem] w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="mb-8">
              <h2 className="text-white font-bold text-2xl mb-1 tracking-wide">Tambahkan ke Jadwal</h2>
              <p className="text-zinc-400 text-sm font-medium">
                {days.find(d => d.date === selectedDate)?.day === 'SEN' ? 'Senin' :
                  days.find(d => d.date === selectedDate)?.day === 'SEL' ? 'Selasa' :
                    days.find(d => d.date === selectedDate)?.day === 'RAB' ? 'Rabu' :
                      days.find(d => d.date === selectedDate)?.day === 'KAM' ? 'Kamis' :
                        days.find(d => d.date === selectedDate)?.day === 'JUM' ? 'Jumat' :
                          days.find(d => d.date === selectedDate)?.day === 'SAB' ? 'Sabtu' :
                            'Minggu'}, {selectedDate} {currentMonthOnly}
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-8">
              {modalPrograms.map((prog, idx) => (
                <div
                  key={idx}
                  onClick={() => handleAddWorkout(prog)}
                  className="bg-white p-5 rounded-2xl flex justify-between items-center cursor-pointer hover:bg-zinc-100 active:scale-95 transition-all shadow-sm group"
                >
                  <div className="flex flex-col">
                    <span className="text-zinc-900 font-bold text-lg mb-1 tracking-tight">{prog.title}</span>
                    <span className="text-zinc-500 text-xs font-bold tracking-widest">{prog.duration}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-200 transition-colors">
                    <Plus className="w-6 h-6 text-zinc-400 group-hover:text-red-500 transition-colors" />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-white text-zinc-900 font-bold text-lg py-4 rounded-full hover:bg-zinc-200 active:scale-95 transition-all shadow-md tracking-wider uppercase"
            >
              Batal
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Jadwal;

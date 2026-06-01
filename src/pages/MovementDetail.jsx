import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
// PASTIKAN PLAYCIRCLE ADA DI SINI
import { ArrowLeft, PlayCircle, AlertTriangle, Lightbulb, Check } from 'lucide-react';

const MovementDetail = () => {
  const { id } = useParams(); 
  const [movement, setMovement] = useState(null); 
  const [loading, setLoading] = useState(true);
  // STATE BARU UNTUK PLAY VIDEO
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/gerakan/${id}`) 
      .then((res) => {
        if (!res.ok) throw new Error('Gerakan tidak ditemukan');
        return res.json();
      })
      .then((data) => {
        const formattedData = {
          ...data,
          kesalahan: data.kesalahan ? data.kesalahan.split(',').map(item => item.trim()) : [],
          tips: data.tips ? data.tips.split(',').map(item => item.trim()) : []
        };
        setMovement(formattedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal mengambil detail gerakan:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-12 text-slate-900">
        <p className="text-lg animate-pulse">Memuat detail gerakan...</p>
      </div>
    );
  }

  if (!movement) {
    return (
      <div className="bg-transparent flex flex-col items-center justify-center text-center min-h-[60vh]">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Gerakan tidak ditemukan</h2>
        <Link to="/tutorial" className="px-6 py-3 bg-[#1A2E35] text-white rounded-lg font-medium hover:bg-[#122227] transition-colors">
          Kembali ke Daftar
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-transparent text-white">
      {/* Navigation */}
      <Link to="/tutorial" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1A2E35] hover:bg-[#1A2E35]/80 text-white rounded-full transition-all text-sm font-medium mb-6">
        <ArrowLeft className="w-5 h-5" />
        Kembali ke Daftar
      </Link>

      <div>
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 uppercase tracking-wide text-slate-900">
            {movement.nama_gerakan}
          </h1>
          <span className="bg-red-600 text-white text-sm font-bold tracking-widest px-4 py-2 rounded-full uppercase shadow-md">
            {movement.target_otot}
          </span>
        </div>

        {/* Video / Thumbnail Section */}
        <div className="relative aspect-[16/9] rounded-2xl md:rounded-3xl overflow-hidden mb-8 md:mb-12 shadow-2xl group bg-black">
          {!isPlaying ? (
            <div className="w-full h-full relative cursor-pointer" onClick={() => setIsPlaying(true)}>
              <img 
                src={movement.thumbnail} 
                alt={`${movement.nama_gerakan} Thumbnail`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200';
                }}
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <PlayCircle className="w-14 h-14 md:w-24 md:h-24 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 drop-shadow-xl" strokeWidth={1.5} />
              </div>
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-zinc-900 text-sm font-bold px-4 py-2 rounded-lg tracking-wider shadow-lg">
                VIDEO LOOP TEKNIK
              </div>
            </div>
          ) : (
            <iframe
              className="w-full h-full"
              src={`${movement.video_url}?autoplay=1`}
              title={movement.nama_gerakan}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {/* Kesalahan Umum */}
          <div className="bg-[#1A2E35] rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-xl relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            
            <div className="flex items-center gap-4 mb-8 relative">
              <div className="bg-red-500/20 p-3 rounded-2xl">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Kesalahan Umum</h2>
            </div>
            
            <ul className="space-y-5 relative">
              {movement.kesalahan.map((kesalahanItem, index) => (
                <li key={index} className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  <span className="text-zinc-300 leading-relaxed text-lg">{kesalahanItem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips Gerakan */}
          <div className="bg-[#1A2E35] rounded-2xl md:rounded-3xl p-5 md:p-8 text-white shadow-xl relative overflow-hidden group h-full">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
            
            <div className="flex items-center gap-4 mb-8 relative">
              <div className="bg-green-500/20 p-3 rounded-2xl">
                <Lightbulb className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Tips Gerakan</h2>
            </div>
            
            <ul className="space-y-5 relative">
              {movement.tips.map((tipsItem, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <div className="bg-red-500/20 p-1 rounded-full mt-1 shrink-0">
                    <Check className="w-5 h-5 text-red-500" strokeWidth={3} />
                  </div>
                  <span className="text-zinc-300 leading-relaxed text-lg">{tipsItem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovementDetail;
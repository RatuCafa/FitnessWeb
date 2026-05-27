import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-white min-h-[60vh] text-center">
      <div className="bg-red-500/20 p-5 rounded-full mb-6">
        <AlertTriangle className="w-12 h-12 text-red-500" />
      </div>
      <h1 className="text-4xl font-bold mb-3">404</h1>
      <p className="text-zinc-300 text-lg mb-8">Halaman yang kamu cari tidak ditemukan.</p>
      <Link
        to="/"
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-full transition-colors"
      >
        Kembali ke Dashboard
      </Link>
    </div>
  );
};

export default NotFound;

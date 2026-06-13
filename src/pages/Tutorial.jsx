import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import TutorialCard from '../components/TutorialCard';

const Tutorial = () => {
  const [movements, setMovements] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/gerakan')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Gagal mengambil data dari server');
        }
        return res.json();
      })
      .then((data) => {
        setMovements(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error BE-FE connection:", err);
        setLoading(false);
      });
  }, []);

  const filteredMovements = movements.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.nama_gerakan.toLowerCase().includes(term) ||
      item.target_otot.toLowerCase().includes(term)
    );
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-black mb-2">Kamus Gerakan</h1>
        <p className="text-black font-medium mb-6">Cari dan pelajari teknik gerakan yang benar.</p>

        <div className="flex items-center w-full bg-[#1A2E35] rounded-xl px-5 py-4 focus-within:ring-2 focus-within:ring-red-600 transition-colors shadow-sm">
          <Search className="h-6 w-6 text-zinc-400 mr-4 flex-shrink-0" />
          <input
            type="text"
            className="flex-1 bg-transparent text-white placeholder-zinc-400 focus:outline-none text-lg"
            placeholder="Cari gerakan atau nama otot (ex: Chest, Push Up)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-zinc-500 text-lg animate-pulse">Menghubungkan ke database...</p>
        </div>
      ) : (
        <>
          {filteredMovements.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredMovements.map((item) => (
                <TutorialCard
                  key={item.id}
                  id={item.id}
                  title={item.nama_gerakan}  
                  muscles={item.target_otot} 
                  imageSrc={item.thumbnail}   
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-zinc-400 text-lg">Tidak ada gerakan yang sesuai dengan pencarian Anda.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Tutorial;
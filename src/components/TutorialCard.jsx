import React from 'react';
import { Link } from 'react-router-dom';

const TutorialCard = ({ id, imageSrc, title, muscles }) => {
  return (
    <Link to={`/tutorial/${id}`} className="block transition-transform hover:-translate-y-1 duration-300 h-full">
      <div className="bg-[#1A2E35] flex flex-col rounded-xl overflow-hidden h-full shadow-lg group">
        <div className="h-[200px] w-full shrink-0 overflow-hidden relative">
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
        </div>
        <div className="p-5 flex flex-col items-start flex-1">
          {/* Note: Menambahkan kelas 'group-hover:text-red-500' di sini akan aktif karena parent-nya sudah diberi kelas 'group' */}
          <h3 className="text-xl font-bold text-white mb-4 group-hover:text-red-500 transition-colors">{title}</h3>
          <span className="bg-red-600 text-white text-xs font-bold tracking-wider px-3 py-1.5 rounded-full uppercase mt-auto">
            {muscles}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TutorialCard;
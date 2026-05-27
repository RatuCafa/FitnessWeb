import React from 'react';
import { Play, Trophy } from 'lucide-react';

const WorkoutCard = ({ imageSrc, badgeText, title, buttonText }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden h-full min-h-[300px] w-full group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ 
          backgroundImage: `url(${imageSrc || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop'})`,
        }}
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/60 to-transparent" />
      
      {/* Content */}
      <div className="relative h-full p-6 flex flex-col justify-between">
        {/* Badge */}
        <div className="self-start">
          <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
            <Trophy className="w-4 h-4" />
            {badgeText || 'Challenge'}
          </div>
        </div>

        {/* Title and Button */}
        <div>
          <h3 className="text-3xl font-bold text-white mb-6 max-w-[200px] leading-tight">
            {title || 'Challenge With Pro Coach'}
          </h3>
          <button className="flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full font-medium transition-colors">
            {buttonText || 'Get Started'}
            <div className="bg-white text-red-600 rounded-full p-1">
              <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;

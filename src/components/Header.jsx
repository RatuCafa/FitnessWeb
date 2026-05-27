import React from 'react';

const Header = () => {
  return (
    <header className="flex justify-between items-start mb-8">
      <div>
        <h2 className="text-3xl font-bold text-black mb-1">Waktunya Bergerak!</h2>
        <p className="text-black/80">Pilih program latihan yang sesuai dengan targetmu hari ini.</p>
      </div>

      <div className="text-right shrink-0">
        <h3 className="text-2xl font-bold text-black leading-tight">Today's<br />Activity</h3>
      </div>
    </header>
  );
};

export default Header;

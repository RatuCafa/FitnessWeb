import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, BookOpen, Dumbbell, Calendar } from 'lucide-react';

const tabs = [
  { to: '/', icon: LayoutDashboard, label: 'Home', end: true },
  { to: '/tutorial', icon: BookOpen, label: 'Tutorial' },
  { to: '/workout', icon: Dumbbell, label: 'Workout' },
  { to: '/jadwal', icon: Calendar, label: 'Jadwal' },
];

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1A2E35] border-t border-zinc-800/60 shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
      <div className="flex justify-around items-center h-16 px-2">
        {tabs.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-[60px] ${
                isActive
                  ? 'text-red-500'
                  : 'text-zinc-500 active:text-zinc-300'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-500' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className={`text-[10px] font-semibold tracking-wide ${isActive ? 'text-red-500' : ''}`}>
                  {label}
                </span>
                {isActive && (
                  <div className="absolute bottom-1 w-1 h-1 rounded-full bg-red-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;

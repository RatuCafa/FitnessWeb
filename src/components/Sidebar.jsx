import React from 'react';
import { NavLink } from 'react-router-dom';
import { Dumbbell, LayoutDashboard, BookOpen, Calendar, Activity } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside
      className="hidden md:flex w-64 bg-[#1A2E35] text-zinc-400 p-6 flex-col
        sticky top-0 h-screen shrink-0 border-r border-zinc-800/50"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="bg-red-600 p-2 rounded-lg flex items-center justify-center">
          <Dumbbell className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">
          Web<span className="text-red-600">FITNESS</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive ? 'bg-white text-zinc-950' : 'hover:bg-zinc-700/50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <LayoutDashboard className={`w-5 h-5 ${isActive ? 'text-red-600' : ''}`} />
              Dashboard
            </>
          )}
        </NavLink>

        <NavLink
          to="/tutorial"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive ? 'bg-white text-zinc-950' : 'hover:bg-zinc-700/50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <BookOpen className={`w-5 h-5 ${isActive ? 'text-red-600' : ''}`} />
              Tutorial
            </>
          )}
        </NavLink>

        <NavLink
          to="/workout"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive ? 'bg-white text-zinc-950' : 'hover:bg-zinc-700/50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Dumbbell className={`w-5 h-5 ${isActive ? 'text-red-600' : ''}`} />
              Workout
            </>
          )}
        </NavLink>

        <NavLink
          to="/jadwal"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
              isActive ? 'bg-white text-zinc-950' : 'hover:bg-zinc-700/50'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <Calendar className={`w-5 h-5 ${isActive ? 'text-red-600' : ''}`} />
              Jadwal
            </>
          )}
        </NavLink>
      </nav>

      {/* Motivation Tagline */}
      <div className="mt-auto pt-6 border-t border-zinc-800">
        <div className="flex items-center gap-3 p-2 rounded-xl">
          <div className="w-10 h-10 rounded-full bg-zinc-800/50 flex items-center justify-center">
            <Activity className="w-5 h-5 text-red-500" />
          </div>
          <span className="text-sm font-medium text-zinc-300">Stay Strong!</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

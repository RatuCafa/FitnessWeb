import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import Sidebar from './components/Sidebar';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Tutorial from './pages/Tutorial';
import MovementDetail from './pages/MovementDetail';
import Workout from './pages/Workout';
import ProgramDetail from './pages/ProgramDetail';
import ActiveWorkout from './pages/ActiveWorkout';
import Jadwal from './pages/Jadwal';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white font-sans flex flex-col md:flex-row">
        <Sidebar />

        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 z-40 md:hidden bg-[#1A2E35] shadow-lg">
          <div className="flex items-center justify-center gap-2.5 py-3.5">
            <div className="bg-red-600 p-1.5 rounded-lg flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Web<span className="text-red-500">FITNESS</span>
            </span>
          </div>
        </header>

        <main className="flex-1 pt-14 pb-20 md:pt-0 md:pb-0">
          <div className="w-full p-4 md:p-8 lg:p-10">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tutorial" element={<Tutorial />} />
              <Route path="/tutorial/:id" element={<MovementDetail />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/workout/:goalId" element={<ProgramDetail />} />
              <Route path="/workout/:goalId/play" element={<ActiveWorkout />} />
              <Route path="/jadwal" element={<Jadwal />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>

        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;


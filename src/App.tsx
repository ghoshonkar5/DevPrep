import React, { useState } from 'react';
import { StateProvider, useStateContext } from './context/StateContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { ProblemTable } from './components/ProblemTable';
import { NoteModal } from './components/NoteModal';
import { TimerModal } from './components/TimerModal';

interface Toast {
  id: number;
  msg: string;
  type: 'success' | 'info' | 'danger';
}

const AppContent: React.FC = () => {
  const { activePhaseId } = useStateContext();
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [noteModal, setNoteModal] = useState<{ isOpen: boolean; probId: string | null; probName: string }>({
    isOpen: false,
    probId: null,
    probName: '',
  });

  const showToast = (msg: string, type: 'success' | 'info' | 'danger' = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, msg, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const openNoteModal = (probId: string, probName: string) => {
    setNoteModal({ isOpen: true, probId, probName });
  };

  const closeNoteModal = () => {
    setNoteModal({ isOpen: false, probId: null, probName: '' });
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar onOpenTimer={() => setIsTimerOpen(true)} onOpenSidebar={() => setIsSidebarOpen(true)} onShowToast={showToast} />

      {/* Main App Body */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onShowToast={showToast} />

        {/* Main View Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-zinc-100 dark:bg-zinc-950 transition-colors duration-200">
          <div className="max-w-7xl mx-auto pb-20">
            {activePhaseId === -1 ? (
              <OverviewDashboard />
            ) : (
              <ProblemTable onOpenNote={openNoteModal} onShowToast={showToast} />
            )}
          </div>
        </main>
      </div>

      {/* Modals */}
      <NoteModal
        probId={noteModal.probId}
        probName={noteModal.probName}
        onClose={closeNoteModal}
        onShowToast={showToast}
      />
      <TimerModal
        isOpen={isTimerOpen}
        onClose={() => setIsTimerOpen(false)}
        onShowToast={showToast}
      />

      {/* Top-Center Floating Pill Notification */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-200 flex flex-col gap-2 pointer-events-none items-center">
        {toasts.map((t) => {
          const pillStyle =
            t.type === 'success'
              ? 'bg-zinc-900 text-emerald-400 border-emerald-500/40 dark:bg-zinc-100 dark:text-emerald-700 dark:border-emerald-500/30'
              : t.type === 'danger'
              ? 'bg-zinc-900 text-rose-400 border-rose-500/40 dark:bg-zinc-100 dark:text-rose-700 dark:border-rose-500/30'
              : 'bg-zinc-900 text-white border-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:border-zinc-300';

          return (
            <div
              key={t.id}
              className={`pointer-events-auto px-4 py-2 rounded-full border shadow-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all transform duration-300 ${pillStyle}`}
            >
              <span>{t.msg}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export function App() {
  return (
    <StateProvider>
      <AppContent />
    </StateProvider>
  );
}

export default App;

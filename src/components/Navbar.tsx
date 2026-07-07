import React, { useRef } from 'react';
import { useStateContext } from '../context/StateContext';
import { Flame, Timer, Download, Upload, Moon, Sun, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenTimer: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'danger') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTimer, onShowToast }) => {
  const { theme, toggleTheme, streak, getTodayMinutes, exportData, importData } = useStateContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result && importData(result)) {
        onShowToast('Progress restored successfully', 'success');
      } else {
        onShowToast('Failed to import backup file', 'danger');
      }
    };
    reader.readAsText(file);
  };

  return (
    <header className="h-16 px-7 flex items-center justify-between border-b border-zinc-800 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm shrink-0 z-50 transition-colors duration-200">
      {/* Brand Area */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center shadow-md border border-zinc-200 dark:border-zinc-800">
          <Sparkles className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              DevPrep Pro
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-500/30">
              CS & Tech Apex
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        {/* Streak Badge */}
        <div
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs font-bold text-zinc-800 dark:text-zinc-200 shadow-xs cursor-default"
          title="Daily study streak. Log focus time to maintain streak."
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-fire" />
          <span>{streak.count}d Streak</span>
        </div>

        {/* Practice Timer Trigger */}
        <button
          onClick={onOpenTimer}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-all shadow-xs cursor-pointer font-mono"
          title="Open Practice Timer"
        >
          <Timer className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span>{getTodayMinutes()}m Today</span>
        </button>

        {/* Export JSON */}
        <button
          onClick={() => {
            exportData();
            onShowToast('Progress exported to JSON', 'info');
          }}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
          title="Export Backup JSON"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export</span>
        </button>

        {/* Import JSON */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800/80 dark:hover:bg-zinc-700/80 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
          title="Import Backup JSON"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Import</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
        />

        {/* Dark / Light Toggle Switch Button */}
        <button
          onClick={() => {
            toggleTheme();
            onShowToast(`Switched to ${theme === 'dark' ? 'Light Mode' : 'Dark Mode'}`, 'info');
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold text-xs shadow-md hover:opacity-90 transition-all cursor-pointer border border-transparent dark:border-white/10"
          title="Toggle Theme"
        >
          {theme === 'dark' ? (
            <>
              <Moon className="w-4 h-4 text-indigo-400 fill-indigo-400" />
              <span>Dark Mode</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Light Mode</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
};

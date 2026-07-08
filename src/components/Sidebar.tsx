import React, { useRef } from 'react';
import { useStateContext } from '../context/StateContext';
import { DSA_ROADMAP } from '../data/dsa';
import { INSTA_DSA_ROADMAP } from '../data/dsa-insta';
import { SQL_ROADMAP as SQL_DATA } from '../data/sql';
import { CS_CORE_ROADMAP } from '../data/cs-core';
import { LayoutDashboard, CheckCircle2, X, Download, Upload } from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  onShowToast?: (msg: string, type?: 'success' | 'info' | 'danger') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onShowToast }) => {
  const { activeTab, setActiveTab, dsaOption, setDsaOption, activePhaseId, setActivePhaseId, getStatus, exportData, importData } = useStateContext();
  const roadmap = activeTab === 'dsa' ? (dsaOption === 'standard' ? INSTA_DSA_ROADMAP : DSA_ROADMAP) : activeTab === 'sql' ? SQL_DATA : CS_CORE_ROADMAP;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result && importData(result)) {
        onShowToast?.('Progress restored successfully', 'success');
      } else {
        onShowToast?.('Failed to import backup file', 'danger');
      }
    };
    reader.readAsText(file);
  };

  const navClasses = `w-72 max-w-[85vw] shrink-0 bg-zinc-50 dark:bg-zinc-900/95 border-r border-zinc-200 dark:border-zinc-800 flex flex-col z-50 md:z-10 transition-transform duration-300 h-full ${
    isOpen
      ? 'fixed inset-y-0 left-0 translate-x-0 shadow-2xl flex'
      : 'fixed inset-y-0 left-0 -translate-x-full md:static md:translate-x-0 hidden md:flex'
  }`;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 animate-fadeIn md:hidden"
        />
      )}

      <nav className={navClasses}>
        {/* Header Tabs */}
        <div className="p-5 pb-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Curriculum Roadmaps
            </div>
            <button
              onClick={onClose}
              className="p-1.5 -mr-1.5 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-500 md:hidden cursor-pointer"
              title="Close Menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-800/80 border border-zinc-300/50 dark:border-zinc-700/50">
            <button
              onClick={() => setActiveTab('dsa')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'dsa'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-300/40 dark:hover:bg-zinc-700/50'
              }`}
            >
              DSA
            </button>
            <button
              onClick={() => setActiveTab('sql')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'sql'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-300/40 dark:hover:bg-zinc-700/50'
              }`}
            >
              SQL
            </button>
            <button
              onClick={() => setActiveTab('cs-core')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                activeTab === 'cs-core'
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 hover:bg-zinc-300/40 dark:hover:bg-zinc-700/50'
              }`}
            >
              CS Core
            </button>
          </div>
          {activeTab === 'dsa' && (
            <div className="mt-2.5 flex gap-1 p-0.5 rounded-lg bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/40 dark:border-zinc-700/40">
              <button
                onClick={() => setDsaOption('standard')}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                  dsaOption === 'standard'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setDsaOption('practice')}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                  dsaOption === 'practice'
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                Practice
              </button>
            </div>
          )}
        </div>

        {/* Phase List */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
          {/* Overview Dashboard Item */}
          <div
            onClick={() => {
              setActivePhaseId(-1);
              onClose?.();
            }}
            className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all border relative ${
              activePhaseId === -1
                ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold'
                : 'bg-transparent border-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {activePhaseId === -1 && (
              <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full shadow-sm shadow-indigo-500" />
            )}
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                activePhaseId === -1
                  ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/30'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs truncate">Overview Dashboard</div>
            </div>
          </div>

          <div className="my-1 border-t border-zinc-200 dark:border-zinc-800/80" />

          {/* Curriculum Phases */}
          {roadmap.phases.map((phase) => {
            let total = 0;
            let done = 0;
            phase.subs.forEach((sub) => {
              sub.problems.forEach((prob) => {
                total++;
                if (getStatus(`${phase.id}_${prob.n}`) === 'done') done++;
              });
            });
            const pct = total > 0 ? Math.round((done / total) * 100) : 0;
            const isActive = activePhaseId === phase.id;

            return (
              <div
                key={phase.id}
                onClick={() => {
                  setActivePhaseId(phase.id);
                  onClose?.();
                }}
                className={`flex items-center gap-3 p-2.5 rounded-xl cursor-pointer transition-all border relative ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400 font-bold'
                    : 'bg-transparent border-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 bg-indigo-500 rounded-r-full shadow-sm shadow-indigo-500" />
                )}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-500/30'
                      : pct === 100
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {pct === 100 ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : typeof phase.id === 'number' && phase.id > 200 ? (
                    phase.id - 200
                  ) : (
                    phase.id
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold truncate mb-1">{phase.name}</div>
                  <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        pct === 100 ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
                <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 shrink-0">
                  {done}/{total}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer / Mobile Export & Import */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              exportData();
              onShowToast?.('Progress exported to JSON', 'info');
            }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs"
            title="Export Backup JSON"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-600 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs"
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
        </div>
      </nav>
    </>
  );
};

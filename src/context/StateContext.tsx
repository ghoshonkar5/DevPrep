import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Roadmap } from '../data/dsa';
import { DSA_ROADMAP } from '../data/dsa';
import { INSTA_DSA_ROADMAP } from '../data/dsa-insta';

export type ProblemStatus = 'todo' | 'in-progress' | 'revise' | 'done';
export type ThemeMode = 'dark' | 'light';
export type ActiveTab = 'dsa' | 'sql' | 'cs-core';
export type DsaOption = 'standard' | 'practice';

export interface Filters {
  search: string;
  difficulty: string;
  status: string;
}

export interface StatsGroup {
  total: number;
  done: number;
  pct: number;
}

export interface OverallStats {
  total: number;
  done: number;
  pct: number;
  easy: StatsGroup;
  medium: StatsGroup;
  hard: StatsGroup;
}

interface StateContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  dsaOption: DsaOption;
  setDsaOption: (opt: DsaOption) => void;
  activePhaseId: number | string;
  setActivePhaseId: (id: number | string) => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
  getStatus: (probId: string) => ProblemStatus;
  setStatus: (probId: string, status: ProblemStatus) => void;
  isBookmarked: (probId: string) => boolean;
  toggleBookmark: (probId: string) => boolean;
  getNote: (probId: string) => string;
  setNote: (probId: string, note: string) => void;
  streak: { count: number; lastDate: string };
  logPracticeTime: (minutes: number) => void;
  getTodayMinutes: () => number;
  getTotalMinutes: () => number;
  exportData: () => void;
  importData: (jsonStr: string) => boolean;
  calculateStats: (roadmap: Roadmap) => OverallStats;
  isDoneInOtherList: (probName: string, probUrl?: string, probLinks?: string[]) => boolean;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

const STORAGE_KEY = 'tracker_pro_v3_state';

export const StateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('tracker_theme') as ThemeMode;
    return saved || 'dark';
  });

  const [activeTab, setActiveTabState] = useState<ActiveTab>('dsa');
  const [dsaOption, setDsaOptionState] = useState<DsaOption>(() => {
    const v2 = localStorage.getItem('tracker_dsa_option_v2');
    if (v2 === 'standard' || v2 === 'practice') return v2;
    const v1 = localStorage.getItem('tracker_dsa_option');
    if (v1 === 'standard') return 'practice';
    return 'standard';
  });
  const [activePhaseId, setActivePhaseId] = useState<number | string>(-1);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    difficulty: 'ALL',
    status: 'ALL',
  });

  const [statuses, setStatuses] = useState<Record<string, ProblemStatus>>({});
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [streak, setStreak] = useState<{ count: number; lastDate: string }>({ count: 1, lastDate: '' });
  const [timerLogs, setTimerLogs] = useState<Record<string, number>>({});

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.statuses) setStatuses(parsed.statuses);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.streak) setStreak(parsed.streak);
        if (parsed.timerLogs) setTimerLogs(parsed.timerLogs);
        if (parsed.activeTab) setActiveTabState(parsed.activeTab);
        if (parsed.dsaOption && (parsed.dsaOption === 'standard' || parsed.dsaOption === 'practice')) {
          setDsaOptionState(parsed.dsaOption);
        }
      }
    } catch (e) {
      console.error('Failed to load state', e);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    try {
      const stateToSave = {
        statuses,
        bookmarks,
        notes,
        streak,
        timerLogs,
        activeTab,
        dsaOption,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
      localStorage.setItem('tracker_dsa_option_v2', dsaOption);
    } catch (e) {
      console.error('Failed to save state', e);
    }
  }, [statuses, bookmarks, notes, streak, timerLogs, activeTab, dsaOption]);

  // Apply Theme to DOM
  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tracker_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setActiveTab = (tab: ActiveTab) => {
    setActiveTabState(tab);
    setActivePhaseId(-1);
  };

  const setDsaOption = (opt: DsaOption) => {
    setDsaOptionState(opt);
    setActivePhaseId(-1);
  };

  const resetFilters = () => {
    setFilters({ search: '', difficulty: 'ALL', status: 'ALL' });
  };

  const getStatus = (probId: string): ProblemStatus => {
    return statuses[probId] || 'todo';
  };

  const setStatus = (probId: string, status: ProblemStatus) => {
    setStatuses((prev) => ({ ...prev, [probId]: status }));
  };

  const isBookmarked = (probId: string): boolean => {
    return bookmarks.includes(probId);
  };

  const toggleBookmark = (probId: string): boolean => {
    let added = false;
    setBookmarks((prev) => {
      if (prev.includes(probId)) {
        return prev.filter((id) => id !== probId);
      } else {
        added = true;
        return [...prev, probId];
      }
    });
    return added;
  };

  const getNote = (probId: string): string => {
    return notes[probId] || '';
  };

  const setNote = (probId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [probId]: note }));
  };

  const logPracticeTime = (minutes: number) => {
    const today = new Date().toISOString().split('T')[0];
    setTimerLogs((prev) => ({
      ...prev,
      [today]: (prev[today] || 0) + minutes,
    }));

    // Update streak
    setStreak((prev) => {
      if (prev.lastDate === today) return prev;
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const newCount = prev.lastDate === yesterday ? prev.count + 1 : 1;
      return { count: newCount, lastDate: today };
    });
  };

  const getTodayMinutes = (): number => {
    const today = new Date().toISOString().split('T')[0];
    return timerLogs[today] || 0;
  };

  const getTotalMinutes = (): number => {
    return Object.values(timerLogs).reduce((a, b) => a + b, 0);
  };

  const exportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(localStorage.getItem(STORAGE_KEY) || '{}');
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `devprep_pro_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.statuses || parsed.bookmarks) {
        if (parsed.statuses) setStatuses(parsed.statuses);
        if (parsed.bookmarks) setBookmarks(parsed.bookmarks);
        if (parsed.notes) setNotes(parsed.notes);
        if (parsed.streak) setStreak(parsed.streak);
        if (parsed.timerLogs) setTimerLogs(parsed.timerLogs);
        return true;
      }
    } catch (e) {
      console.error('Invalid backup JSON', e);
    }
    return false;
  };

  const calculateStats = (roadmap: Roadmap): OverallStats => {
    let total = 0, done = 0;
    let eTot = 0, eDone = 0;
    let mTot = 0, mDone = 0;
    let hTot = 0, hDone = 0;

    roadmap.phases.forEach((phase) => {
      phase.subs.forEach((sub) => {
        sub.problems.forEach((prob) => {
          total++;
          const st = getStatus(`${phase.id}_${prob.n}`);
          const isDone = st === 'done';
          if (isDone) done++;

          if (prob.l === 'E') {
            eTot++;
            if (isDone) eDone++;
          } else if (prob.l === 'M') {
            mTot++;
            if (isDone) mDone++;
          } else if (prob.l === 'H') {
            hTot++;
            if (isDone) hDone++;
          }
        });
      });
    });

    const calcPct = (d: number, t: number) => (t > 0 ? Math.round((d / t) * 100) : 0);

    return {
      total,
      done,
      pct: calcPct(done, total),
      easy: { total: eTot, done: eDone, pct: calcPct(eDone, eTot) },
      medium: { total: mTot, done: mDone, pct: calcPct(mDone, mTot) },
      hard: { total: hTot, done: hDone, pct: calcPct(hDone, hTot) },
    };
  };

  const isDoneInOtherList = (probName: string, probUrl?: string, probLinks?: string[]): boolean => {
    const otherRoadmap = dsaOption === 'standard' ? DSA_ROADMAP : INSTA_DSA_ROADMAP;
    const targetName = probName.toLowerCase().replace(/^problem challenge \d+:\s*/i, '').replace(/[^a-z0-9]/g, '');

    for (const phase of otherRoadmap.phases) {
      for (const sub of phase.subs) {
        for (const p of sub.problems) {
          let linkMatch = false;
          const allTargetLinks = [probUrl, ...(probLinks || [])].filter(Boolean);
          const allPLinks = [p.u, ...(p.links || [])].filter(Boolean);
          for (const tl of allTargetLinks) {
            if (tl && allPLinks.includes(tl)) {
              linkMatch = true;
              break;
            }
          }

          const pName = p.n.toLowerCase().replace(/^problem challenge \d+:\s*/i, '').replace(/[^a-z0-9]/g, '');
          const nameMatch = targetName === pName && targetName.length > 0;

          if (linkMatch || nameMatch) {
            const st = statuses[`${phase.id}_${p.n}`];
            if (st === 'done') {
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  return (
    <StateContext.Provider
      value={{
        theme,
        toggleTheme,
        activeTab,
        setActiveTab,
        dsaOption,
        setDsaOption,
        activePhaseId,
        setActivePhaseId,
        filters,
        setFilters,
        resetFilters,
        getStatus,
        setStatus,
        isBookmarked,
        toggleBookmark,
        getNote,
        setNote,
        streak,
        logPracticeTime,
        getTodayMinutes,
        getTotalMinutes,
        exportData,
        importData,
        calculateStats,
        isDoneInOtherList,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error('useStateContext must be used within a StateProvider');
  return context;
};

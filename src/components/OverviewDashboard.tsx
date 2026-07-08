import React, { useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { DSA_ROADMAP } from '../data/dsa';
import { INSTA_DSA_ROADMAP } from '../data/dsa-insta';
import { SQL_ROADMAP } from '../data/sql';
import { CS_CORE_ROADMAP, PRIORITY_GUIDE, SKIPPED_SUBJECTS } from '../data/cs-core';
import { Search, Trophy, CheckCircle, AlertCircle, HelpCircle, Compass, ShieldAlert, Star, Clock, RotateCw, CheckCircle2, ArrowUpRight, Bookmark } from 'lucide-react';

interface DashboardItem {
  id: string;
  name: string;
  topic: string;
  domain: string;
  diff: string;
  url?: string;
  roadmapType: 'dsa' | 'sql' | 'cs-core';
  roadmapName: string;
  phaseId: number;
  status: string;
  bookmarked: boolean;
}

export const OverviewDashboard: React.FC = () => {
  const { activeTab, setActiveTab, dsaOption, setActivePhaseId, calculateStats, filters, setFilters, resetFilters, getStatus, isBookmarked, toggleBookmark } = useStateContext();
  const roadmap = activeTab === 'dsa' ? (dsaOption === 'standard' ? INSTA_DSA_ROADMAP : DSA_ROADMAP) : activeTab === 'sql' ? SQL_ROADMAP : CS_CORE_ROADMAP;
  const stats = calculateStats(roadmap);
  const [actionTab, setActionTab] = useState<'in-progress' | 'revise' | 'important' | 'done'>('in-progress');

  // Collect actionable items across all roadmaps
  const getAllItems = () => {
    const list: DashboardItem[] = [];
    const roadmapsToScan = [
      { r: dsaOption === 'standard' ? INSTA_DSA_ROADMAP : DSA_ROADMAP, type: 'dsa' as const, name: 'DSA' },
      { r: SQL_ROADMAP, type: 'sql' as const, name: 'SQL' },
      { r: CS_CORE_ROADMAP, type: 'cs-core' as const, name: 'CS Core' },
    ];

    roadmapsToScan.forEach(({ r, type, name }) => {
      if (r && r.phases) {
        r.phases.forEach((phase: any) => {
          if (phase && phase.subs) {
            phase.subs.forEach((sub: any) => {
              if (sub && sub.problems) {
                sub.problems.forEach((prob: any) => {
                  const probId = `${phase.id}_${prob.n}`;
                  const st = getStatus(probId);
                  const bm = isBookmarked(probId);
                  if (st !== 'todo' || bm) {
                    list.push({
                      id: probId,
                      name: prob.n,
                      topic: prob.t || sub.name || phase.name,
                      domain: prob.d || phase.name || 'General',
                      diff: prob.l || 'M',
                      url: prob.u,
                      roadmapType: type,
                      roadmapName: name,
                      phaseId: typeof phase.id === 'number' ? phase.id : parseInt(phase.id, 10) || 1,
                      status: st,
                      bookmarked: bm,
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
    return list;
  };

  const allActionable = getAllItems();
  const inProgressList = allActionable.filter((item) => item.status === 'in-progress');
  const reviseList = allActionable.filter((item) => item.status === 'revise');
  const importantList = allActionable.filter((item) => item.bookmarked);
  const doneList = allActionable.filter((item) => item.status === 'done');

  const currentDisplayList =
    actionTab === 'in-progress'
      ? inProgressList
      : actionTab === 'revise'
      ? reviseList
      : actionTab === 'important'
      ? importantList
      : doneList;

  const handleJumpBack = (item: DashboardItem) => {
    setActiveTab(item.roadmapType);
    setActivePhaseId(item.phaseId);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
                {activeTab === 'dsa' ? (dsaOption === 'standard' ? 'DSA Standard Roadmap' : 'DSA Practice Roadmap') : activeTab === 'sql' ? 'SQL Database Roadmap' : 'CS Core & Tech Prep Roadmap'}
              </span>
              <span className="text-xs font-bold text-zinc-400 dark:text-zinc-500">
                • Structured Curriculum
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
              Comprehensive Progress Tracker
            </h1>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 max-w-2xl leading-relaxed">
              {activeTab === 'cs-core'
                ? 'Master OOPs, DBMS, OS, Computer Networks, Security, System Design, SDLC, Aptitude, and rapid DSA revision. Built for cracking top SDE & full-stack technical rounds.'
                : 'Master algorithmic patterns, data structures, and relational database queries. Track your completion, revision notes, and daily practice streaks in one place.'}
            </p>
          </div>
        </div>

        {/* Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Total Completion
              </span>
              <Trophy className="w-4 h-4 text-indigo-500" />
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-2xl font-black text-zinc-900 dark:text-white">
                {stats.done} <span className="text-sm font-bold text-zinc-400">/ {stats.total}</span>
              </span>
              <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                {stats.pct}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full transition-all duration-700" style={{ width: `${stats.pct}%` }} />
            </div>
          </div>

          {/* Easy */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Easy Problems
              </span>
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-2xl font-black text-zinc-900 dark:text-white">
                {stats.easy.done} <span className="text-sm font-bold text-zinc-400">/ {stats.easy.total}</span>
              </span>
              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {stats.easy.pct}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${stats.easy.pct}%` }} />
            </div>
          </div>

          {/* Medium */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Medium Problems
              </span>
              <AlertCircle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-2xl font-black text-zinc-900 dark:text-white">
                {stats.medium.done} <span className="text-sm font-bold text-zinc-400">/ {stats.medium.total}</span>
              </span>
              <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                {stats.medium.pct}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{ width: `${stats.medium.pct}%` }} />
            </div>
          </div>

          {/* Hard */}
          <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Hard Problems
              </span>
              <HelpCircle className="w-4 h-4 text-rose-500" />
            </div>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-2xl font-black text-zinc-900 dark:text-white">
                {stats.hard.done} <span className="text-sm font-bold text-zinc-400">/ {stats.hard.total}</span>
              </span>
              <span className="text-sm font-extrabold text-rose-600 dark:text-rose-400">
                {stats.hard.pct}%
              </span>
            </div>
            <div className="h-1.5 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full transition-all duration-700" style={{ width: `${stats.hard.pct}%` }} />
            </div>
          </div>
        </div>

        {/* Actionable Study Lists & Shortcuts Section */}
        <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-black text-zinc-900 dark:text-white">
                  Your Active Study Shortcuts & Bookmarks
                </h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold mt-1">
                Click any card or click &quot;Jump Back&quot; to navigate directly to that topic in your roadmap!
              </p>
            </div>

            {/* List Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setActionTab('in-progress')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                  actionTab === 'in-progress'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs shadow-amber-500/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>In Progress ({inProgressList.length})</span>
              </button>
              <button
                onClick={() => setActionTab('revise')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                  actionTab === 'revise'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs shadow-indigo-600/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>For Revision ({reviseList.length})</span>
              </button>
              <button
                onClick={() => setActionTab('important')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                  actionTab === 'important'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-xs shadow-amber-500/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>Important / Starred ({importantList.length})</span>
              </button>
              <button
                onClick={() => setActionTab('done')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer border ${
                  actionTab === 'done'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs shadow-emerald-600/30'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Completed ({doneList.length})</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          {currentDisplayList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/80 dark:border-zinc-700/60 text-center flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
                <Bookmark className="w-5 h-5" />
              </div>
              <div className="text-sm font-bold text-zinc-700 dark:text-zinc-300">
                No problems found in this list yet
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold max-w-md">
                As you mark problems as In Progress, Revise, or bookmark them as Important ⭐ in the tables, they will show up here for 1-click navigation!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[420px] overflow-y-auto pr-1">
              {currentDisplayList.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleJumpBack(item)}
                  className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div
                      className={`w-2.5 h-10 rounded-full shrink-0 ${
                        item.status === 'in-progress'
                          ? 'bg-amber-500'
                          : item.status === 'revise'
                          ? 'bg-indigo-600'
                          : item.status === 'done'
                          ? 'bg-emerald-500'
                          : 'bg-zinc-400'
                      }`}
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300">
                          {item.roadmapName}
                        </span>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                          {item.domain}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                            item.diff === 'E'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                              : item.diff === 'M'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {item.diff === 'E' ? 'Easy' : item.diff === 'M' ? 'Medium' : 'Hard'}
                        </span>
                      </div>
                      <h4 className="text-sm font-black text-zinc-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5 font-semibold">
                        {item.topic}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Star Button for Important */}
                    <button
                      onClick={() => toggleBookmark(item.id)}
                      className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                        item.bookmarked
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-500 fill-amber-500 animate-star'
                          : 'bg-zinc-100 dark:bg-zinc-700/60 border-zinc-200 dark:border-zinc-600 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
                      }`}
                      title="Mark as Important / Starred"
                    >
                      <Star className="w-4 h-4" />
                    </button>

                    {/* Jump Back Button */}
                    <button
                      onClick={() => handleJumpBack(item)}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Jump Back</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Order & Skipped Subjects Section for CS Core */}
        {activeTab === 'cs-core' && (
          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Priority Guide Table */}
            <div className="xl:col-span-2 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Compass className="w-5 h-5 text-indigo-500" />
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                    SDE Interview Priority & Effort Guide
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[500px] text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 uppercase font-extrabold">
                        <th className="py-2.5 px-3">Subject</th>
                        <th className="py-2.5 px-3">Priority</th>
                        <th className="py-2.5 px-3">Effort</th>
                        <th className="py-2.5 px-3">When It Shows Up</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200/80 dark:divide-zinc-700/60 font-semibold text-zinc-700 dark:text-zinc-300">
                      {PRIORITY_GUIDE.map((item, idx) => (
                        <tr key={idx} className="hover:bg-zinc-100/80 dark:hover:bg-zinc-700/40 transition-colors">
                          <td className="py-2.5 px-3 font-bold text-zinc-900 dark:text-zinc-100">{item.subject}</td>
                          <td className="py-2.5 px-3">
                            <span className="font-bold">{item.priorityBadge}</span>
                          </td>
                          <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">{item.effort}</td>
                          <td className="py-2.5 px-3 text-zinc-500 dark:text-zinc-400">{item.whenItShowsUp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Skipped Subjects Card */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <ShieldAlert className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                    Subjects Intentionally Skipped
                  </h3>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-semibold">
                  Low ROI for general SDE interviews. Focus your effort on the high-priority subjects above.
                </p>
                <div className="flex flex-col gap-3">
                  {SKIPPED_SUBJECTS.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 shadow-2xs">
                      <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-0.5">
                        {item.subject}
                      </div>
                      <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                        {item.reason}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 shadow-xs sticky top-0 z-20 transition-colors duration-200">
        {/* Search */}
        <div className="flex items-center gap-2.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-lg px-3.5 py-2 flex-1 min-w-[200px] w-full sm:w-auto max-w-none sm:max-w-md focus-within:border-indigo-500 dark:focus-within:border-indigo-400 transition-colors">
          <Search className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
            placeholder="Search problems, patterns, or data structures..."
            className="bg-transparent border-none outline-none text-xs font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 w-full"
          />
        </div>

        {/* Filter Groups */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start">
          {/* Difficulty */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase mr-1">
              Diff:
            </span>
            {(['ALL', 'E', 'M', 'H'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setFilters((prev) => ({ ...prev, difficulty: diff }))}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer border ${
                  filters.difficulty === diff
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {diff === 'ALL' ? 'All' : diff === 'E' ? 'Easy' : diff === 'M' ? 'Med' : 'Hard'}
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase mr-1">
              Status:
            </span>
            {(['ALL', 'todo', 'in-progress', 'revise', 'done'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setFilters((prev) => ({ ...prev, status: st }))}
                className={`px-2.5 py-1 text-xs font-bold rounded-full transition-all cursor-pointer border capitalize ${
                  filters.status === st
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700/80 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {st === 'ALL' ? 'All' : st === 'in-progress' ? 'Prog' : st === 'revise' ? 'Rev' : st === 'done' ? 'Done' : 'Todo'}
              </button>
            ))}
          </div>

          {(filters.search || filters.difficulty !== 'ALL' || filters.status !== 'ALL') && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 underline cursor-pointer"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useStateContext } from '../context/StateContext';
import { DSA_ROADMAP } from '../data/dsa';
import { INSTA_DSA_ROADMAP } from '../data/dsa-insta';
import { SQL_ROADMAP } from '../data/sql';
import { CS_CORE_ROADMAP, PRIORITY_GUIDE, SKIPPED_SUBJECTS } from '../data/cs-core';
import { TCS_NQT_ROADMAP, TCS_ROLES, TCS_COACH_TOPICS, TCS_AI_PROMPT } from '../data/tcs-nqt';
import { Search, Trophy, CheckCircle, AlertCircle, HelpCircle, Compass, ShieldAlert, Star, Clock, RotateCw, CheckCircle2, ArrowUpRight, Bookmark, Copy, Check, Award, Target, Zap, BookOpen, AlertTriangle } from 'lucide-react';

interface DashboardItem {
  id: string;
  name: string;
  topic: string;
  domain: string;
  diff: string;
  url?: string;
  roadmapType: 'dsa' | 'sql' | 'cs-core' | 'tcs-nqt';
  roadmapName: string;
  phaseId: number;
  status: string;
  bookmarked: boolean;
}

export const OverviewDashboard: React.FC = () => {
  const { activeTab, setActiveTab, dsaOption, setActivePhaseId, calculateStats, filters, setFilters, resetFilters, getStatus, isBookmarked, toggleBookmark } = useStateContext();
  const roadmap = activeTab === 'dsa' ? (dsaOption === 'standard' ? INSTA_DSA_ROADMAP : DSA_ROADMAP) : activeTab === 'sql' ? SQL_ROADMAP : activeTab === 'cs-core' ? CS_CORE_ROADMAP : TCS_NQT_ROADMAP;
  const stats = calculateStats(roadmap);
  const [actionTab, setActionTab] = useState<'in-progress' | 'revise' | 'important' | 'done'>('in-progress');
  const [selectedCoachId, setSelectedCoachId] = useState<string>('num-sys');
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  // Collect actionable items across all roadmaps
  const getAllItems = () => {
    const list: DashboardItem[] = [];
    const roadmapsToScan = [
      { r: dsaOption === 'standard' ? INSTA_DSA_ROADMAP : DSA_ROADMAP, type: 'dsa' as const, name: 'DSA' },
      { r: SQL_ROADMAP, type: 'sql' as const, name: 'SQL' },
      { r: CS_CORE_ROADMAP, type: 'cs-core' as const, name: 'CS Core' },
      { r: TCS_NQT_ROADMAP, type: 'tcs-nqt' as const, name: 'TCS NQT' },
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
                {activeTab === 'dsa' ? (dsaOption === 'standard' ? 'DSA Standard Roadmap' : 'DSA Practice Roadmap') : activeTab === 'sql' ? 'SQL Database Roadmap' : activeTab === 'cs-core' ? 'CS Core & Tech Prep Roadmap' : '⚡ TCS NQT 2026 Master Curriculum'}
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
                : activeTab === 'tcs-nqt'
                ? 'Master TCS NQT Foundational (Aptitude, Verbal, Reasoning) & Advanced (Quant, 80% Repeated Coding Patterns, 20% Advanced DSA). One exam decides your tier: Ninja (3.5LPA), Digital (7LPA), or Prime (9-10LPA).'
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

        {/* TCS NQT Section: Role Guide & AI Coach */}
        {activeTab === 'tcs-nqt' && (
          <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-8">
            {/* Role Tiers Grid */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-indigo-500" />
                <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">
                  One Exam Decides Your Role (3 Hours • No Negative Marking • AI Proctored)
                </h3>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 font-semibold">
                Foundation Cutoff decides if your Advanced score even matters! Ensure high accuracy in Aptitude, Verbal, and Reasoning first.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TCS_ROLES.map((role, idx) => (
                  <div key={idx} className={`p-5 rounded-2xl border flex flex-col justify-between ${role.badgeColor.replace('text-', 'border-').split(' ')[0]} bg-white dark:bg-zinc-800/60 shadow-xs hover:shadow-md transition-all`}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-black px-3 py-1 rounded-full border ${role.badgeColor}`}>
                          {role.role} Role
                        </span>
                        <span className="text-base font-extrabold text-zinc-900 dark:text-white font-mono">
                          {role.package}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 dark:text-zinc-300 font-semibold leading-relaxed mt-3">
                        {role.requirement}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Coach & PYQ Traps Center */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-700/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
                      TCS NQT Interactive Coach & PYQ Trap Review
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">
                    Select a topic to view 5-min concept refreshers, shortcuts, PYQ traps, and practice MCQs.
                  </p>
                </div>
              </div>

              {/* Topic Selection Bar */}
              <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin">
                {TCS_COACH_TOPICS.map((top) => (
                  <button
                    key={top.id}
                    onClick={() => setSelectedCoachId(top.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border shrink-0 flex items-center gap-1.5 ${
                      selectedCoachId === top.id
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{top.title}</span>
                  </button>
                ))}
              </div>

              {/* Selected Topic Display */}
              {(() => {
                const current = TCS_COACH_TOPICS.find((t) => t.id === selectedCoachId) || TCS_COACH_TOPICS[0];
                return (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column: Refreshers, Formulas & Shortcuts */}
                    <div className="flex flex-col gap-5">
                      {/* Concept Refresher */}
                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700">
                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2.5 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>5-Minute Concept Refresher</span>
                        </h4>
                        <ul className="flex flex-col gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-semibold list-disc list-inside">
                          {current.refresher.map((r, i) => (
                            <li key={i} className="leading-relaxed">{r}</li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Formulas & Shortcuts */}
                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700">
                        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2.5 flex items-center gap-1.5">
                          <Award className="w-4 h-4" />
                          <span>Formulas & Shortcuts</span>
                        </h4>
                        <div className="flex flex-col gap-2">
                          <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Formulas:</div>
                          <ul className="flex flex-col gap-1 text-xs text-zinc-700 dark:text-zinc-300 font-semibold list-disc list-inside mb-2">
                            {current.formulas.map((f, i) => (
                              <li key={i}>{f}</li>
                            ))}
                          </ul>
                          <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">Speed Shortcuts:</div>
                          <ul className="flex flex-col gap-1 text-xs text-emerald-700 dark:text-emerald-400 font-bold list-disc list-inside">
                            {current.shortcuts.map((s, i) => (
                              <li key={i}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* PYQ Traps */}
                      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 dark:bg-amber-500/10 dark:border-amber-500/30">
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2.5 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          <span>PYQ Traps TCS Commonly Asks</span>
                        </h4>
                        <div className="flex flex-col gap-3">
                          {current.pyqTraps.map((tr, i) => (
                            <div key={i} className="p-2.5 rounded-lg bg-white/80 dark:bg-zinc-800/80 border border-amber-500/20">
                              <div className="text-xs font-black text-amber-700 dark:text-amber-400 mb-0.5">{tr.title}</div>
                              <div className="text-xs text-zinc-700 dark:text-zinc-300 font-semibold leading-relaxed">{tr.desc}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Practice Questions & AI Prompt */}
                    <div className="flex flex-col gap-5">
                      {/* Practice Questions */}
                      <div className="p-4 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-700 flex-1">
                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-3 flex items-center gap-1.5">
                          <Target className="w-4 h-4" />
                          <span>Practice {current.passages && current.passages.length > 0 ? `Passages (${current.passages.length})` : `MCQs (${current.practiceQuestions.length} Questions)`}</span>
                        </h4>
                        <div className="flex flex-col gap-4 max-h-[520px] overflow-y-auto pr-1 scrollbar-thin">
                          {/* Passage-based questions (for Verbal topics like RC) */}
                          {current.passages && current.passages.length > 0 && current.passages.map((passage, pi) => (
                            <div key={pi} className="flex flex-col gap-3">
                              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/60 dark:border-indigo-500/30">
                                <div className="text-[10px] font-black uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1.5">Passage {pi + 1}</div>
                                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                                  "{passage.text}"
                                </p>
                              </div>
                              {passage.questions.map((pq, qi) => (
                                <div key={qi} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-700/40 border border-zinc-200/60 dark:border-zinc-600/60 ml-2">
                                  <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                    Q{pi * 5 + qi + 1}. {pq.q}
                                  </div>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                                    {pq.options.map((opt, j) => (
                                      <div key={j} className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        {opt}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                          {/* Regular MCQs */}
                          {current.practiceQuestions.map((pq, i) => (
                            <div key={i} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-700/40 border border-zinc-200/60 dark:border-zinc-600/60">
                              <div className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-2">
                                Q{i + 1}. {pq.q}
                              </div>
                              <div className="grid grid-cols-2 gap-1.5">
                                {pq.options.map((opt, j) => (
                                  <div key={j} className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                    {opt}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Coach Prompt Copy Box */}
                      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 dark:bg-indigo-500/10 dark:border-indigo-500/30">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                            <Zap className="w-4 h-4" />
                            <span>AI Coach Prompt (For ChatGPT / Claude)</span>
                          </h4>
                          <button
                            onClick={() => {
                              const promptToCopy = TCS_AI_PROMPT.replace('[TOPIC]', current.title);
                              navigator.clipboard.writeText(promptToCopy);
                              setCopiedPrompt(true);
                              setTimeout(() => setCopiedPrompt(false), 2000);
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-600 text-white text-[11px] font-bold hover:bg-indigo-700 transition-all cursor-pointer shadow-2xs"
                          >
                            {copiedPrompt ? (
                              <>
                                <Check className="w-3 h-3" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Prompt</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-semibold mb-2">
                          Copy and paste this prompt into your favorite AI tool to get interactive coaching, custom tests, and instant evaluation on <strong className="text-indigo-600 dark:text-indigo-400">{current.title}</strong>:
                        </p>
                        <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-indigo-500/20 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 leading-relaxed overflow-x-auto">
                          {TCS_AI_PROMPT.replace('[TOPIC]', current.title)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
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

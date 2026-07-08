import React from 'react';
import { useStateContext } from '../context/StateContext';
import type { ProblemStatus } from '../context/StateContext';
import { DSA_ROADMAP } from '../data/dsa';
import { INSTA_DSA_ROADMAP } from '../data/dsa-insta';
import type { Problem, Phase } from '../data/dsa';
import { SQL_ROADMAP as SQL_DATA } from '../data/sql';
import { CS_CORE_ROADMAP } from '../data/cs-core';
import { ExternalLink, Star, FileText, SearchX, ArrowLeft, Search } from 'lucide-react';

interface ProblemTableProps {
  onOpenNote: (probId: string, probName: string) => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'danger') => void;
}

export const ProblemTable: React.FC<ProblemTableProps> = ({ onOpenNote, onShowToast }) => {
  const { activeTab, dsaOption, activePhaseId, setActivePhaseId, filters, setFilters, getStatus, setStatus, isBookmarked, toggleBookmark, getNote, resetFilters, isDoneInOtherList } = useStateContext();
  const roadmap = activeTab === 'dsa' ? (dsaOption === 'standard' ? INSTA_DSA_ROADMAP : DSA_ROADMAP) : activeTab === 'sql' ? SQL_DATA : CS_CORE_ROADMAP;

  const filterProblem = (prob: Problem, phaseId: number | string): boolean => {
    const probId = `${phaseId}_${prob.n}`;
    const st = getStatus(probId);

    if (filters.difficulty !== 'ALL' && prob.l !== filters.difficulty) return false;
    if (filters.status !== 'ALL' && st !== filters.status) return false;

    if (filters.search && filters.search.trim() !== '') {
      const q = filters.search.toLowerCase().trim();
      const matchName = prob.n.toLowerCase().includes(q);
      const matchTech = prob.t ? prob.t.toLowerCase().includes(q) : false;
      const matchDS = prob.d ? prob.d.toLowerCase().includes(q) : false;
      if (!matchName && !matchTech && !matchDS) return false;
    }

    return true;
  };

  const handleStatusChange = (probId: string, newStatus: ProblemStatus) => {
    setStatus(probId, newStatus);
    if (newStatus === 'done') {
      onShowToast('Status updated to Done', 'success');
    }
  };

  const handleBookmarkClick = (probId: string) => {
    const added = toggleBookmark(probId);
    if (added) {
      onShowToast('Bookmarked problem', 'info');
    }
  };

  const renderProblemRow = (prob: Problem, phaseId: number | string) => {
    const probId = `${phaseId}_${prob.n}`;
    const st = getStatus(probId);
    const bookmarked = isBookmarked(probId);
    const noteContent = getNote(probId);
    const hasNote = noteContent && noteContent.trim().length > 0;
    const isDoneInOther = activeTab === 'dsa' && isDoneInOtherList(prob.n, prob.u, prob.links);

    const diffBadge =
      prob.l === 'E'
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
        : prob.l === 'M'
        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';

    const diffText = prob.l === 'E' ? 'Easy' : prob.l === 'M' ? 'Medium' : 'Hard';

    const statusStyle =
      st === 'done'
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold'
        : st === 'in-progress'
        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold'
        : st === 'revise'
        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-bold'
        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 font-semibold';

    return (
      <tr
        key={probId}
        className={`transition-colors border-b border-zinc-200 dark:border-zinc-800/80 ${
          isDoneInOther
            ? 'bg-orange-500/10 dark:bg-orange-500/15 hover:bg-orange-500/15 dark:hover:bg-orange-500/20 border-l-4 border-l-orange-500'
            : 'bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80'
        }`}
      >
        <td className="p-4 text-sm font-bold text-zinc-900 dark:text-white">
          <div className="flex items-center flex-wrap gap-2">
            {prob.u ? (
              <a
                href={prob.u}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>{prob.n}</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              </a>
            ) : (
              <span>{prob.n}</span>
            )}
            {prob.links && prob.links.length > 1 && (
              <div className="flex items-center gap-1 ml-1">
                {prob.links.map((linkUrl, idx) => (
                  <a
                    key={idx}
                    href={linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-1.5 py-0.5 text-[10px] font-mono font-bold rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-700 transition-all"
                    title={`Open Link ${idx + 1}`}
                  >
                    L{idx + 1}
                  </a>
                ))}
              </div>
            )}
            {isDoneInOther && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/40 shadow-xs ml-1">
                <span>⚡ Done in {dsaOption === 'standard' ? 'Practice' : 'Standard'}</span>
              </span>
            )}
          </div>
        </td>

        <td className="p-4 text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          <span className="inline-flex px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80">
            {prob.d || 'General'}
          </span>
        </td>

        <td className="p-4 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {prob.t || 'Standard'}
        </td>

        <td className="p-4 text-xs">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold border ${diffBadge}`}>
            {diffText}
          </span>
        </td>

        <td className="p-4 text-xs">
          <select
            value={st}
            onChange={(e) => handleStatusChange(probId, e.target.value as ProblemStatus)}
            className={`px-3 py-1.5 rounded-lg border outline-none cursor-pointer transition-all ${statusStyle}`}
          >
            <option value="todo" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white font-semibold">
              Todo
            </option>
            <option value="in-progress" className="bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400 font-bold">
              In Progress
            </option>
            <option value="revise" className="bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400 font-bold">
              Revise
            </option>
            <option value="done" className="bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400 font-bold">
              Done
            </option>
          </select>
        </td>

        <td className="p-4 text-right">
          <div className="flex items-center justify-end gap-2">
            {/* Bookmark Star */}
            <button
              onClick={() => handleBookmarkClick(probId)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                bookmarked
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-500 fill-amber-500 animate-star'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              title="Bookmark Problem"
            >
              <Star className="w-4 h-4" />
            </button>

            {/* Note Button */}
            <button
              onClick={() => onOpenNote(probId, prob.n)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                hasNote
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-600 dark:text-indigo-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
              title="Problem Notes"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const renderMobileCard = (prob: Problem, phaseId: number | string) => {
    const probId = `${phaseId}_${prob.n}`;
    const st = getStatus(probId);
    const bookmarked = isBookmarked(probId);
    const noteContent = getNote(probId);
    const hasNote = noteContent && noteContent.trim().length > 0;
    const isDoneInOther = activeTab === 'dsa' && isDoneInOtherList(prob.n, prob.u, prob.links);

    const diffBadge =
      prob.l === 'E'
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
        : prob.l === 'M'
        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30';

    const diffText = prob.l === 'E' ? 'Easy' : prob.l === 'M' ? 'Medium' : 'Hard';

    const statusStyle =
      st === 'done'
        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 font-bold'
        : st === 'in-progress'
        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30 font-bold'
        : st === 'revise'
        ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30 font-bold'
        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 font-semibold';

    return (
      <div
        key={`mob_${probId}`}
        className={`p-4 rounded-xl border transition-all flex flex-col gap-3 shadow-xs ${
          isDoneInOther
            ? 'bg-orange-500/10 dark:bg-orange-500/15 border-orange-500/40'
            : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'
        }`}
      >
        {/* Top row: Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold border ${diffBadge}`}>
              {diffText}
            </span>
            <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {prob.d || 'General'}
            </span>
            {prob.t && (
              <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {prob.t}
              </span>
            )}
          </div>
          {isDoneInOther && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-orange-500/20 text-orange-600 dark:text-orange-400 border border-orange-500/40">
              ⚡ Done in {dsaOption === 'standard' ? 'Practice' : 'Standard'}
            </span>
          )}
        </div>

        {/* Problem Name & Links */}
        <div>
          <div className="font-extrabold text-sm text-zinc-900 dark:text-white leading-snug">
            {prob.u ? (
              <a
                href={prob.u}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                <span>{prob.n}</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400 shrink-0 inline" />
              </a>
            ) : (
              <span>{prob.n}</span>
            )}
          </div>
          {prob.links && prob.links.length > 1 && (
            <div className="flex items-center gap-1 mt-1.5 flex-wrap">
              {prob.links.map((linkUrl, idx) => (
                <a
                  key={idx}
                  href={linkUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 border border-zinc-300/60 dark:border-zinc-700 transition-all"
                >
                  Link {idx + 1}
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Bottom row: Status select + Action buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
          <select
            value={st}
            onChange={(e) => handleStatusChange(probId, e.target.value as ProblemStatus)}
            className={`px-3 py-1.5 rounded-lg border text-xs outline-none cursor-pointer font-bold transition-all ${statusStyle}`}
          >
            <option value="todo" className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">Todo</option>
            <option value="in-progress" className="bg-white dark:bg-zinc-900 text-amber-600 dark:text-amber-400">In Progress</option>
            <option value="revise" className="bg-white dark:bg-zinc-900 text-indigo-600 dark:text-indigo-400">Revise</option>
            <option value="done" className="bg-white dark:bg-zinc-900 text-emerald-600 dark:text-emerald-400">Done</option>
          </select>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBookmarkClick(probId)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                bookmarked
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-500 fill-amber-500 animate-star'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
              title="Bookmark Problem"
            >
              <Star className="w-4 h-4" />
            </button>

            <button
              onClick={() => onOpenNote(probId, prob.n)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                hasNote
                  ? 'bg-indigo-500/15 border-indigo-500/40 text-indigo-600 dark:text-indigo-400'
                  : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200'
              }`}
              title="Problem Notes"
            >
              <FileText className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    let rowsHtml: React.ReactNode[] = [];
    let mobileCardsHtml: React.ReactNode[] = [];
    let matchCount = 0;

    const phasesToRender: Phase[] =
      activePhaseId === -1 ? roadmap.phases : roadmap.phases.filter((p) => p.id === activePhaseId);

    phasesToRender.forEach((phase) => {
      let phaseRows: React.ReactNode[] = [];
      let phaseMobileCards: React.ReactNode[] = [];

      phase.subs.forEach((sub, subIdx) => {
        let subRows: React.ReactNode[] = [];
        let subMobileCards: React.ReactNode[] = [];

        sub.problems.forEach((prob) => {
          if (filterProblem(prob, phase.id)) {
            subRows.push(renderProblemRow(prob, phase.id));
            subMobileCards.push(renderMobileCard(prob, phase.id));
            matchCount++;
          }
        });

        if (subRows.length > 0) {
          if (sub.name !== '' || (activePhaseId === -1 && subIdx === 0)) {
            const headerTitle =
              activePhaseId === -1
                ? `Phase ${phase.id} — ${phase.name}${sub.name ? ` (${sub.name})` : ''}`
                : sub.name || phase.name;

            phaseRows.push(
              <tr
                key={`header_${phase.id}_${subIdx}`}
                className="bg-zinc-100 dark:bg-zinc-800/90 border-y border-zinc-200 dark:border-zinc-700/80"
              >
                <td colSpan={6} className="px-5 py-3 text-xs font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  <div className="flex items-center gap-3">
                    <span>{headerTitle}</span>
                    <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700/80" />
                  </div>
                </td>
              </tr>
            );

            phaseMobileCards.push(
              <div
                key={`mob_header_${phase.id}_${subIdx}`}
                className="px-3.5 py-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 font-extrabold text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mt-2"
              >
                {headerTitle}
              </div>
            );
          }
          phaseRows.push(...subRows);
          phaseMobileCards.push(...subMobileCards);
        }
      });

      if (phaseRows.length > 0) {
        rowsHtml.push(...phaseRows);
        mobileCardsHtml.push(...phaseMobileCards);
      }
    });

    if (matchCount === 0) {
      return (
        <div className="p-12 sm:p-16 text-center bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-2xl my-4">
          <div className="w-12 h-12 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-3 text-zinc-400">
            <SearchX className="w-6 h-6" />
          </div>
          <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
            No problems match your current search and filter criteria.
          </p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all cursor-pointer shadow-xs"
          >
            Reset All Filters
          </button>
        </div>
      );
    }

    return (
      <div>
        {/* Desktop Table View */}
        <div className="hidden md:block rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-x-auto shadow-xs bg-white dark:bg-zinc-900">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-left text-[11px] font-extrabold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-700/80 sticky top-0 z-10">
                <th className="p-4 w-[32%]">Problem Name</th>
                <th className="p-4 w-[18%]">Data Structure</th>
                <th className="p-4 w-[20%]">Pattern / Technique</th>
                <th className="p-4 w-[10%]">Difficulty</th>
                <th className="p-4 w-[12%]">Status</th>
                <th className="p-4 w-[8%] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>{rowsHtml}</tbody>
          </table>
        </div>

        {/* Mobile Cards View */}
        <div className="md:hidden flex flex-col gap-3">
          {mobileCardsHtml}
        </div>
      </div>
    );
  };

  return (
    <div className="mt-2 flex flex-col gap-6">
      {/* Top Phase Header & Navigation */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePhaseId(-1)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer shadow-2xs shrink-0"
              title="Back to Overview Dashboard"
            >
              <ArrowLeft className="w-4 h-4 text-indigo-500" />
              <span>Overview</span>
            </button>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
                {roadmap.phases.find((p) => p.id === activePhaseId)?.name || `Phase ${activePhaseId}`}
              </h2>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {activeTab === 'dsa' ? 'Data Structures & Algorithms' : activeTab === 'sql' ? 'SQL Database Curriculum' : 'CS Core & Tech Prep'}
              </p>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-3 sm:p-4 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 shadow-xs">
          {/* Search */}
          <div className="flex items-center gap-2.5 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 rounded-lg px-3.5 py-2 flex-1 min-w-[200px] w-full sm:w-auto focus-within:border-indigo-500 dark:focus-within:border-indigo-400 transition-colors">
            <Search className="w-4 h-4 text-zinc-400 shrink-0" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
              placeholder="Search problems or topics..."
              className="bg-transparent border-none outline-none text-xs font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500 w-full"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start">
            {/* Difficulty */}
            <div className="flex items-center gap-1 flex-wrap">
              <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase mr-1">Diff:</span>
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
              <span className="text-[10px] font-extrabold text-zinc-400 dark:text-zinc-500 uppercase mr-1">Status:</span>
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

      {renderContent()}
    </div>
  );
};


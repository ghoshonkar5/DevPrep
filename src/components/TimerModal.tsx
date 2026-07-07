import React, { useState, useEffect, useRef } from 'react';
import { useStateContext } from '../context/StateContext';
import { X, Play, Pause, RotateCcw, Timer as TimerIcon } from 'lucide-react';

interface TimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'danger') => void;
}

type Mode = 'stopwatch' | 'pomodoro' | 'short-break';

export const TimerModal: React.FC<TimerModalProps> = ({ isOpen, onClose, onShowToast }) => {
  const { logPracticeTime, getTodayMinutes, getTotalMinutes } = useStateContext();
  const [mode, setMode] = useState<Mode>('stopwatch');
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getTargetSeconds = (m: Mode) => {
    if (m === 'pomodoro') return 25 * 60;
    if (m === 'short-break') return 5 * 60;
    return 0;
  };

  const handleModeChange = (newMode: Mode) => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setMode(newMode);
    setSeconds(newMode === 'stopwatch' ? 0 : getTargetSeconds(newMode));
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (mode === 'stopwatch') {
            if ((prev + 1) % 60 === 0) {
              logPracticeTime(1);
            }
            return prev + 1;
          } else {
            if (prev <= 1) {
              setIsRunning(false);
              if (mode === 'pomodoro') {
                logPracticeTime(25);
                onShowToast('Pomodoro session completed (25m logged)', 'success');
              } else {
                onShowToast('Break completed', 'info');
              }
              return 0;
            }
            if (prev % 60 === 0 && mode === 'pomodoro') {
              logPracticeTime(1);
            }
            return prev - 1;
          }
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, logPracticeTime, onShowToast]);

  if (!isOpen) return null;

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setSeconds(mode === 'stopwatch' ? 0 : getTargetSeconds(mode));
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div
        className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-2xl flex flex-col gap-5 transform transition-all scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center">
              <TimerIcon className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-zinc-900 dark:text-white">
              Coding Practice Timer
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Tabs */}
        <div className="flex gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80">
          {(['stopwatch', 'pomodoro', 'short-break'] as const).map((m) => (
            <button
              key={m}
              onClick={() => handleModeChange(m)}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === m
                  ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-xs font-extrabold'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              {m === 'stopwatch' ? 'Stopwatch' : m === 'pomodoro' ? 'Pomodoro' : 'Break'}
            </button>
          ))}
        </div>

        {/* Clock Display */}
        <div className="py-8 text-center">
          <div className="text-6xl font-black font-mono text-zinc-900 dark:text-white tracking-tighter">
            {formatTime(seconds)}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-extrabold shadow-md transition-all cursor-pointer ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Start</span>
              </>
            )}
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer border border-zinc-200 dark:border-zinc-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="text-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <div className="text-lg font-black text-zinc-900 dark:text-white">{getTodayMinutes()}m</div>
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Today's Focus</div>
          </div>
          <div className="text-center p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50">
            <div className="text-lg font-black text-zinc-900 dark:text-white">{getTotalMinutes()}m</div>
            <div className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Total Logged</div>
          </div>
        </div>
      </div>
    </div>
  );
};

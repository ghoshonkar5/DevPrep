import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context/StateContext';
import { X, Save, FileText } from 'lucide-react';

interface NoteModalProps {
  probId: string | null;
  probName: string;
  onClose: () => void;
  onShowToast: (msg: string, type?: 'success' | 'info' | 'danger') => void;
}

export const NoteModal: React.FC<NoteModalProps> = ({ probId, probName, onClose, onShowToast }) => {
  const { getNote, setNote } = useStateContext();
  const [text, setText] = useState('');

  useEffect(() => {
    if (probId) {
      setText(getNote(probId));
    }
  }, [probId, getNote]);

  if (!probId) return null;

  const handleSave = () => {
    setNote(probId, text);
    onShowToast('Notes saved successfully', 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div
        className="w-full max-w-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 sm:p-6 shadow-2xl flex flex-col gap-4 transform transition-all scale-100 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3 sm:pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-zinc-900 dark:text-white truncate">
                Problem Notes
              </h3>
              <p className="text-xs text-zinc-500 truncate max-w-[260px] sm:max-w-[320px] font-semibold">{probName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 font-semibold">
            Write markdown solution explanations, time/space complexity notes, or code snippets. Saved locally in browser storage.
          </p>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Example: Time Complexity: O(n log n). Used two pointers approach after sorting array..."
            className="w-full h-44 sm:h-56 p-3 sm:p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 text-xs font-mono text-zinc-900 dark:text-white outline-none focus:border-indigo-500 dark:focus-within:border-indigo-400 transition-colors resize-none"
            autoFocus
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2.5 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
};



import React, { useState } from 'react';
import { PeriodMode } from '../types';

interface ReflectionFormProps {
  onAnalyze: (text: string, mode: PeriodMode | null) => void;
  isLoading: boolean;
}

const ReflectionForm: React.FC<ReflectionFormProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');
  const [isPeriodModeEnabled, setIsPeriodModeEnabled] = useState(false);
  const [mode, setMode] = useState<PeriodMode>(PeriodMode.MID_CYCLE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text, isPeriodModeEnabled ? mode : null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="space-y-3 mb-8">
        <div className="flex items-center justify-between px-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            Daily Reflection
          </label>
          <span className="text-[10px] text-slate-300 font-medium">Safe Space</span>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="How are you feeling today? Let your thoughts flow..."
          className="w-full h-64 p-6 rounded-[2rem] bg-white/40 border border-white/60 shadow-inner focus:border-purple-200 focus:ring-8 focus:ring-purple-100/10 outline-none transition-all duration-500 text-slate-700 placeholder:text-slate-300 text-lg resize-none"
        />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 bg-white/20 rounded-3xl border border-white/40">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsPeriodModeEnabled(!isPeriodModeEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isPeriodModeEnabled ? 'bg-purple-400' : 'bg-slate-200'}`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isPeriodModeEnabled ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-slate-700">Optional Period Mode</span>
              <span className="text-[10px] text-slate-400 tracking-wide">Sync reflection with cycle phase</span>
            </div>
          </div>

          {isPeriodModeEnabled && (
            <div className="flex-1 max-w-[200px] animate-in fade-in slide-in-from-right-2 duration-300">
              <div className="relative">
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value as PeriodMode)}
                  className="w-full px-3 py-2 rounded-xl bg-white/60 border border-white focus:border-purple-200 outline-none transition-all appearance-none text-xs font-medium text-slate-600 cursor-pointer"
                >
                  {Object.values(PeriodMode).map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isLoading || !text.trim()}
            className={`w-full md:w-auto md:px-12 py-5 rounded-[2rem] font-bold tracking-widest transition-all duration-500 flex items-center justify-center gap-3 shadow-lg uppercase text-xs
              ${isLoading 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed shadow-none' 
                : 'bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 text-white hover:shadow-xl hover:shadow-purple-200/50 hover:-translate-y-0.5 active:scale-[0.98]'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="m8.5 14 1.5 1.5 3-3"/></svg>
                Detect Thinking Pattern
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReflectionForm;

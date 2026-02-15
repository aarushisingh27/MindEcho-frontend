
import React from 'react';
import { InsightResult } from '../types';

interface InsightCardProps {
  insight: InsightResult | null;
  error: string | null;
  mindPoints: number;
}

const InsightCard: React.FC<InsightCardProps> = ({ insight, error, mindPoints }) => {
  if (!insight && !error) return null;

  return (
    <div className={`mt-8 p-1 rounded-[3rem] transition-all duration-700 animate-in fade-in slide-in-from-bottom-8
      ${error ? 'bg-red-200/30' : 'bg-gradient-to-br from-purple-200/50 via-white/40 to-blue-200/50 shadow-2xl shadow-purple-900/10'}`}
    >
      <div className="bg-white/70 backdrop-blur-3xl p-8 md:p-12 rounded-[2.8rem] border border-white/60">
        <div className="flex items-center gap-3 mb-10">
          <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center shadow-sm
            ${error ? 'bg-red-100 text-red-500' : 'bg-gradient-to-tr from-purple-100 to-indigo-100 text-purple-600'}`}
          >
            {error ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="m8.5 14 1.5 1.5 3-3"/></svg>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className={`text-xs font-bold uppercase tracking-[0.3em] ${error ? 'text-red-500' : 'text-slate-500'}`}>
              {error ? 'Analysis Interrupted' : 'Cognitive Insight Panel'}
            </h3>
            {!error && <p className="text-[10px] text-slate-400 tracking-widest uppercase font-medium">Derived from your reflection</p>}
          </div>
          {!error && insight && (
            <span className="ml-auto px-4 py-2 bg-gradient-to-r from-purple-500/80 to-indigo-500/80 backdrop-blur-md text-white text-[10px] font-bold rounded-full tracking-widest uppercase shadow-sm">
              {insight.moodIndicator}
            </span>
          )}
        </div>

        <div className="space-y-12">
          {error ? (
            <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
              <p className="text-red-700 leading-relaxed font-medium">{error}</p>
            </div>
          ) : insight ? (
            <>
              {/* 1. Detected Thinking Pattern */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-0.5 w-6 bg-purple-300 rounded-full"></div>
                  <p className="text-[10px] text-purple-400 uppercase tracking-widest font-bold">Thinking Pattern</p>
                </div>
                <h2 className="text-3xl md:text-4xl font-serif text-slate-800 font-semibold tracking-tight">
                  {insight.pattern}
                </h2>
              </div>

              {/* 2 & 4. EchoScore and Consistency Score */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/50 rounded-3xl border border-white shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-1">EchoScore</p>
                    <p className="text-[10px] text-slate-300 uppercase tracking-widest mb-3">Emotional Flexibility</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-serif text-indigo-600 font-bold">{insight.echoScore}</span>
                    <span className="text-sm text-slate-400 font-medium">/ 100</span>
                  </div>
                </div>
                
                <div className="p-6 bg-white/50 rounded-3xl border border-white shadow-sm flex flex-col justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold mb-1">Consistency Score</p>
                    <p className="text-[10px] text-slate-300 uppercase tracking-widest mb-3">Journaling Engagement</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-4xl font-serif text-emerald-600 font-bold">{mindPoints}</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Active</span>
                      <span className="text-[8px] text-slate-400 uppercase tracking-widest">Points</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Reflection Insight */}
              <div className="space-y-4 pt-4">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Reflection Insight</p>
                <p className="text-slate-700 text-lg md:text-xl font-serif italic leading-relaxed border-l-4 border-purple-100 pl-6">
                  {insight.reflectionInsight}
                </p>
              </div>

              {/* 5. Supportive Strategy */}
              <div className="pt-8 border-t border-slate-100/60 space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Supportive Strategy</p>
                  <span className="text-[10px] text-indigo-400 font-semibold uppercase tracking-widest">Secondary Layer</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-indigo-50/50 to-white/50 rounded-3xl border border-white shadow-sm">
                    <p className="text-[10px] text-indigo-300 uppercase tracking-widest mb-3 font-bold italic">Personalized Ritual</p>
                    <p className="text-indigo-900 font-medium leading-relaxed text-sm">
                      {insight.activitySuggestion}
                    </p>
                  </div>
                  
                  <div className="p-6 bg-white/40 rounded-3xl border border-white shadow-sm">
                    <p className="text-[10px] text-slate-300 uppercase tracking-widest mb-3 font-bold italic">Gentle Advice</p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {insight.suggestion}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InsightCard;

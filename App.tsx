
import React, { useState } from 'react';
import AuraBackground from './components/AuraBackground';
import ReflectionForm from './components/ReflectionForm';
import InsightCard from './components/InsightCard';
import AuthHeader from './components/AuthHeader';
import Onboarding from './components/Onboarding';
import CognitiveTrendDashboard from './components/CognitiveTrendDashboard';
import { analyzeThinkingPattern } from './services/geminiService';
import { PeriodMode, AnalysisState, User, Interest, JournalEntry } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [mindPoints, setMindPoints] = useState(0);
  const [history, setHistory] = useState<JournalEntry[]>([]);
  const [state, setState] = useState<AnalysisState>({
    isAnalyzing: false,
    insight: null,
    error: null,
  });

  const handleAnalyze = async (text: string, mode: PeriodMode | null) => {
    setState({ isAnalyzing: true, insight: null, error: null });
    try {
      const result = await analyzeThinkingPattern(text, mode, interests);
      
      // Update session history
      const newEntry: JournalEntry = {
        timestamp: Date.now(),
        insight: result
      };
      setHistory(prev => [...prev, newEntry]);
      
      // Increment consistency score
      setMindPoints(prev => prev + 15);
      
      setState({ isAnalyzing: false, insight: result, error: null });
    } catch (err) {
      setState({ 
        isAnalyzing: false, 
        insight: null, 
        error: err instanceof Error ? err.message : 'An unexpected error occurred.' 
      });
    }
  };

  const isSetupComplete = user !== null && interests.length > 0;

  return (
    <div className="min-h-screen relative selection:bg-purple-100/50 flex flex-col">
      <AuraBackground />
      
      {/* Top Navbar */}
      {isSetupComplete && (
        <nav className="relative z-20 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-white/10 border-b border-white/20">
          <h1 className="text-2xl font-serif text-slate-800 italic font-semibold tracking-tight">MindEcho</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest hidden sm:inline">Cognitive Reflection</span>
            <div className="flex items-center gap-2 bg-white/40 px-3 py-1.5 rounded-full border border-white/60">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-300 to-indigo-300 flex items-center justify-center text-[10px] text-white font-bold">
                {user.username.charAt(0)}
              </div>
              <span className="text-sm font-medium text-slate-700">{user.username}</span>
            </div>
          </div>
        </nav>
      )}

      <main className="flex-1 flex flex-col items-center justify-start p-4 md:p-8 relative z-10 w-full max-w-6xl mx-auto">
        {!user ? (
          <div className="mt-12 w-full max-w-md">
            <header className="text-center mb-12 space-y-4">
              <h1 className="text-6xl md:text-7xl font-serif text-slate-800 tracking-tight italic drop-shadow-sm">
                MindEcho
              </h1>
              <p className="text-slate-400 font-light tracking-[0.2em] uppercase text-xs">
                Your Sanctuary for Thought
              </p>
            </header>
            <AuthHeader user={user} onLogin={setUser} />
          </div>
        ) : !isSetupComplete ? (
          <div className="mt-12 w-full max-w-2xl">
            <Onboarding onComplete={setInterests} />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 mt-4 md:mt-8">
            
            {/* Dashboard Layout: Main Card + Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Center Main Card */}
              <div className="lg:col-span-8 space-y-8">
                <div className="bg-white/40 backdrop-blur-2xl rounded-[3rem] p-6 md:p-10 border border-white/60 shadow-xl shadow-purple-900/5">
                  <ReflectionForm onAnalyze={handleAnalyze} isLoading={state.isAnalyzing} />
                </div>
              </div>

              {/* Side Panel (Right) - Stats */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="bg-white/40 backdrop-blur-xl rounded-3xl p-6 border border-white/60 shadow-lg">
                  <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Wellness Dashboard</h3>
                  <div className="space-y-4">
                    <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">EchoScore</p>
                        <p className="text-2xl font-serif text-indigo-600 font-semibold">
                          {state.insight?.echoScore ?? (history.length > 0 ? history[history.length - 1].insight.echoScore : '--')}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/><path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m19.07 4.93-1.41 1.41"/><path d="m6.34 17.66-1.41 1.41"/></svg>
                      </div>
                    </div>
                    
                    <div className="bg-white/60 p-4 rounded-2xl border border-white shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Consistency Score</p>
                        <p className="text-2xl font-serif text-emerald-600 font-semibold">{mindPoints}</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 12L2 9Z"/><path d="M11 3 8 9l3 12"/><path d="M13 3l3 6-3 12"/><path d="M2 9h20"/></svg>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-white/40">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-2">Reflective Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {interests.map(i => (
                        <span key={i} className="px-2 py-1 bg-white/50 text-[10px] text-slate-500 rounded-md border border-white/60 uppercase tracking-tighter">{i}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => location.reload()} 
                  className="mt-2 w-full p-4 rounded-2xl text-[10px] text-slate-400 hover:bg-white/40 hover:text-slate-600 transition-all uppercase tracking-[0.2em] font-bold border border-transparent hover:border-white/60"
                >
                  Clear Session
                </button>
              </div>
            </div>

            {/* Analysis Output Section */}
            {(state.insight || state.error) && (
              <div className="w-full max-w-3xl mx-auto">
                <InsightCard insight={state.insight} error={state.error} mindPoints={mindPoints} />
              </div>
            )}

            {/* Cognitive Trend Dashboard Section */}
            {history.length > 0 && (
              <div className="w-full max-w-5xl mx-auto pb-20">
                <CognitiveTrendDashboard history={history} />
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="relative z-10 pb-8 text-center text-slate-300 text-[10px] font-bold tracking-[0.4em] uppercase">
        &copy; {new Date().getFullYear()} MindEcho Labs &bull; Wellness Reimagined
      </footer>
    </div>
  );
};

export default App;

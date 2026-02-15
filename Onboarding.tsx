
import React, { useState } from 'react';
import { Interest } from '../types';

interface OnboardingProps {
  onComplete: (interests: Interest[]) => void;
}

const INTERESTS: Interest[] = [
  'Music', 'Reading', 'Journaling', 'Physical Activity', 
  'Meditation', 'Art', 'Gaming', 'Talking to Friends'
];

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [selected, setSelected] = useState<Interest[]>([]);

  const toggleInterest = (interest: Interest) => {
    if (selected.includes(interest)) {
      setSelected(selected.filter(i => i !== interest));
    } else if (selected.length < 3) {
      setSelected([...selected, interest]);
    }
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 border border-white/60 shadow-2xl animate-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif italic text-slate-800 mb-2">Welcome to your space</h2>
        <p className="text-slate-500 font-light">Select 2-3 activities that bring you comfort.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-10">
        {INTERESTS.map((interest) => {
          const isSelected = selected.includes(interest);
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`p-4 rounded-2xl border transition-all duration-300 text-sm font-medium tracking-wide
                ${isSelected 
                  ? 'bg-purple-100/50 border-purple-300 text-purple-700 shadow-sm ring-2 ring-purple-100' 
                  : 'bg-white/50 border-white/80 text-slate-600 hover:bg-white/80'}`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <button
        disabled={selected.length < 2}
        onClick={() => onComplete(selected)}
        className={`w-full p-5 rounded-3xl font-semibold tracking-widest transition-all duration-500 shadow-md uppercase text-xs
          ${selected.length >= 2 
            ? 'bg-gradient-to-r from-purple-400 to-indigo-400 text-white hover:shadow-xl active:scale-95' 
            : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
      >
        Begin Journey
      </button>
      <p className="text-center text-[10px] text-slate-400 mt-4 uppercase tracking-widest">
        Select at least 2 interests to continue
      </p>
    </div>
  );
};

export default Onboarding;

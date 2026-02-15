
import React, { useState } from 'react';
import { User } from '../types';

interface AuthHeaderProps {
  user: User | null;
  onLogin: (user: User) => void;
}

const AuthHeader: React.FC<AuthHeaderProps> = ({ user, onLogin }) => {
  const [email, setEmail] = useState('');

  const generateUsername = (email: string) => {
    const adjectives = ['Serene', 'Calm', 'Bright', 'Silent', 'Deep', 'Mindful'];
    const nouns = ['Echo', 'Star', 'River', 'Bloom', 'Cloud', 'Spirit'];
    const randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const num = Math.floor(Math.random() * 99);
    return `${randomAdj}${randomNoun}${num}`;
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onLogin({
        email,
        username: generateUsername(email)
      });
    }
  };

  if (user) {
    return (
      <div className="flex items-center justify-between mb-8 p-4 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/40 animate-in fade-in duration-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-200 to-indigo-200 flex items-center justify-center text-indigo-600 font-bold">
            {user.username.charAt(0)}
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-medium">Welcome back</p>
            <p className="text-slate-700 font-semibold">{user.username}</p>
          </div>
        </div>
        <button 
          onClick={() => location.reload()} 
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="mb-8 p-6 bg-white/40 backdrop-blur-md rounded-3xl border border-white/60 shadow-lg shadow-purple-900/5">
      <form onSubmit={handleJoin} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for anonymous access"
            className="w-full p-4 rounded-2xl bg-white/50 border border-white/60 focus:border-purple-200 focus:ring-4 focus:ring-purple-100/30 outline-none transition-all text-slate-700"
            required
          />
        </div>
        <button
          type="submit"
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-400 to-indigo-400 text-white font-medium hover:shadow-lg hover:shadow-purple-200/50 transition-all active:scale-95 whitespace-nowrap"
        >
          Join MindEcho
        </button>
      </form>
    </div>
  );
};

export default AuthHeader;

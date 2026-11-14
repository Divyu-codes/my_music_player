import { useState } from 'react';

export default function TopBar({ searchTerm, onSearchChange, user, onOpenProfile, goBack, goForward, canGoBack, canGoForward }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-md p-4 flex items-center justify-between z-10">
      <div className="flex gap-4">
        {/* Back Button */}
        <button 
          onClick={goBack}
          disabled={!canGoBack}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            canGoBack ? 'bg-black/70 text-white hover:bg-black cursor-pointer' : 'bg-black/30 text-zinc-600 cursor-not-allowed'
          }`}
        >
          ‹
        </button>
        
        {/* Forward Button */}
        <button 
          onClick={goForward}
          disabled={!canGoForward}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
            canGoForward ? 'bg-black/70 text-white hover:bg-black cursor-pointer' : 'bg-black/30 text-zinc-600 cursor-not-allowed'
          }`}
        >
          ›
        </button>
      </div>

      <div className="flex-1 max-w-md mx-8 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
        <input 
          type="text" 
          placeholder="What do you want to play?" 
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full bg-zinc-800 text-white pl-10 pr-4 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-white text-sm"
        />
      </div>

      <div className="relative">
        <div 
          className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <span className="text-sm font-semibold">{user?.username || 'User'}</span>
        </div>

        {showDropdown && (
          <div className="absolute right-0 top-12 bg-zinc-800 rounded-md shadow-xl py-2 w-44 border border-zinc-700 z-50">
            <button 
              onClick={() => { setShowDropdown(false); onOpenProfile(); }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
            >
              👤 Profile
            </button>
            <button 
              onClick={() => { setShowDropdown(false); onOpenProfile(); }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
            >
              📊 Your Activity
            </button>
            <div className="h-px bg-zinc-700 my-1"></div>
            <button 
              onClick={() => { setShowDropdown(false); onOpenProfile(); }}
              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors"
            >
              ⚙️ Settings
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
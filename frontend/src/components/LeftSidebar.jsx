export default function LeftSidebar({ likedSongs, playlists, activeTab, onNavClick, onCreatePlaylist }) {
  return (
    <aside className="w-20 bg-black flex flex-col items-center py-6 gap-6 border-r border-zinc-800">
      <div className="mb-4">
        <img src="/images/logo.png" alt="Musify" className="w-10 h-10" />
      </div>
      
      <nav className="flex flex-col gap-6">
        {/* Home */}
        <button 
          className={`transition-colors ${activeTab === 'home' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
          onClick={() => onNavClick('home')}
          title="Home"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 3L4 9v12h5v-7h6v7h5V9z"/>
          </svg>
        </button>

        {/* Your Library */}
        <button 
          className={`transition-colors ${activeTab === 'library' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
          onClick={() => onNavClick('library')}
          title="Your Library"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
          </svg>
        </button>
      </nav>
      
      <div className="mt-auto flex flex-col gap-6">
        {/* Create Playlist */}
        <button 
          onClick={onCreatePlaylist}
          className="text-zinc-400 hover:text-green-500 transition-colors"
          title="Create Playlist"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </button>

        {/* Liked Songs */}
        <button 
          className={`transition-colors relative ${activeTab === 'liked' ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
          onClick={() => onNavClick('liked')}
          title="Liked Songs"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
          {likedSongs && likedSongs.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-green-500 text-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {likedSongs.length}
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
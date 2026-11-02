export default function Sidebar({ activeTab, onNavClick }) {
  const getNavClass = (tabName) => {
    const base = "flex items-center gap-4 p-3 rounded-md font-semibold cursor-pointer transition-all duration-200 ";
    return activeTab === tabName 
      ? base + "text-white bg-zinc-800" 
      : base + "text-zinc-400 hover:text-white";
  };

  return (
    <aside className="w-64 bg-black p-6 flex flex-col gap-6 h-full shrink-0">
      <div className="text-2xl font-bold text-green-500 px-3 flex items-center gap-2">🎵 Divyu Creation Presents</div>
      
      <nav className="bg-zinc-900 rounded-lg p-2">
        <div className={getNavClass('home')} onClick={() => onNavClick('home')}>
          <span className="text-xl">🏠</span> Home
        </div>
        <div className={getNavClass('search')} onClick={() => onNavClick('search')}>
          <span className="text-xl">🔍</span> Search
        </div>
        <div className={getNavClass('library')} onClick={() => onNavClick('library')}>
          <span className="text-xl">📚</span> Your Library
        </div>
      </nav>

      <div className="bg-zinc-900 rounded-lg p-4 flex-1 overflow-y-auto">
        <div className="flex items-center gap-4 text-zinc-400 px-2 mb-4 font-semibold cursor-pointer hover:text-white transition-colors">
          <span>➕</span> Create Playlist
        </div>
        <div className="flex items-center gap-4 text-zinc-400 px-2 mb-4 font-semibold cursor-pointer hover:text-white transition-colors">
          <span>💚</span> Liked Songs
        </div>
        <div className="h-px bg-zinc-800 my-2"></div>
        {['Chill Vibes', 'Workout Mix', 'Focus Flow', 'Late Night'].map((playlist) => (
          <div key={playlist} className="p-2 text-zinc-400 text-sm cursor-pointer hover:text-white hover:bg-zinc-800 rounded-md transition-colors">
            {playlist}
          </div>
        ))}
      </div>
    </aside>
  );
}
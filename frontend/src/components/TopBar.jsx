export default function TopBar({ searchTerm, onSearchChange }) {
  return (
    <div className="sticky top-0 bg-zinc-900/80 backdrop-blur-md p-4 flex items-center justify-between z-10">
      <div className="flex gap-4">
        <button className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:bg-black">‹</button>
        <button className="w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center cursor-pointer hover:bg-black">›</button>
      </div>
      
      <div className="flex-1 max-w-md mx-8 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
        <input 
          type="text" 
          placeholder="What do you want to play?" 
          value={searchTerm}
          onChange={onSearchChange}
          className="w-full bg-zinc-800 text-white pl-10 pr-4 py-3 rounded-full border-none outline-none focus:ring-2 focus:ring-white transition-all text-sm"
        />
      </div>

      <div className="flex items-center gap-2 bg-black/70 px-3 py-1 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors">
        <div className="w-7 h-7 bg-zinc-700 rounded-full flex items-center justify-center">👤</div>
        <span className="text-sm font-semibold">User</span>
      </div>
    </div>
  );
}
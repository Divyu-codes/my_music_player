export default function Player({ 
  currentSong, isPlaying, onTogglePlay, 
  progress, currentTime, duration, onProgressClick, audioRef,
  onPlayNext, onPlayPrevious // Naya: Props receive kiye
}) {
  if (!currentSong) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800 h-24 px-4 flex items-center justify-between z-50">
      
      {/* Left: Song Info */}
      <div className="flex items-center gap-4 w-[30%] min-w-[180px]">
        <img src={currentSong.cover} alt="cover" className="w-14 h-14 rounded-md object-cover" />
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white hover:underline cursor-pointer">{currentSong.title}</span>
          <span className="text-xs text-zinc-400 hover:text-white hover:underline cursor-pointer">{currentSong.artist}</span>
        </div>
      </div>

      {/* Center: Controls & Progress */}
      <div className="flex flex-col items-center flex-1 max-w-[45%]">
        <div className="flex items-center gap-6 mb-2">
          <button className="text-zinc-400 hover:text-white transition-colors">🔀</button>
          
          {/* Naya: Previous Button Functional */}
          <button onClick={onPlayPrevious} className="text-zinc-400 hover:text-white transition-colors text-xl">⏮</button>
          
          <button 
            onClick={onTogglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          {/* Naya: Next Button Functional */}
          <button onClick={onPlayNext} className="text-zinc-400 hover:text-white transition-colors text-xl">⏭</button>
          
          <button className="text-zinc-400 hover:text-white transition-colors">🔁</button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-zinc-400 w-10 text-right">{currentTime}</span>
          <div 
            className="flex-1 h-1 bg-zinc-600 rounded-full cursor-pointer group"
            onClick={onProgressClick}
          >
            <div 
              className="h-full bg-white group-hover:bg-green-500 rounded-full relative" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md"></div>
            </div>
          </div>
          <span className="text-xs text-zinc-400 w-10">{duration}</span>
        </div>
      </div>

      {/* Right: Volume (Dummy) */}
      <div className="flex items-center justify-end gap-3 w-[30%] min-w-[180px]">
        <button className="text-zinc-400 hover:text-white">🎤</button>
        <button className="text-zinc-400 hover:text-white">📋</button>
        <div className="w-24 h-1 bg-zinc-600 rounded-full cursor-pointer group">
          <div className="h-full bg-white group-hover:bg-green-500 rounded-full w-[70%]"></div>
        </div>
      </div>
    </div>
  );
}
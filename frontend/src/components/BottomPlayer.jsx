export default function BottomPlayer({ 
  currentSong, isPlaying, togglePlay, playNext, playPrevious, 
  progress, currentTime, duration,
  isShuffle, setIsShuffle, isRepeat, setIsRepeat 
}) {
  if (!currentSong) return null;

  const toggleRepeat = () => {
    // 0 = off, 1 = repeat all, 2 = repeat one
    setIsRepeat((isRepeat + 1) % 3);
  };

  const getRepeatIcon = () => {
    if (isRepeat === 0) return '🔁';
    if (isRepeat === 1) return '🔁';
    return '🔂'; // Repeat one
  };

  return (
    <div className="h-20 bg-zinc-900 border-t border-zinc-800 px-4 flex items-center justify-between z-50">
      {/* Left: Song Info */}
      <div className="flex items-center gap-4 w-[30%]">
        <img src={currentSong.cover} alt="cover" className="w-14 h-14 rounded-md object-cover" />
        <div>
          <div className="text-sm font-medium text-white">{currentSong.title}</div>
          <div className="text-xs text-zinc-400">{currentSong.artist}</div>
        </div>
      </div>

      {/* Center: Controls */}
      <div className="flex flex-col items-center flex-1">
        <div className="flex items-center gap-6 mb-2">
          {/* Shuffle Button - Ab Functional */}
          <button 
            onClick={() => setIsShuffle(!isShuffle)}
            className={`transition-colors ${isShuffle ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
            title={isShuffle ? 'Shuffle On' : 'Shuffle Off'}
          >
            🔀
          </button>
          
          {/* Previous Button */}
          <button onClick={playPrevious} className="text-zinc-400 hover:text-white text-xl">⏮</button>
          
          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          
          {/* Next Button */}
          <button onClick={playNext} className="text-zinc-400 hover:text-white text-xl">⏭</button>
          
          {/* Repeat Button - Ab Functional */}
          <button 
            onClick={toggleRepeat}
            className={`transition-colors ${isRepeat > 0 ? 'text-green-500' : 'text-zinc-400 hover:text-white'}`}
            title={isRepeat === 0 ? 'Repeat Off' : isRepeat === 1 ? 'Repeat All' : 'Repeat One'}
          >
            {getRepeatIcon()}
          </button>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-zinc-400 w-8 text-right">{currentTime}</span>
          <div className="flex-1 h-1 bg-zinc-600 rounded-full cursor-pointer">
            <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-xs text-zinc-400 w-8">{duration}</span>
        </div>
      </div>

      {/* Right: Volume */}
      <div className="flex items-center gap-3 w-[30%] justify-end">
        <button className="text-zinc-400 hover:text-white">🎤</button>
        <div className="w-24 h-1 bg-zinc-600 rounded-full">
          <div className="h-full bg-white rounded-full w-[70%]"></div>
        </div>
      </div>
    </div>
  );
}
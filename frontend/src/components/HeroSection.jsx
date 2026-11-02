export default function HeroSection({ currentSong, isPlaying, onTogglePlay }) {
  if (!currentSong) return null;

  return (
    <div className="bg-gradient-to-b from-zinc-700 to-zinc-900 p-8 flex items-end gap-6 min-h-[300px]">
      <img 
        src={currentSong.cover} 
        alt="cover" 
        className="w-52 h-52 shadow-2xl rounded-md object-cover" 
      />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold uppercase tracking-wider">Featured Track</span>
        <h1 className="text-6xl font-black tracking-tight">{currentSong.title}</h1>
        <div className="text-zinc-300 text-sm mt-2">
          <strong className="text-white hover:underline cursor-pointer">{currentSong.artist}</strong> • iTunes Top Hits
        </div>
      </div>
    </div>
  );
}
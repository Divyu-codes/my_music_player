export default function SongCard({ song, isCurrent, onPlay, isLiked, onToggleLike }) {
  return (
    <div 
      onClick={() => onPlay(song)}
      className="bg-zinc-900 p-4 rounded-md hover:bg-zinc-800 transition-all duration-300 cursor-pointer group relative"
    >
      <div className="relative mb-4">
        <img 
          src={song.cover} 
          alt={song.title} 
          className="w-full aspect-square object-cover rounded-md shadow-lg" 
        />
        <button 
          onClick={(e) => {
            e.stopPropagation(); // Card click ko rokta hai taaki sirf play ho
            onPlay(song);
          }}
          className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black text-xl shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 hover:bg-green-400"
        >
          ▶
        </button>
      </div>
      <h3 className="font-bold text-white truncate mb-1">{song.title}</h3>
      <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
      
      {/* Naya: Like Button (Heart) */}
      <button 
        onClick={(e) => {
          e.stopPropagation(); // Card click ko rokta hai
          onToggleLike(song);
        }}
        className="absolute top-2 right-2 bg-black/50 p-2 rounded-full hover:bg-black/80 transition-colors"
      >
        {isLiked ? '💚' : '🤍'}
      </button>
    </div>
  );
}
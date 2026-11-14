export default function RightPanel({ playSong }) {
  // Dummy data jisme ab audio links (src) bhi hain taaki wo chal sakein
  const curatedTracks = [
    { id: 101, title: "Getting Even", artist: "White Lies", duration: "2:02", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", cover: "https://via.placeholder.com/50" },
    { id: 102, title: "Be Your Man", artist: "White Lies", duration: "3:45", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", cover: "https://via.placeholder.com/50" },
    { id: 103, title: "Space I", artist: "White Lies", duration: "4:32", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", cover: "https://via.placeholder.com/50" },
    { id: 104, title: "Tricky To Love", artist: "White Lies", duration: "3:54", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", cover: "https://via.placeholder.com/50" },
    { id: 105, title: "Heaven Wait", artist: "White Lies", duration: "4:05", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", cover: "https://via.placeholder.com/50" },
  ];

  return (
    <aside className="w-80 bg-black border-l border-zinc-800 p-6 overflow-y-auto hidden lg:block">
      {/* Curated Album Section */}
      <div className="mb-6">
        <img 
          src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=300&h=300&fit=crop" 
          alt="Featured Album" 
          className="w-full rounded-lg shadow-2xl mb-4 object-cover aspect-square"
        />
        <div className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Curated Album</div>
        <h2 className="text-2xl font-bold mb-2">Big TV</h2>
        <p className="text-sm text-zinc-400 mb-4">
          Enjoy vivid emotions with this stunning music album. Each track is a story.
        </p>
        <div className="flex items-center gap-4 text-sm text-zinc-400 mb-6">
          <span className="flex items-center gap-1">
            <span className="text-green-500">♥</span> 456k Likes
          </span>
          <span>• 22 Songs</span>
        </div>
      </div>

      {/* Tracklist (Ab Clickable hai) */}
      <div className="space-y-3">
        {curatedTracks.map((track, index) => (
          <div 
            key={track.id} 
            onClick={() => playSong(track)} // Click karne par play hoga
            className="flex items-center gap-3 p-2 hover:bg-zinc-900 rounded-md cursor-pointer transition-colors group"
          >
            <div className="w-8 h-8 bg-zinc-800 rounded flex items-center justify-center text-sm text-zinc-400 group-hover:text-white">
              {index + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate group-hover:text-green-500 transition-colors">{track.title}</div>
              <div className="text-xs text-zinc-400 truncate">{track.artist}</div>
            </div>
            <div className="text-xs text-zinc-400">{track.duration}</div>
          </div>
        ))}
      </div>
    </aside>
  );
}
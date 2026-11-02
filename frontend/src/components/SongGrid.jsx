import SongCard from './SongCard';

export default function SongGrid({ songs, currentSong, onPlaySong, activeTab, searchTerm, likedSongs, onToggleLike }) {
  const getTitle = () => {
    if (activeTab === 'search' && searchTerm) return `Results for "${searchTerm}"`;
    if (activeTab === 'library') return 'Your Library';
    return 'Trending Pop Songs';
  };

  if (activeTab === 'library') {
    return (
      <div className="p-8 text-center text-zinc-400 mt-10">
        <h2 className="text-2xl font-bold mb-4">📚 Your Library</h2>
        <p>Library feature coming soon! Save your favorite songs here.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">{getTitle()}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {songs.map((song) => {
          // Check karna ki kya ye song already liked hai?
          const isLiked = likedSongs.some(s => s.id === song.id);
          
          return (
            <SongCard 
              key={song.id} 
              song={song} 
              isCurrent={currentSong?.id === song.id} 
              onPlay={onPlaySong} 
              isLiked={isLiked}
              onToggleLike={onToggleLike}
            />
          );
        })}
      </div>
    </div>
  );
}
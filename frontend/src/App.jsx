import { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import HeroSection from './components/HeroSection';
import SongGrid from './components/SongGrid';
import Player from './components/Player';

function App() {
  // ===== 1. STATE VARIABLES (Data Store) =====
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Naya: Track karne ke liye kaunsa song chal raha
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  
  // Naya: Liked Songs aur Playlists
  const [likedSongs, setLikedSongs] = useState([]); 
  const [playlists, setPlaylists] = useState([]);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:30');
  
  const audioRef = useRef(null);

  // ===== 2. API & INITIAL LOAD =====
  useEffect(() => {
    fetchSongs('pop');
  }, []);

  const fetchSongs = async (term) => {
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${term}&media=music&limit=20`);
      if (!response.ok) throw new Error('API request failed');
      
      const data = await response.json();
      const formattedSongs = data.results
        .filter(track => track.previewUrl)
        .map(track => ({
          id: track.trackId,
          title: track.trackName,
          artist: track.artistName,
          cover: track.artworkUrl100.replace('100x100', '300x300'),
          src: track.previewUrl
        }));
      
      setSongs(formattedSongs);
      if (formattedSongs.length > 0 && !currentSong) {
        setCurrentSong(formattedSongs[0]);
      }
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  // ===== 3. HANDLERS (Functions) =====
  
  // Song Play karna
  const playSong = (song) => {
    const index = songs.findIndex(s => s.id === song.id);
    setCurrentSongIndex(index !== -1 ? index : 0);
    setCurrentSong(song);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(err => setIsPlaying(false));
      }
    }, 100);
  };

  // Naya: Next Song
  const playNext = () => {
    if (songs.length === 0) return;
    const nextIndex = (currentSongIndex + 1) % songs.length; // Loop mein wapas aane ke liye
    setCurrentSongIndex(nextIndex);
    playSong(songs[nextIndex]);
  };

  // Naya: Previous Song
  const playPrevious = () => {
    if (songs.length === 0) return;
    const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    playSong(songs[prevIndex]);
  };

  // Naya: Like/Unlike Toggle
  const toggleLike = (song) => {
    const isAlreadyLiked = likedSongs.find(s => s.id === song.id);
    if (isAlreadyLiked) {
      setLikedSongs(likedSongs.filter(s => s.id !== song.id)); // Remove
    } else {
      setLikedSongs([...likedSongs, song]); // Add
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(err => console.error(err));
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      if (dur) {
        setProgress((current / dur) * 100);
        setCurrentTime(formatTime(current));
        setDuration(formatTime(dur));
      }
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleProgressClick = (e) => {
    if (!audioRef.current || !currentSong) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    audioRef.current.currentTime = percent * audioRef.current.duration;
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length >= 3) {
      fetchSongs(value);
      setActiveTab('search');
    } else if (value.length === 0) {
      fetchSongs('pop');
      setActiveTab('home');
    }
  };

  const handleNavClick = (tab) => setActiveTab(tab);

  // ===== 4. RENDER (UI) =====
  return (
    <div className="flex h-screen bg-black text-white font-sans overflow-hidden">
      {/* Sidebar ko playlists aur likedSongs bhej rahe hain */}
      <Sidebar 
        activeTab={activeTab} 
        onNavClick={handleNavClick} 
        playlists={playlists} 
        likedSongs={likedSongs} 
      />
      
      <main className="flex-1 bg-gradient-to-b from-zinc-900 to-black overflow-y-auto pb-24 relative">
        <TopBar searchTerm={searchTerm} onSearchChange={handleSearch} />
        
        {activeTab === 'home' && (
          <>
            <HeroSection currentSong={currentSong} isPlaying={isPlaying} onTogglePlay={togglePlay} />
            <div className="px-8 pb-4">
              <button 
                onClick={togglePlay}
                className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black text-2xl shadow-xl hover:scale-105 hover:bg-green-400 transition-all mb-4"
              >
                {isPlaying ? '' : '▶'}
              </button>
            </div>
          </>
        )}
        
        {/* SongGrid ko toggleLike function bhej rahe hain */}
        <SongGrid 
          songs={songs} 
          currentSong={currentSong} 
          onPlaySong={playSong} 
          activeTab={activeTab} 
          searchTerm={searchTerm}
          likedSongs={likedSongs}
          onToggleLike={toggleLike}
        />
      </main>

      {/* Player ko Next/Previous functions bhej rahe hain */}
      <Player 
        currentSong={currentSong}
        isPlaying={isPlaying}
        onTogglePlay={togglePlay}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
        onProgressClick={handleProgressClick}
        audioRef={audioRef}
        onPlayNext={playNext}
        onPlayPrevious={playPrevious}
      />
      
      <audio 
        ref={audioRef}
        src={currentSong?.src}
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext} // Song khatam hone par next bajega
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default App;
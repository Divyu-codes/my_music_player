import { useState, useEffect, useRef } from 'react';
import LeftSidebar from './components/LeftSidebar';
import MainContent from './components/MainContent';
import RightPanel from './components/RightPanel';
import BottomPlayer from './components/BottomPlayer';
import ProfileModal from './components/ProfileModal';
import Login from './components/Login';
import api from './utils/axios';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home');
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:30');

  const audioRef = useRef(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const res = await api.get('/auth/me/');
          setUser(res.data);
          setIsAuthenticated(true);
          fetchUserData();
        } catch (error) {
          localStorage.removeItem('access_token');
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const fetchUserData = async () => {
    try {
      const likedRes = await api.get('/liked-songs/');
      setLikedSongs(likedRes.data);
      const playlistsRes = await api.get('/playlists/');
      setPlaylists(playlistsRes.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const playSong = (song) => {
    setCurrentSong(song);
    setIsPlaying(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.load();
        audioRef.current.play().catch(err => console.error("Play error:", err));
      }
    }, 100);
  };

  const playNext = () => {
    if (songs.length === 0) return;
    const idx = songs.findIndex(s => s.id === currentSong?.id);
    playSong(songs[(idx + 1) % songs.length]);
  };

  const playPrevious = () => {
    if (songs.length === 0) return;
    const idx = songs.findIndex(s => s.id === currentSong?.id);
    playSong(songs[idx === 0 ? songs.length - 1 : idx - 1]);
  };

  const toggleLike = async (song) => {
    const isLiked = likedSongs.find(s => s.song_id === song.id);
    try {
      if (isLiked) {
        await api.delete(`/liked-songs/${song.id}/`);
        setLikedSongs(likedSongs.filter(s => s.song_id !== song.id));
      } else {
        const response = await api.post('/liked-songs/', {
          song_id: song.id, title: song.title, artist: song.artist, cover: song.cover, src: song.src
        });
        setLikedSongs([...likedSongs, response.data]);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  // NAYA: Add to Playlist Function
  const addToPlaylist = async (playlistId, song) => {
    try {
      await api.post(`/playlists/${playlistId}/add-song/`, {
        song_id: song.id,
        title: song.title,
        artist: song.artist,
        cover: song.cover,
        src: song.src
      });
      
      // Local state update karein taaki UI turant reflect kare
      setPlaylists(prev => prev.map(p => 
        p.id === playlistId 
          ? { ...p, songs: [...(p.songs || []), song] } 
          : p
      ));
      alert('Song added to playlist successfully!');
    } catch (error) {
      console.error("Error adding to playlist:", error);
      alert('Failed to add song to playlist.');
    }
  };

  // English Prompt
  const handleCreatePlaylist = async () => {
    const name = prompt('Enter playlist name:');
    if (!name || !name.trim()) return;
    try {
      const response = await api.post('/playlists/', { name: name.trim() });
      setPlaylists([response.data, ...playlists]);
      setActiveTab('library');
      alert(`Playlist "${name}" created successfully!`);
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("Failed to create playlist.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setShowProfile(false);
    setIsAuthenticated(false);
    setUser(null);
    setLikedSongs([]);
    setPlaylists([]);
  };

  const togglePlay = () => {
    if (!audioRef.current || !currentSong) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const curr = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      if (dur) {
        setProgress((curr / dur) * 100);
        setCurrentTime(formatTime(curr));
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

  if (loading) return <div className="flex items-center justify-center h-screen bg-black text-white">Loading...</div>;
  if (!isAuthenticated) return <Login onLoginSuccess={() => { setIsAuthenticated(true); fetchUserData(); }} />;

  return (
    <div className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar 
          likedSongs={likedSongs} 
          playlists={playlists} 
          activeTab={activeTab} 
          onNavClick={setActiveTab}
          onCreatePlaylist={handleCreatePlaylist}
        />
        
        <MainContent 
          activeTab={activeTab}
          songs={songs} 
          setSongs={setSongs} 
          currentSong={currentSong} 
          playSong={playSong}
          likedSongs={likedSongs}
          toggleLike={toggleLike}
          playlists={playlists}
          user={user}
          onOpenProfile={() => setShowProfile(true)}
          addToPlaylist={addToPlaylist} // Naya prop
        />
        
        <RightPanel playSong={playSong} />
      </div>
      
      <BottomPlayer 
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        playNext={playNext}
        playPrevious={playPrevious}
        progress={progress}
        currentTime={currentTime}
        duration={duration}
      />
      
      {showProfile && (
        <ProfileModal 
          user={user}
          likedSongs={likedSongs}
          playlists={playlists}
          onClose={() => setShowProfile(false)}
          onLogout={handleLogout}
        />
      )}

      <audio 
        ref={audioRef} 
        src={currentSong?.src} 
        onTimeUpdate={handleTimeUpdate}
        onEnded={playNext}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}

export default App;
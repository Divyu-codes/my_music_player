import { useState, useEffect } from 'react';
import TopBar from './TopBar';
import SongCard from './SongCard';

export default function MainContent({ activeTab, songs, setSongs, currentSong, playSong, likedSongs, toggleLike, playlists, user, onOpenProfile, addToPlaylist }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [openPlaylist, setOpenPlaylist] = useState(null); // Naya: Kaunsi playlist open hai

    // Jab tab change ho, playlist view band kar do
    useEffect(() => {
        setOpenPlaylist(null);
    }, [activeTab]);

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
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value.length >= 3) fetchSongs(value);
        else if (value.length === 0) fetchSongs('pop');
    };

    const isLiked = (songId) => likedSongs.some(s => s.song_id === songId);

    // ===== PLAYLIST DETAIL VIEW (Naya) =====
    const renderPlaylistDetail = () => {
        const playlistSongs = openPlaylist.songs || [];
        return (
            <>
                {/* Back Button */}
                <div className="p-4">
                    <button 
                        onClick={() => setOpenPlaylist(null)}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors bg-black/40 px-3 py-2 rounded-full"
                    >
                        <span>←</span> Back to Library
                    </button>
                </div>

                {/* Playlist Hero */}
                <div className="bg-gradient-to-b from-indigo-900/60 to-zinc-900 p-8 min-h-[250px] flex items-end gap-6">
                    <div className="w-48 h-48 bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center shadow-2xl rounded-md">
                        <span className="text-6xl">🎵</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase">Playlist</p>
                        <h1 className="text-6xl font-black mb-4">{openPlaylist.name}</h1>
                        <p className="text-zinc-400">{playlistSongs.length} songs</p>
                    </div>
                </div>

                {/* Play All Button */}
                <div className="px-8 py-6 flex items-center gap-6">
                    <button 
                        onClick={() => playlistSongs.length > 0 && playSong({ id: playlistSongs[0].song_id, title: playlistSongs[0].title, artist: playlistSongs[0].artist, cover: playlistSongs[0].cover, src: playlistSongs[0].src })}
                        disabled={playlistSongs.length === 0}
                        className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-black text-2xl shadow-xl hover:scale-105 hover:bg-green-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ▶
                    </button>
                    <button className="text-zinc-400 hover:text-white text-2xl">🔀</button>
                </div>

                {/* Songs Table */}
                <div className="px-8 pb-8">
                    {playlistSongs.length === 0 ? (
                        <div className="text-zinc-400 text-center mt-6 bg-zinc-900/50 p-10 rounded-lg">
                            <p className="text-lg mb-2">This playlist is empty.</p>
                            <p className="text-sm">Go to Home, find a song, and click the '+' button to add it here.</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr className="text-zinc-400 text-sm border-b border-zinc-800">
                                    <th className="text-left py-2 w-8">#</th>
                                    <th className="text-left py-2">Title</th>
                                    <th className="text-left py-2 hidden md:table-cell">Artist</th>
                                    <th className="text-right py-2">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {playlistSongs.map((song, index) => (
                                    <tr 
                                        key={song.id} 
                                        className="group hover:bg-white/5 transition-colors cursor-pointer"
                                        onClick={() => playSong({ id: song.song_id, title: song.title, artist: song.artist, cover: song.cover, src: song.src })}
                                    >
                                        <td className="py-3 text-zinc-400">
                                            <span className="group-hover:hidden">{index + 1}</span>
                                            <span className="hidden group-hover:inline text-white">▶</span>
                                        </td>
                                        <td className="py-3">
                                            <div className="flex items-center gap-3">
                                                <img src={song.cover} alt="" className="w-10 h-10 rounded object-cover" />
                                                <span className="text-white font-medium truncate">{song.title}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 text-zinc-400 hidden md:table-cell">{song.artist}</td>
                                        <td className="py-3 text-zinc-400 text-right">0:30</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </>
        );
    };

    return (
        <main className="flex-1 bg-gradient-to-b from-zinc-900 to-black overflow-y-auto pb-24">
            <TopBar 
                searchTerm={searchTerm} 
                onSearchChange={handleSearch} 
                user={user}
                onOpenProfile={onOpenProfile}
            />

            {/* Agar koi playlist open hai, toh uska detail dikhao */}
            {activeTab === 'library' && openPlaylist ? (
                renderPlaylistDetail()
            ) : (
                <>
                    {activeTab === 'home' && (
                        <>
                            <div className="bg-gradient-to-b from-green-900/50 to-zinc-900 p-8 min-h-[200px] flex items-center justify-center">
                                <div className="text-center">
                                    <h1 className="text-5xl font-bold mb-4">Your wave</h1>
                                    <p className="text-zinc-400">British post-punk</p>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold px-8 mt-4">
                                {searchTerm.length >= 3 ? `Search Results for "${searchTerm}"` : 'Trending Pop Songs'}
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-8">
                                {songs.map((song) => (
                                    <SongCard 
                                        key={song.id} 
                                        song={song} 
                                        playSong={playSong}
                                        isLiked={isLiked(song.id)}
                                        toggleLike={toggleLike}
                                        playlists={playlists}
                                        addToPlaylist={addToPlaylist}
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    {activeTab === 'liked' && (
                        <>
                            <div className="bg-gradient-to-b from-purple-900/50 to-zinc-900 p-8 min-h-[200px] flex items-end gap-6">
                                <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-2xl rounded-md">
                                    <span className="text-6xl">♥</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase">Playlist</p>
                                    <h1 className="text-6xl font-black mb-4">Liked Songs</h1>
                                    <p className="text-zinc-400">{likedSongs.length} songs</p>
                                </div>
                            </div>
                            {likedSongs.length === 0 ? (
                                <div className="p-8 text-zinc-400 text-center mt-10">No liked songs yet. Click the heart icon to add some!</div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-8">
                                    {likedSongs.map((song) => (
                                        <SongCard 
                                            key={song.song_id} 
                                            song={{ id: song.song_id, title: song.title, artist: song.artist, cover: song.cover, src: song.src }} 
                                            playSong={playSong}
                                            isLiked={true}
                                            toggleLike={toggleLike}
                                            playlists={playlists}
                                            addToPlaylist={addToPlaylist}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}

                    {activeTab === 'library' && (
                        <>
                            <div className="bg-gradient-to-b from-blue-900/50 to-zinc-900 p-8 min-h-[200px] flex items-end gap-6">
                                <div className="w-48 h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl rounded-md">
                                    <span className="text-6xl">📚</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase">Collection</p>
                                    <h1 className="text-6xl font-black mb-4">Your Library</h1>
                                    <p className="text-zinc-400">{playlists ? playlists.length : 0} Playlists</p>
                                </div>
                            </div>
                            <div className="p-8">
                                {(!playlists || playlists.length === 0) ? (
                                    <div className="text-zinc-400 text-center mt-10 bg-zinc-900/50 p-10 rounded-lg">
                                        <p className="text-xl mb-2">Your library is empty!</p>
                                        <p className="text-sm">Click the '+' icon in the sidebar to create a new playlist.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                                        {playlists.map((playlist) => (
                                            <div 
                                                key={playlist.id} 
                                                className="bg-zinc-900 p-4 rounded-md hover:bg-zinc-800 transition-all cursor-pointer group"
                                                onClick={() => setOpenPlaylist(playlist)} // Playlist open hoga
                                            >
                                                <div className="relative mb-4">
                                                    <div className="w-full aspect-square bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                                                        <span className="text-4xl">🎵</span>
                                                    </div>
                                                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black text-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                                                        ▶
                                                    </button>
                                                </div>
                                                <h3 className="font-bold text-white truncate mb-1">{playlist.name}</h3>
                                                <p className="text-sm text-zinc-400 truncate">
                                                    {playlist.songs ? playlist.songs.length : 0} Songs
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </>
            )}
        </main>
    );
}
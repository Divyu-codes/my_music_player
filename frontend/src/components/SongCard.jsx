import { useState } from 'react';

export default function SongCard({ song, playSong, isLiked, toggleLike, playlists, addToPlaylist }) {
    const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

    return (
        <div className="bg-zinc-900 p-4 rounded-md hover:bg-zinc-800 transition-all cursor-pointer group relative">
            <div onClick={() => playSong(song)}>
                <div className="relative mb-4">
                    <img src={song.cover} alt={song.title} className="w-full aspect-square object-cover rounded-md shadow-lg" />
                    <button className="absolute bottom-2 right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black text-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                        ▶
                    </button>
                </div>
                <h3 className="font-bold text-white truncate mb-1">{song.title}</h3>
                <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
            </div>

            {/* Action Buttons (Like + Add to Playlist) */}
            <div className="absolute top-2 right-2 flex gap-2">
                {/* Like Button */}
                <button
                    onClick={(e) => { e.stopPropagation(); toggleLike(song); }}
                    className="bg-black/60 p-2 rounded-full hover:scale-110 transition-transform"
                >
                    {isLiked ? <span className="text-green-500 text-lg">♥</span> : <span className="text-white text-lg">♡</span>}
                </button>

                {/* Add to Playlist Button */}
                <div className="relative">
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowPlaylistMenu(!showPlaylistMenu); }}
                        className="bg-black/60 p-2 rounded-full hover:scale-110 transition-transform text-white font-bold"
                        title="Add to Playlist"
                    >
                        +
                    </button>

                    {/* Playlist Dropdown Menu */}
                    {showPlaylistMenu && (
                        <div 
                            className="absolute right-0 top-10 bg-zinc-800 rounded-md shadow-xl py-2 w-48 border border-zinc-700 z-50"
                            onClick={(e) => e.stopPropagation()} // Click ke bahar band na ho
                        >
                            <div className="px-3 py-1 text-xs text-zinc-400 uppercase font-bold border-b border-zinc-700 mb-1">
                                Add to Playlist
                            </div>
                            {(!playlists || playlists.length === 0) ? (
                                <div className="px-4 py-2 text-sm text-zinc-400">No playlists yet</div>
                            ) : (
                                playlists.map((playlist) => (
                                    <button
                                        key={playlist.id}
                                        onClick={() => {
                                            addToPlaylist(playlist.id, song);
                                            setShowPlaylistMenu(false);
                                        }}
                                        className="w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700 transition-colors flex items-center gap-2"
                                    >
                                        <span>🎵</span> {playlist.name}
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
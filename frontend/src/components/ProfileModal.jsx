export default function ProfileModal({ user, likedSongs, playlists, onClose, onLogout }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[200]" onClick={onClose}>
      <div 
        className="bg-zinc-900 rounded-xl p-8 w-96 border border-zinc-700 shadow-2xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-3xl mb-4">
            👤
          </div>
          <h2 className="text-2xl font-bold mb-1">{user?.username || 'User'}</h2>
          <p className="text-zinc-400 text-sm mb-6">Music Enthusiast</p>

          <div className="w-full grid grid-cols-2 gap-4 mb-6">
            <div className="bg-zinc-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{likedSongs?.length || 0}</div>
              <div className="text-xs text-zinc-400 uppercase">Liked Songs</div>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-500">{playlists?.length || 0}</div>
              <div className="text-xs text-zinc-400 uppercase">Playlists</div>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="w-full bg-red-500/20 text-red-400 py-3 rounded-lg font-semibold hover:bg-red-500/30 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
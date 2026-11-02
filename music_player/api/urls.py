from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

urlpatterns = [
    # ==========================================
    # 1. AUTHENTICATION URLs (Login & Register)
    # ==========================================
    path('auth/register/', views.register_user, name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'), # Login Token dene ke liye
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'), # Token refresh karne ke liye
    path('auth/me/', views.get_current_user, name='current_user'), # Check karne ke liye ki kaun login hai

    # ==========================================
    # 2. LIKED SONGS URLs
    # ==========================================
    path('liked-songs/', views.liked_songs_list, name='liked_songs_list'),
    path('liked-songs/<int:song_id>/', views.remove_liked_song, name='remove_liked_song'),
    
    # ==========================================
    # 3. PLAYLISTS URLs
    # ==========================================
    path('playlists/', views.playlists_list, name='playlists_list'),
    path('playlists/<int:playlist_id>/add-song/', views.add_song_to_playlist, name='add_song_to_playlist'),
]
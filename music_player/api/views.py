from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .models import LikedSong, Playlist, PlaylistSong
from .serializers import LikedSongSerializer, PlaylistSerializer, PlaylistSongSerializer


# ==========================================
# 1. AUTHENTICATION (Register & Login)
# ==========================================

@api_view(['POST'])
def register_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response({"error": "Username and password required"}, status=status.HTTP_400_BAD_REQUEST)
        
    if User.objects.filter(username=username).exists():
        return Response({"error": "User already exists"}, status=status.HTTP_400_BAD_REQUEST)
        
    # User create karna (password ko secure hash mein convert karke)
    user = User.objects.create(username=username, password=make_password(password))
    return Response({"message": "User created successfully", "user_id": user.id}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    return Response({
        "id": request.user.id,
        "username": request.user.username
    })


# ==========================================
# 2. LIKED SONGS (Like/Unlike)
# ==========================================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def liked_songs_list(request):
    user = request.user 
    
    if request.method == 'GET':
        songs = LikedSong.objects.filter(user=user).order_by('-added_at')
        serializer = LikedSongSerializer(songs, many=True)
        return Response(serializer.data)
        

    elif request.method == 'POST':
        song_id = request.data.get('song_id')
        if LikedSong.objects.filter(user=user, song_id=song_id).exists():
            return Response({"message": "Song already liked"}, status=status.HTTP_400_BAD_REQUEST)
            
        serializer = LikedSongSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_liked_song(request, song_id):
    user = request.user
    try:
        song = LikedSong.objects.get(user=user, song_id=song_id)
        song.delete()
        return Response({"message": "Song removed from liked"}, status=status.HTTP_204_NO_CONTENT)
    except LikedSong.DoesNotExist:
        return Response({"error": "Song not found"}, status=status.HTTP_404_NOT_FOUND)


# ==========================================
# 3. PLAYLISTS (Create & Add Songs)
# ==========================================

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def playlists_list(request):
    user = request.user
    
    # GET: User ki saari playlists dikhana
    if request.method == 'GET':
        playlists = Playlist.objects.filter(user=user).order_by('-created_at')
        serializer = PlaylistSerializer(playlists, many=True)
        return Response(serializer.data)
        
    # POST: Nayi playlist banana
    elif request.method == 'POST':
        serializer = PlaylistSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_song_to_playlist(request, playlist_id):
    user = request.user
    try:
        playlist = Playlist.objects.get(id=playlist_id, user=user)
    except Playlist.DoesNotExist:
        return Response({"error": "Playlist not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PlaylistSongSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(playlist=playlist)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
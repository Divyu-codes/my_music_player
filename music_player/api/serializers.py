from rest_framework import serializers
from .models import LikedSong, Playlist, PlaylistSong

# Liked Song ka Serializer
class LikedSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = LikedSong
        fields = ['id', 'song_id', 'title', 'artist', 'cover', 'src', 'added_at']

# Playlist ke andar ke songs ka Serializer
class PlaylistSongSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlaylistSong
        fields = ['id', 'song_id', 'title', 'artist', 'cover', 'src']

# Playlist ka Serializer (Isme songs bhi dikhayenge)
class PlaylistSerializer(serializers.ModelSerializer):
    songs = PlaylistSongSerializer(many=True, read_only=True)

    class Meta:
        model = Playlist
        fields = ['id', 'name', 'created_at', 'songs']
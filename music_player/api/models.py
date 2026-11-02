from django.db import models
from django.contrib.auth.models import User

# Ye model humare paas pehle se tha (Optional - agar aap khud ke songs upload karna chahein)
class Song(models.Model):
    title = models.CharField(max_length=100)
    artist = models.CharField(max_length=100)
    audio_file = models.FileField(upload_to='songs/', blank=True, null=True)
    cover_image = models.ImageField(upload_to='covers/', blank=True, null=True)
    
    def __str__(self):
        return self.title

# NAYA: Liked Songs Model (Jab user kisi song ko like karega)
class LikedSong(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Kaunsa user
    song_id = models.IntegerField()  # iTunes API ka song ID
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    cover = models.URLField()  # Cover image ka URL
    src = models.URLField()  # Audio file ka URL
    added_at = models.DateTimeField(auto_now_add=True)  # Kab like kiya
    
    class Meta:
        unique_together = ('user', 'song_id')  # Ek user ek song ko ek hi baar like kar sakta hai
    
    def __str__(self):
        return f"{self.user.username} - {self.title}"

# NAYA: Playlist Model (Jab user playlist banata hai)
class Playlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Kaunsa user
    name = models.CharField(max_length=100)  # Playlist ka naam (e.g., "Chill Vibes")
    created_at = models.DateTimeField(auto_now_add=True)  # Kab banayi
    
    def __str__(self):
        return f"{self.user.username}'s {self.name}"

# NAYA: Playlist ke andar ke Songs
class PlaylistSong(models.Model):
    playlist = models.ForeignKey(Playlist, related_name='songs', on_delete=models.CASCADE)  # Kaunsi playlist
    song_id = models.IntegerField()  # iTunes API ka song ID
    title = models.CharField(max_length=255)
    artist = models.CharField(max_length=255)
    cover = models.URLField()
    src = models.URLField()
    added_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.playlist.name} - {self.title}"
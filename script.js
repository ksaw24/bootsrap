// Select elements
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const songTitleEl = document.getElementById('song-title');
const songArtistEl = document.getElementById('song-artist');
const albumArtEl = document.getElementById('album-art');

// Sample playlist (array of objects)
const playlist = [
    {
        title: 'Headlines',
        artist: 'Drake',
        src: 'headlines.mp3',
        art : 'takecare.jpg'
    },
    {
        title: 'cameras/ good ones go interlude',
        artist: 'Drake',
        src: 'cameras.mp3',  
        art : 'takecare.jpg'
    },
    {
        title: 'lord knows',
        artist: 'Drake',
        src: 'lordknows.mp3',  
        art : 'takecare.jpg'
    },
    {
        title: 'over my dead body',
        artist: 'Drake',
        src: 'omdb.mp3',  
        art : 'takecare.jpg'
    },
    {
        title: 'practice',
        artist: 'Drake',
        src: 'practice.mp3',  
        art : 'takecare.jpg'
    },
   


];

let currentSongIndex = 0;

// Load the first song
function loadSong(index) {
    const song = playlist[index];
    audioPlayer.src = song.src;
    songTitleEl.textContent = song.title;
    songArtistEl.textContent = song.artist;
    albumArtEl.src = song.art;
    audioPlayer.load();  // Load the audio
}

// Update progress bar and time
function updateProgress() {
    const { currentTime, duration } = audioPlayer;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressBar.setAttribute('aria-valuenow', progressPercent);

    // Format time
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

// Event listeners
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';  // Change to pause icon
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>';  // Change to play icon
    }
});

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';
});

audioPlayer.addEventListener('timeupdate', updateProgress);
audioPlayer.addEventListener('ended', () => {
    nextBtn.click();  // Auto-play next song
});

audioPlayer.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audioPlayer.duration);
});

volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Initial load
loadSong(currentSongIndex);
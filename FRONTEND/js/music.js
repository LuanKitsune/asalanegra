// Music Manager - Sistema escalável de músicas de fundo
const MusicManager = {
    tracks: [
        {
            id: 'bayu',
            title: 'Bayu Bayushki Bayu',
            path: '../sounds/bayu_bayushki_bayu.mpeg',
            volume: 0.5
        }
        // Futuras músicas podem ser adicionadas aqui
    ],
    currentTrack: null,
    audioElement: null,
    
    init: function() {
        this.audioElement = document.getElementById('backgroundMusic');
        if (!this.audioElement) {
            this.audioElement = document.createElement('audio');
            this.audioElement.id = 'backgroundMusic';
            this.audioElement.loop = true;
            document.body.appendChild(this.audioElement);
        }
        
        // Carrega a primeira música por padrão
        this.loadTrack('bayu');
        
        // Restaura o estado da música se existir no localStorage
        this.restorePlaybackState();
    },
    
    loadTrack: function(trackId) {
        const track = this.tracks.find(t => t.id === trackId);
        if (!track) return;
        
        this.currentTrack = track;
        this.audioElement.src = track.path;
        this.audioElement.volume = track.volume;
        
        // Salva a música atual no localStorage
        localStorage.setItem('currentTrack', trackId);
    },
    
    play: function() {
        if (this.audioElement.paused) {
            this.audioElement.play().catch(e => console.log('Autoplay prevented:', e));
            localStorage.setItem('musicPlaying', 'true');
        }
    },
    
    pause: function() {
        this.audioElement.pause();
        localStorage.setItem('musicPlaying', 'false');
    },
    
    togglePlayback: function() {
        if (this.audioElement.paused) {
            this.play();
        } else {
            this.pause();
        }
    },
    
    setVolume: function(volume) {
        if (this.audioElement) {
            this.audioElement.volume = volume;
            if (this.currentTrack) {
                this.currentTrack.volume = volume;
            }
            localStorage.setItem('musicVolume', volume);
        }
    },
    
    restorePlaybackState: function() {
        const savedTrack = localStorage.getItem('currentTrack');
        const isPlaying = localStorage.getItem('musicPlaying') === 'true';
        const savedVolume = parseFloat(localStorage.getItem('musicVolume'));
        
        if (savedTrack) this.loadTrack(savedTrack);
        if (!isNaN(savedVolume)) this.setVolume(savedVolume);
        if (isPlaying) this.play();
    },
    
    // Método para adicionar novas músicas dinamicamente
    addTrack: function(trackData) {
        this.tracks.push(trackData);
    }
};
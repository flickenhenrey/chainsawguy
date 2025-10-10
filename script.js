// ADD YOUR EPISODES HERE
// Upload videos to catbox.moe and paste the direct links here
const episodesList = [
    { number: 1, name: 'DOG & CHAINSAW', file: 'https://files.catbox.moe/f4bo3s.mp4' },
    { number: 2, name: 'ARRIVAL IN TOKYO', file: 'https://files.catbox.moe/racwx7.mp4' },
    { number: 3, name: 'MEOWYS WHEREABOUTS', file: 'https://files.catbox.moe/yiy0f8.mp4' },
    { number: 4, name: 'RESCUE', file: 'https://files.catbox.moe/pja70n.mp4' },
    { number: 5, name: 'GUN DEVIL', file: 'https://files.catbox.moe/rokxof.mp4' },
    { number: 6, name: 'KILL DENJI', file: 'https://files.catbox.moe/dkj5vx.mp4' },
    // { number: 7, name: 'EPISODE 7', file: 'https://files.catbox.moe/placeholder7.mp4' },
    // { number: 8, name: 'EPISODE 8', file: 'https://files.catbox.moe/placeholder8.mp4' },
    // { number: 9, name: 'EPISODE 9', file: 'https://files.catbox.moe/placeholder9.mp4' },
    // { number: 10, name: 'EPISODE 10', file: 'https://files.catbox.moe/placeholder10.mp4' },
    // { number: 11, name: 'EPISODE 11', file: 'https://files.catbox.moe/placeholder11.mp4' },
    // { number: 12, name: 'EPISODE 12', file: 'https://files.catbox.moe/placeholder12.mp4' }
];

const videoPlayer = document.getElementById('video-player');
const currentEpisodeTitle = document.getElementById('current-episode');
const episodesListEl = document.getElementById('episodes-list');
const episodeCount = document.getElementById('episode-count');

let episodes = [];
let currentEpisodeIndex = 0;

function loadEpisodes() {
    episodes = episodesList.map(ep => ({
        number: ep.number,
        name: ep.name,
        path: ep.file,
        file: ep.file
    }));
    
    renderEpisodes();
    updateEpisodeCount();
    
    if (episodes.length > 0) {
        playEpisode(episodes[0], 0);
    }
}

function renderEpisodes() {
    episodesListEl.innerHTML = '';

    if (episodes.length === 0) {
        episodesListEl.innerHTML = '<p style="color: #aaa; text-align: center; grid-column: 1/-1;">No episodes found</p>';
        return;
    }

    episodes.forEach((episode, index) => {
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.innerHTML = `
            <div class="episode-number">Episode ${episode.number}</div>
            <div class="episode-name">${episode.name}</div>
        `;
        card.addEventListener('click', () => playEpisode(episode, index));
        episodesListEl.appendChild(card);
    });
}

function playEpisode(episode, index) {
    videoPlayer.src = episode.path;
    videoPlayer.load();
    videoPlayer.play();
    currentEpisodeTitle.textContent = `Episode ${episode.number}: ${episode.name}`;
    currentEpisodeIndex = index;

    const cards = document.querySelectorAll('.episode-card');
    cards.forEach(card => card.classList.remove('active'));
    if (cards[index]) {
        cards[index].classList.add('active');
    }
}

function updateEpisodeCount() {
    episodeCount.textContent = `Episodes: ${episodes.length}`;
}

videoPlayer.addEventListener('ended', () => {
    if (currentEpisodeIndex < episodes.length - 1) {
        playEpisode(episodes[currentEpisodeIndex + 1], currentEpisodeIndex + 1);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentEpisodeIndex > 0) {
        playEpisode(episodes[currentEpisodeIndex - 1], currentEpisodeIndex - 1);
    } else if (e.key === 'ArrowRight' && currentEpisodeIndex < episodes.length - 1) {
        playEpisode(episodes[currentEpisodeIndex + 1], currentEpisodeIndex + 1);
    }
});

loadEpisodes();

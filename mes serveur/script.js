// Server Data
const servers = {
    'survie': {
        title: "Raylix Survie",
        badge: "Survie",
        desc: "L'expérience survie ultime avec claim, métiers et économie joueurs. Rejoignez une communauté active et construisez votre empire en toute sécurité.",
        ip: "play.raylix.fr",
        status: "online",
        bg: "serv1bg.jpg",
        cardBg: "serv1.jpg", // Image pour la vignette
        features: ["Métiers", "Land Claims", "Économie", "Shop Joueur"],
        color: "var(--primary-green)"
    },
    'faction': {
        title: "Raylix Faction",
        badge: "Faction",
        desc: "Guerre, pillage et domination. Créez votre faction, construisez votre base imprenable et partez à la conquête du serveur. PVP actif.",
        ip: "faction.raylix.fr",
        status: "online",
        bg: "serv2bg.jpg",
        cardBg: "serv2.jpg", // Image pour la vignette
        features: ["PVP Fluide", "Classements", "Events KOTH", "TNT"],
        color: "#ff4757"
    },
    'skyblock': {
        title: "Raylix Skyblock",
        badge: "Skyblock",
        desc: "Partez de rien sur une île flottante. Développez vos fermes, complétez des challenges et devenez le joueur le plus riche du serveur.",
        ip: "sky.raylix.fr",
        status: "online",
        bg: "serv3bg.jpg",
        cardBg: "serv3.jpg", // Image pour la vignette
        features: ["Minions", "Upgrades Île", "Market", "Challenges"],
        color: "#4daaf2"
    },
    'creative': {
        title: "Raylix Créatif",
        badge: "Créatif",
        desc: "Un monde plat infini avec des parcelles géantes (100x100). WorldEdit disponible pour tous via vote. Exprimez votre créativité.",
        ip: "creative.raylix.fr",
        status: "offline",
        bg: "serv4bg.jpg",
        cardBg: "serv4.jpg", // Image pour la vignette
        features: ["Plots 100x100", "WorldEdit", "Head Database", "Concours"],
        color: "#ffa502"
    },
    'event': {
        title: "Raylix Event",
        badge: "Event",
        desc: "Le serveur dédié à nos événements communautaires. UHC, Hunger Games, Splatoon, et bien plus encore chaque semaine !",
        ip: "event.raylix.fr",
        status: "online",
        bg: "serv5bg.jpg",
        cardBg: "serv5.jpg", // Image pour la vignette
        features: ["Host Privé", "Jeux Inédits", "Récompenses", "Fun"],
        color: "#a55eea"
    }
};

function selectServer(key, cardElement) {
    // Update Active Card Visuals
    document.querySelectorAll('.server-card').forEach(el => el.classList.remove('active'));
    if (cardElement) cardElement.classList.add('active');

    // Update Master Display
    const s = servers[key];
    const display = document.getElementById('active-display');
    const bg = document.getElementById('display-bg');

    // Text Content
    document.getElementById('display-title').innerText = s.title;
    document.getElementById('display-desc').innerText = s.desc;
    document.getElementById('display-ip').innerText = s.ip;

    // Badge & Color
    const badge = document.getElementById('display-badge');
    badge.innerText = s.badge;
    badge.style.backgroundColor = s.color;

    // Features
    const featureList = document.getElementById('display-features');
    featureList.innerHTML = '';
    s.features.forEach(f => {
        featureList.innerHTML += `<span><i class="fas fa-check"></i> ${f}</span>`;
    });

    // Status
    const statusEl = document.getElementById('display-status');
    if (s.status === 'online') {
        statusEl.innerHTML = '<span class="dot"></span> En ligne';
        statusEl.className = 'status-pill status-online';
    } else {
        statusEl.innerHTML = '<span class="dot"></span> Maintenance';
        statusEl.className = 'status-pill status-offline';
    }

    // Background Image Transition
    bg.style.opacity = 0; // Fade out
    setTimeout(() => {
        bg.style.backgroundImage = `url('${s.bg}')`;
        bg.style.opacity = 0.6; // Fade in
    }, 200);

    // Scroll to top of display on mobile if needed
    if (display && window.innerWidth < 900) {
        display.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Generate Carousel Cards
function initCarousel() {
    const carousel = document.querySelector('.servers-carousel');
    if (!carousel) return;

    carousel.innerHTML = ''; // Clean start

    let isFirst = true;

    for (const [key, server] of Object.entries(servers)) {
        const card = document.createElement('div');
        card.className = `server-card ${isFirst ? 'active' : ''}`;
        card.onclick = () => selectServer(key, card);

        const header = document.createElement('div');
        header.className = 'server-header';
        header.style.backgroundImage = `url('${server.cardBg || server.bg}')`;

        const info = document.createElement('div');
        info.className = 'server-mini-info';

        const title = document.createElement('h4');
        title.innerText = server.badge;

        info.appendChild(title);
        card.appendChild(header);
        card.appendChild(info);

        carousel.appendChild(card);

        if (isFirst) {
            // Initial Select without scroll
            selectServer(key, card);
            isFirst = false;
        }
    }
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', initCarousel);


// Copy IP
function copyMainIP() {
    const ip = document.getElementById('display-ip').innerText;
    const btn = document.querySelector('.big-ip-btn');
    const originalHTML = btn.innerHTML;

    navigator.clipboard.writeText(ip).then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Copié !';
        btn.style.background = "#4fffa8";
        btn.style.color = "#1a1a1a";

        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = "";
            btn.style.color = "";
        }, 2000);
    });
}

// Scroll Logic
const carousel = document.querySelector('.servers-carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (carousel && prevBtn && nextBtn) {
    nextBtn.addEventListener('click', () => { carousel.scrollBy({ left: 200, behavior: 'smooth' }); });
    prevBtn.addEventListener('click', () => { carousel.scrollBy({ left: -200, behavior: 'smooth' }); });
}

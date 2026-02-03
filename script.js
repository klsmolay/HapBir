/* --- Configuration --- */
const CONFIG = {
    message: "To the most amazing girl. ✨ The world is brighter with you in it. I hope your day is as beautiful as your smile. Happy Birthday!💖 and yes thoses eye are mine ohh sorry the girl itself is mine😁",
    heartsToWin: 5,
    photos: [
        "./img/1.jpg", "./img/2.jpg", "./img/3.jpg", 
        "./img/4.png", "./img/5.jpg", "./img/6.jpg"
    ],
reasons: [
        "Your smile makes my day.", "You are my safe place.",
        "The way you look at me.", "You tolerate my bad jokes.",
        "Your kindness to everyone.", "How cute you look when angry.",
        "You are my best friend.", "Your voice heals me.",
        "We are perfect together.", "You make me a better person.",
        "The way you say my name.", "Your laugh is my favorite sound.",
        "You always believe in me.", "You give the best hugs even though you are the only person i have hug.",
        "How much you care about us.", "You are the most beautiful girl, my girl.",
        "Your silly side, nautanki, nakharey ....", "The way you play with my hair.",
        "You understand me without words.", "You are my happy place.",
        "I love your, no reason needed.", "You are my princess.",
        "How you handle my irritation.", "You are my cutie pie.",
        "Your come in my dream.", "I want to eat you.",
        "You inspire me.", "Your morning texts.",
        "How you listen to my words.", "You are my lucky charm.",
        "The way you hold my hand.", "You are incredibly smart.",
        "Your passion for things you love.", "You make boring days fun.",
        "I love making memories with you.", "You are my dream come true.",
        "How you cheer me up.", "Your confidence.",
        "You have the purest heart.", "I love your drama (sometimes😂).",
        "You are worth every effort.", "How we can talk for hours.",
        "The way you support my dreams.", "You are my sunshine.",
        "I love annoying you.", "Your patience with me.",
        "How you take care of me.", "You are simply adorable.",
        "I love your scent.", "You make me feel loved.",
        "You are my forever.", "Your ocean like eyes.",
        "Love how i prank you.", "You are my home.",
        "I love your honesty.", "You make my heart race.",
        "I want to grow old with you.", "You are my motivation.",
        "Your cute texting habits.", "You are my Gudiya.",
        "How strong you are.", "I love your chicks, want to kiss them.",
        "You complete me.", "Every moment with you is magic.",
        "I want to fight with you (WWE💪).", "You are my everything.",
        "How you scold me.", "Your innocence.",
        "You make the world beautiful.", "I love watching you sleep.",
        "You are the reason I smile.", "Your unconditional love.",
        "I love how little you are.", "You are my greatest gift.",
        "How you make me feel strong.", "want to cuddle.",
        "I love your cooking (trying to do 😂).", "You are my soulmate.",
        "How you blush.", "I love stealing glances at you.",
        "You make problems disappear.", "I love eye contact compition with you (i loss every time🥺).",
        "I love our inside jokes.", "Because i am god 😂.",
        "How you irritat me.", "I love your energy.",
        "You are my pride.", "I love showing you off.",
        "You make me want to be better.", "Your loyalty.",
        "Because you are chudail.", "You are my peace.",
        "How you eat food.", "I love your imperfections.",
        "You are my greatest adventure.", "I love your touch.",
        "You are the best thing in my life.", "I love you more than words.",
        "Because you are mine, my girl.", "I choose you, every single day."
    ]
};

// --- PRELOADER ---
CONFIG.photos.forEach(src => { const i = new Image(); i.src = src; });
/* --- Game Logic --- */
let score = 0;
let gameActive = true;
const heartSpawner = document.getElementById('heart-spawner');
const spawnerInterval = setInterval(() => {
    if (!gameActive) return;
    const heart = document.createElement('div');
    heart.classList.add('game-heart');
    heart.innerHTML = ['💗', '💘', '💝'][Math.floor(Math.random()*3)];
    heart.style.left = Math.random() * 80 + 10 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    
    const pop = (e) => {
        e.preventDefault(); e.stopPropagation();
        heart.style.transform = "scale(1.5)"; heart.style.opacity = "0";
        setTimeout(() => heart.remove(), 200);
        score++;
        document.getElementById('progress-fill').style.width = (score/CONFIG.heartsToWin)*100 + '%';
        if (score >= CONFIG.heartsToWin) winGame();
    };
    heart.addEventListener('click', pop);
    heart.addEventListener('touchstart', pop, {passive: false});
    heartSpawner.appendChild(heart);
    setTimeout(() => { if(heart.parentNode) heart.remove(); }, 7000);
}, 800);
document.getElementById('progress-container').style.display = 'block';
function winGame() {
    gameActive = false; clearInterval(spawnerInterval);
    heartSpawner.innerHTML = '';
    document.getElementById('instructions').innerHTML = "Perfect! ✨";
    setTimeout(() => {
        document.getElementById('game-ui').style.display = 'none';
        const card = document.getElementById('main-card');
        card.classList.remove('hidden');
        setTimeout(() => card.classList.add('visible'), 50);
    }, 1000);
}

/* --- Stage Transitions --- */
// 1. Gift -> Envelope
document.getElementById('gift-btn').addEventListener('click', () => {
    spawnBalloons(); 
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    document.getElementById('gift-stage').style.display = 'none';
    const envStage = document.getElementById('envelope-stage');
    envStage.classList.remove('hidden');
    envStage.style.display = 'flex';
});

// 2. Open Envelope
document.getElementById('envelope-btn').addEventListener('click', function() {
    if(this.classList.contains('open')) return;
    this.classList.add('open');
    document.getElementById('env-hint').style.display = 'none';
    setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('opened-letter-content').style.display = 'flex';
        typeWriter(document.getElementById('typewriter-area'), CONFIG.message);
        startSlideshow();
    }, 800);
});

// 3. Letter -> Pinky Promise
document.getElementById('to-promise-btn').addEventListener('click', () => {
    const envStage = document.getElementById('envelope-stage');
    const promiseStage = document.getElementById('promise-stage');
    envStage.style.opacity = 0;
    setTimeout(() => {
        envStage.style.display = 'none';
        promiseStage.style.display = 'flex';
        setTimeout(() => promiseStage.style.opacity = 1, 50);
    }, 500);
});

// 4. Promise Interaction (UPDATED logic)
document.getElementById('promise-hands-btn').addEventListener('click', function() {
    if(this.classList.contains('locked')) return;
    this.classList.add('locked');
    
    // CHANGED: Update Emojis to Crossed Fingers
    const leftHand = this.querySelector('.hand-left');
    const rightHand = this.querySelector('.hand-right');
    leftHand.innerText = '🤞';
    rightHand.innerText = '🤞';
    document.getElementById('promise-msg').classList.remove('hidden');
    confetti({ particleCount: 50, spread: 50 });
    setTimeout(() => {
        document.getElementById('to-cake-btn').classList.remove('hidden');
    }, 1000);
});
// 5. Promise -> Cake
document.getElementById('to-cake-btn').addEventListener('click', () => {
    const promiseStage = document.getElementById('promise-stage');
    const cakeStage = document.getElementById('cake-stage');
    promiseStage.style.opacity = 0;
    setTimeout(() => {
        promiseStage.style.display = 'none';
        cakeStage.style.display = 'flex';
        setTimeout(() => cakeStage.style.opacity = 1, 50);
    }, 500);
});

// 6. Cake -> Scratch Card
document.getElementById('to-scratch-btn').addEventListener('click', () => {
    const cakeStage = document.getElementById('cake-stage');
    const scratchStage = document.getElementById('scratch-stage');
    cakeStage.style.opacity = 0;
    setTimeout(() => {
        cakeStage.style.display = 'none';
        scratchStage.style.display = 'flex';
        initScratchCard();
        setTimeout(() => scratchStage.style.opacity = 1, 50);
    }, 500);
});

/* --- 100 Reasons Logic --- */
const modal = document.getElementById('reason-modal');
const reasonsBtn = document.getElementById('reasons-btn');
const closeBtn = document.getElementsByClassName('close-modal')[0];
const nextReasonBtn = document.getElementById('next-reason-btn');
reasonsBtn.onclick = () => {
    showRandomReason();
    modal.style.display = "flex";
}
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; }
nextReasonBtn.onclick = () => showRandomReason();
function showRandomReason() {
    const randomIdx = Math.floor(Math.random() * CONFIG.reasons.length);
    document.getElementById('reason-text').innerText = CONFIG.reasons[randomIdx];
    document.getElementById('reason-num').innerText = randomIdx + 1;
}

/* --- Helper Functions --- */
// Slideshow - 1.5s transition
function startSlideshow() {
    const img = document.getElementById('slideshow-img');
    let idx = 0;
    img.src = CONFIG.photos[0];
    setInterval(() => {
        img.style.opacity = 0;
        setTimeout(() => {
            idx = (idx + 1) % CONFIG.photos.length;
            img.src = CONFIG.photos[idx];
            img.onload = () => { img.style.opacity = 1; };
            setTimeout(() => { img.style.opacity = 1; }, 50); 
        }, 500); 
    }, 1500);
}

// Typewriter
function typeWriter(el, text, i = 0) {
    if (i < text.length) {
        el.innerHTML += text.charAt(i);
        el.scrollTop = el.scrollHeight;
        setTimeout(() => typeWriter(el, text, i + 1), 40);
    } else {
        setTimeout(() => document.getElementById('to-promise-btn').classList.remove('hidden'), 500);
    }
}

// Balloons
function spawnBalloons() {
    const bg = document.getElementById('balloon-bg');
    const colors = ['#ff9ff3', '#feca57', '#ff6b6b', '#48dbfb'];
    setInterval(() => {
        const b = document.createElement('div');
        b.classList.add('balloon');
        b.style.left = Math.random() * 100 + 'vw';
        b.style.background = colors[Math.floor(Math.random() * colors.length)];
        b.style.animationDuration = (Math.random() * 5 + 5) + 's';
        bg.appendChild(b);
        setTimeout(() => b.remove(), 10000);
    }, 500);
}

// Scratch Card Logic
function initScratchCard() {
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    const container = canvas.parentElement;
    canvas.width = container.offsetWidth; canvas.height = container.offsetHeight;
    ctx.fillStyle = "#dfe6e9"; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#636e72"; ctx.font = "bold 20px Nunito"; ctx.textAlign = "center";
    ctx.fillText("Scratch Here! ❤️", canvas.width/2, canvas.height/2);
    let isDrawing = false;
    
    function scratch(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath(); ctx.arc(x, y, 20, 0, Math.PI * 2); ctx.fill();
        if(Math.random() > 0.95) {
            document.getElementById('final-msg').classList.remove('hidden');
            document.getElementById('reasons-btn').classList.remove('hidden');
        }
    }
    function getPos(e) {
        const rect = canvas.getBoundingClientRect();
        let clientX = e.clientX; let clientY = e.clientY;
        if(e.touches && e.touches[0]) { clientX = e.touches[0].clientX; clientY = e.touches[0].clientY; }
        return { x: clientX - rect.left, y: clientY - rect.top };
    }
    const start = () => isDrawing = true;
    const end = () => isDrawing = false;
    const move = (e) => {
        if(!isDrawing) return; e.preventDefault();
        const pos = getPos(e); scratch(pos.x, pos.y);
    };
    canvas.addEventListener('mousedown', start); canvas.addEventListener('touchstart', start);
    window.addEventListener('mouseup', end); window.addEventListener('touchend', end);
    canvas.addEventListener('mousemove', move); canvas.addEventListener('touchmove', move, {passive: false});
}

// Cake Flame
document.getElementById('flame').addEventListener('click', function() {
    this.classList.add('out');
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
    setTimeout(() => {
        document.getElementById('wished-msg').classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('to-scratch-btn').classList.remove('hidden');
        }, 1000);
    }, 500);
});


const $ = (id) => document.getElementById(id);
const stages = [...document.querySelectorAll('.stage')];

let blowDetected = false;
let balloonTimer = null;
let overlayTimer = null;

function showStage(number) {
  stages.forEach((stage, index) => {
    stage.classList.toggle('active', index === number - 1);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showToast(message, duration = 3000) {
  const toast = $('toast');
  toast.textContent = message;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, duration);
}

// STAGE 1 -> STAGE 2: Open the birthday letter.
$('openLetter').addEventListener('click', () => {
  showStage(2);
});

// STAGE 2 -> STAGE 3: Go directly to the birthday party.
$('openLetter').addEventListener('dblclick', () => {
  // No additional action needed on double-click.
});

// Start the birthday party from the letter stage.
const letter = document.querySelector('#stage2 .letter');

if (letter) {
  const partyButton = document.createElement('button');
  partyButton.className = 'button button-pink italic-bold next-button';
  partyButton.id = 'openParty';
  partyButton.textContent = 'Madam cake cut kar le 🎂';
  letter.closest('.letter-wrap').after(partyButton);

  partyButton.addEventListener('click', () => {
    showStage(3);
    startBalloonRain();

    if (overlayTimer) clearTimeout(overlayTimer);

    overlayTimer = setTimeout(() => {
      $('blowOverlay').classList.remove('hidden');

      overlayTimer = setTimeout(() => {
        $('blowOverlay').classList.add('hidden');
        overlayTimer = null;
      }, 2000);
    }, 450);
  });
}

function startBalloonRain() {
  const layer = $('balloonRain');
  layer.innerHTML = '';

  if (balloonTimer) {
    clearInterval(balloonTimer);
  }

  const balloons = ['🎈', '🎈', '🎈', '💗', '🎈'];

  function drop() {
    const balloon = document.createElement('span');

    balloon.className = 'falling-balloon';
    balloon.textContent =
      balloons[Math.floor(Math.random() * balloons.length)];

    balloon.style.left = `${Math.random() * 96}%`;
    balloon.style.animationDuration = `${4 + Math.random() * 5}s`;

    layer.appendChild(balloon);

    balloon.addEventListener('animationend', () => {
      balloon.remove();
    });
  }

  for (let i = 0; i < 20; i++) {
    setTimeout(drop, i * 100);
  }

  balloonTimer = setInterval(drop, 300);
}

function blowCandles() {
  if (blowDetected) return;

  blowDetected = true;
  $('candles').classList.add('blown');

  showToast('Yay! Happy Birthday Meri Bett(u)! 🎉', 4500);
  burstPartyHearts();
}

function burstPartyHearts() {
  const layer = $('balloonRain');
  const emojis = ['💗', '💖', '💕', '✨', '🎉', '💛'];

  for (let i = 0; i < 32; i++) {
    const item = document.createElement('span');

    item.className = 'falling-balloon';
    item.textContent =
      emojis[Math.floor(Math.random() * emojis.length)];

    item.style.left = `${Math.random() * 95}%`;
    item.style.animationDuration = `${3 + Math.random() * 4}s`;

    layer.appendChild(item);

    item.addEventListener('animationend', () => {
      item.remove();
    });
  }
}

// Blow out the candles.
$('manualBlow').addEventListener('click', blowCandles);

// Restart the surprise.
$('restart').addEventListener('click', () => {
  blowDetected = false;
  $('candles').classList.remove('blown');
  $('balloonRain').innerHTML = '';

  if (balloonTimer) {
    clearInterval(balloonTimer);
    balloonTimer = null;
  }

  if (overlayTimer) {
    clearTimeout(overlayTimer);
    overlayTimer = null;
  }

  $('blowOverlay').classList.add('hidden');
  showStage(1);
});

// Gentle floating hearts on the first page.
const sparkleLayer = $('sparkles');

function addSparkle() {
  const s = document.createElement('span');

  s.textContent = ['♡', '♥', '✦', '💗'][
    Math.floor(Math.random() * 4)
  ];

  s.style.cssText = `
    position: fixed;
    left: ${Math.random() * 100}%;
    top: ${100 + Math.random() * 20}vh;
    color: #ff8bb9;
    opacity: .7;
    font-size: ${12 + Math.random() * 20}px;
    pointer-events: none;
    z-index: 0;
    animation: riseSparkle ${7 + Math.random() * 7}s linear forwards;
  `;

  sparkleLayer.appendChild(s);

  setTimeout(() => s.remove(), 15000);
}

const style = document.createElement('style');

style.textContent = `
  @keyframes riseSparkle {
    to {
      transform: translateY(-125vh) rotate(35deg);
      opacity: 0;
    }
  }
`;

document.head.appendChild(style);

for (let i = 0; i < 16; i++) {
  setTimeout(addSparkle, i * 300);
}

setInterval(addSparkle, 900);

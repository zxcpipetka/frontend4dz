import { alert, notice, info, success, error } from 'https://unpkg.com/@pnotify/core/dist/PNotify.js';

// ======= Game: "Press the correct key" =======
const keys = [
  'a', 's', 'd', 'f', 'j', 'k', 'l', 'q', 'w', 'e'
];
let currentKeyIndex = 0;

const $key = document.getElementById('key');
const $status = document.getElementById('status');
const $newGameBtn = document.getElementById('newGame');
const $showKeysBtn = document.getElementById('showKeys');

function setCurrentKey(index) {
  currentKeyIndex = index % keys.length;
  $key.textContent = keys[currentKeyIndex].toUpperCase();
  $status.textContent = 'Гра триває';
}

function startNewGame() {
  const idx = Math.floor(Math.random() * keys.length);
  setCurrentKey(idx);
  success({ text: 'Нова гра — починаємо! Клавіша: ' + keys[currentKeyIndex].toUpperCase(), delay: 1400 });
}

// events
function handleKeydown(e) {
  const pressed = e.key.toLowerCase();
  // only consider single character keys (ignore modifier keys)
  if (!pressed || pressed.length !== 1) return;

  if (pressed === keys[currentKeyIndex]) {
    success({ text: 'Правильно! 🎉' });
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
    $key.textContent = keys[currentKeyIndex].toUpperCase();
    // small success update
    $status.textContent = 'Правильно! Чекаємо наступну клавішу.';
  } else {
    error({ text: `Невірна клавіша — ти натиснув "${pressed.toUpperCase()}". Спробуй ще.` });
    $status.textContent = 'Невірно — спробуй ще.';
  }
}

function handleKeypress(e) {
  // prevent default behaviour (e.g., scrolling) during gameplay
  e.preventDefault();
}

// wire events
window.addEventListener('keydown', handleKeydown);
window.addEventListener('keypress', handleKeypress);
$newGameBtn.addEventListener('click', startNewGame);
$showKeysBtn.addEventListener('click', () => {
  info({ text: 'Доступні клавіші: ' + keys.map(k => k.toUpperCase()).join(', '), delay: 2500 });
});

// start initial game
setCurrentKey(0);

// ======= Chart: sales chart (Chart.js) =======
const chartData = {
  labels: [
    '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30'
  ],
  datasets: [
    {
      label: 'Продажі за останній місяць',
      data: [150,220,180,200,250,300,280,350,400,380,420,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300,1350],
      backgroundColor: 'rgba(33,150,243,0.15)',
      borderColor: '#2196f3',
      borderWidth: 2,
      pointRadius: 3,
      pointBackgroundColor: '#fff',
      pointBorderColor: '#2196f3',
      tension: 0.35
    }
  ]
};

function createSalesChart() {
  const ctx = document.getElementById('sales-chart').getContext('2d');
  /* global Chart */
  new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        legend: { display: true, position: 'top' }
      },
      scales: {
        x: { title: { display: true, text: 'День місяця' } },
        y: { title: { display: true, text: 'Продажі' }, beginAtZero: true }
      }
    }
  });
}

createSalesChart();

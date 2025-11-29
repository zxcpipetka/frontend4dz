import { greet } from './modules/greet.js';
import { formatMessage } from './modules/format.js';

const nameEl = document.getElementById('name');
const input = document.getElementById('nameInput');
const button = document.getElementById('greet');
const message = document.getElementById('message');

button.addEventListener('click', () => {
  const val = (input.value || 'Гість').trim();
  nameEl.textContent = val;
  const msg = greet(val);
  message.textContent = formatMessage(msg);
});

// HMR-friendly initialisation (Parcel dev)
if (import.meta.hot) {
  import.meta.hot.accept();
}

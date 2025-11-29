import Handlebars from 'handlebars';
import templateSource from './template.hbs?raw';
import { products as initialProducts } from '../../parcel-hbs/data.js';

const appRoot = document.getElementById('products-app');
let products = JSON.parse(JSON.stringify(initialProducts)); // keep in-memory copy
let filterText = '';

const template = Handlebars.compile(templateSource);

function render() {
  const filtered = products.filter(p => p.name.toLowerCase().includes(filterText.toLowerCase()));
  appRoot.innerHTML = template({ products: filtered });
  attachEvents();
}

function attachEvents() {
  const searchInput = document.getElementById('search');
  if (searchInput) {
    // debounce simple (very small)
    let t;
    searchInput.removeEventListener('input', onSearchInput);
    searchInput.addEventListener('input', onSearchInput);
    function onSearchInput(e) {
      clearTimeout(t);
      t = setTimeout(() => {
        filterText = e.target.value;
        render();
      }, 150);
    }
  }
  const addBtn = document.getElementById('add-product');
  const resetBtn = document.getElementById('reset');
  const nameInput = document.getElementById('p-name');
  const priceInput = document.getElementById('p-price');
  const descInput = document.getElementById('p-desc');

  // Add
  addBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const price = Number(priceInput.value) || 0;
    const desc = descInput.value.trim();

    if (!name) {
      alert('Вкажіть назву продукту');
      return;
    }

    const maxId = products.length ? Math.max(...products.map(p => p.id)) : 0;
    const newProduct = { id: maxId + 1, name, price, description: desc };
    products.push(newProduct);
    render();
  });

  // Reset form
  resetBtn.addEventListener('click', () => {
    nameInput.value = '';
    priceInput.value = '';
    descInput.value = '';
  });

  // Delete buttons
  document.querySelectorAll('button[data-action="delete"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = Number(btn.dataset.id);
      products = products.filter(p => p.id !== id);
      render();
    });
  });
}

// render initial
render();

// export for testing/next-week improvements
export { products };

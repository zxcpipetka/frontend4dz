// Bookmarks app (localStorage)
const bookmarkInput = document.getElementById('bookmarkInput');
const addBookmarkBtn = document.getElementById('addBookmarkBtn');
const bookmarkList = document.getElementById('bookmarkList');
const clearBookmarksBtn = document.getElementById('clearBookmarksBtn');

const BOOKMARKS_KEY = 'bookmarks_v1';

function loadBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveBookmarks(items) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(items));
}

let bookmarks = loadBookmarks();

function renderBookmarks() {
  bookmarkList.innerHTML = '';
  if (!bookmarks.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'Закладок поки що немає';
    bookmarkList.appendChild(li);
    return;
  }

  bookmarks.forEach(b => {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.href = b.url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = b.url;

    const actions = document.createElement('div');
    actions.className = 'bookmark-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Редагувати';
    editBtn.className = 'small';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.className = 'delete small';

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(link);
    li.appendChild(actions);

    bookmarkList.appendChild(li);

    editBtn.addEventListener('click', () => onEdit(b.id, li));
    deleteBtn.addEventListener('click', () => onDelete(b.id));
  });
}

function normalizeUrl(url) {
  if (!url) return '';
  // add protocol if missing
  if (!/^https?:\/\//i.test(url)) return 'https://' + url;
  return url;
}

function onAddBookmark() {
  const urlRaw = bookmarkInput.value.trim();
  if (!urlRaw) return alert('Введи URL');
  const url = normalizeUrl(urlRaw);
  const id = Date.now();
  bookmarks.push({ id, url });
  saveBookmarks(bookmarks);
  renderBookmarks();
  bookmarkInput.value = '';
}

function onDelete(id) {
  bookmarks = bookmarks.filter(b => b.id !== id);
  saveBookmarks(bookmarks);
  renderBookmarks();
}

function onEdit(id, liEl) {
  // replace link with input + save button
  const b = bookmarks.find(x => x.id === id);
  if (!b) return;
  liEl.innerHTML = '';
  const input = document.createElement('input');
  input.className = 'edit-input';
  input.value = b.url;

  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Зберегти';
  saveBtn.className = 'small';

  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Скасувати';
  cancelBtn.className = 'small delete';

  liEl.appendChild(input);
  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '8px';
  actions.appendChild(saveBtn);
  actions.appendChild(cancelBtn);
  liEl.appendChild(actions);

  saveBtn.addEventListener('click', () => {
    const newUrl = normalizeUrl(input.value.trim());
    if (!newUrl) return alert('Вкажи URL');
    bookmarks = bookmarks.map(x => (x.id === id ? { ...x, url: newUrl } : x));
    saveBookmarks(bookmarks);
    renderBookmarks();
  });

  cancelBtn.addEventListener('click', () => {
    renderBookmarks();
  });
}

addBookmarkBtn.addEventListener('click', onAddBookmark);
clearBookmarksBtn.addEventListener('click', () => {
  if (confirm('Видалити всі закладки?')) {
    bookmarks = [];
    saveBookmarks(bookmarks);
    renderBookmarks();
  }
});

renderBookmarks();

// -------- Form app (localStorage)
const usernameEl = document.getElementById('username');
const passwordEl = document.getElementById('password');
const saveBtn = document.getElementById('saveBtn');
const FORM_KEY = 'loginForm_v1';

function loadForm() {
  try {
    return JSON.parse(localStorage.getItem(FORM_KEY)) || { username: '', password: '' };
  } catch (e) {
    return { username: '', password: '' };
  }
}

function saveForm(data) {
  localStorage.setItem(FORM_KEY, JSON.stringify(data));
}

function populateForm() {
  const data = loadForm();
  usernameEl.value = data.username || '';
  passwordEl.value = data.password || '';
}

saveBtn.addEventListener('click', () => {
  const username = usernameEl.value.trim();
  const password = passwordEl.value.trim();
  saveForm({ username, password });
  alert('Збережено');
});

populateForm();

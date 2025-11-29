// Lazy-loading images using IntersectionObserver
// Images should have `data-src` with the real URL and a small placeholder in `src`.

document.addEventListener('DOMContentLoaded', () => {
  const imgs = Array.from(document.querySelectorAll('img[data-src]'));
  const loadAllBtn = document.getElementById('load-all');

  // Функція для заміни src на data-src та підписування класу після завантаження
  function loadImage(img) {
    const src = img.dataset.src;
    if (!src) return;
    img.src = src;
    // Після завантаження зображення додаємо клас .loaded для анімації
    img.addEventListener(
      'load',
      () => {
        img.classList.add('loaded');
        // видаляємо data-src, бо воно більше не потрібне
        img.removeAttribute('data-src');
      },
      { once: true }
    );
  }

  // Параметри observer: трохи відступу внизу, щоб підвантажити заздалегідь
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px 200px 0px',
    threshold: 0.1,
  };

  // IntersectionObserver — підвантажує зображення коли вони стають видимими
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        loadImage(img);
        obs.unobserve(img);
      }
    });
  }, observerOptions);

  // Налаштовуємо спостереження для кожного зображення
  imgs.forEach(img => observer.observe(img));

  // Кнопка: підвантажити всі зображення одразу
  loadAllBtn.addEventListener('click', () => {
    imgs.forEach(img => {
      if (img.dataset.src) loadImage(img);
    });
    observer.disconnect(); // більше не потрібно спостерігати
  });

  // Додаткові підказки / оптимізації:
  // - Можна використовувати srcset / sizes щоб підвантажувати різні розміри
  // - Для сучасних браузерів варто додати WebP варіанти (picture + source)
  // - При великій кількості зображень можна batch-ити loadImage() з debounce
});

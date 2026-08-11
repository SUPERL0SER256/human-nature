const grid = document.getElementById('gallery-grid');

// Shuffle the array to bring bottom pictures up and mix aspect ratios
const shuffledSlides = [...slides].sort(() => Math.random() - 0.5);

shuffledSlides.forEach(slide => {
  const item = document.createElement('div');
  item.className = 'gallery-item';
  
  // Add a random top margin (between 0px and 80px) to stagger the items
  // This breaks the flat top edge and creates a jagged, irregular look
  const randomStagger = Math.floor(Math.random() * 80);
  item.style.marginTop = `${randomStagger}px`;

  item.innerHTML = `
    <img src="${slide.image}" alt="${slide.word}" loading="lazy">
    <div class="gallery-item-text">${slide.word}</div>
  `;
  grid.appendChild(item);
});

// Keybind to reload the page
document.addEventListener('keydown', (e) => {
  if (e.key === 'r' || e.key === 'R') {
    window.location.reload();
  }
});

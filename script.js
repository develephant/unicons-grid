// script.js
import { emojiData } from './src/emoji-data.js';

const grid = document.getElementById('emoji-grid');
const toast = document.getElementById('toast');

function createEmojiCard({ unicode, name }) {
  const card = document.createElement('div');
  card.className = 'emoji-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${name} (${unicode})`);

  const emoji = document.createElement('div');
  emoji.className = 'emoji';
  emoji.textContent = unicode;

  const label = document.createElement('div');
  label.className = 'emoji-label';
  label.textContent = name;

  card.appendChild(emoji);
  card.appendChild(label);

  card.addEventListener('click', () => {
    copyToClipboard(unicode);
    showToast(`Copied ${unicode} to clipboard!`);
    card.classList.add('clicked');
    setTimeout(() => card.classList.remove('clicked'), 150);
  });

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      card.click();
    }
  });

  return card;
}

function groupByCategory(data) {
  // Consolidate subcategories under main categories
  const categoryMap = {
    // Face
    'face-smiling': 'Face',
    'face-affection': 'Face',
    'face-tongue': 'Face',
    'face-hand': 'Face',
    'face-neutral-skeptical': 'Face',
    'face-sleepy': 'Face',
    'face-unwell': 'Face',
    'face-hat': 'Face',
    'face-glasses': 'Face',
    'face-concerned': 'Face',
    'face-negative': 'Face',
    'face-costume': 'Face',
    'cat-face': 'Face',
    'monkey-face': 'Face',
    'emotion': 'Face',
    // Hand
    'hand-fingers-open': 'Hand',
    'hand-fingers-partial': 'Hand',
    'hand-single-finger': 'Hand',
    'hand-fingers-closed': 'Hand',
    'hand-prop': 'Hand',
    'hand': 'Hand',
    // Person
    'person': 'Person',
    'person-gesture': 'Person',
    'person-role': 'Person',
    'person-fantasy': 'Person',
    'person-activity': 'Person',
    'person-sport': 'Person',
    'person-resting': 'Person',
    'person-symbol': 'Person',
    'person-family': 'Person',
    // Animal
    'animal-mammal': 'Animal',
    'animal-bird': 'Animal',
    'animal-amphibian': 'Animal',
    'animal-reptile': 'Animal',
    'animal-marine': 'Animal',
    'animal-bug': 'Animal',
    'animal': 'Animal',
    // Plant
    'plant-flower': 'Plant',
    'plant-other': 'Plant',
    'plant': 'Plant',
    // Food
    'food-fruit': 'Food',
    'food-vegetable': 'Food',
    'food-prepared': 'Food',
    'food-asian': 'Food',
    'food-marine': 'Food',
    'food-sweet': 'Food',
    'drink': 'Food',
    'dishware': 'Food',
    'food': 'Food',
    // Place
    'place-map': 'Place',
    'place-geographic': 'Place',
    'place-building': 'Place',
    'place-religious': 'Place',
    'place-other': 'Place',
    'place': 'Place',
    // Transport
    'transport-ground': 'Transport',
    'transport-water': 'Transport',
    'transport-air': 'Transport',
    'transport-sign': 'Transport',
    'transport': 'Transport',
    // Add more consolidations as needed
  };
  const groups = {};
  data.forEach(item => {
    let cat = item.category || 'General';
    cat = categoryMap[cat] || cat.replace(/-/g, ' ');
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(item);
  });
  return groups;
}

function renderGrid() {
  grid.innerHTML = '';
  const grouped = groupByCategory(emojiData);
  Object.entries(grouped).forEach(([category, emojis]) => {
    // Create collapsible panel
    const details = document.createElement('details');
    details.className = 'emoji-category-panel';
    // Collapsed by default
    // Create summary (panel header)
    const summary = document.createElement('summary');
    summary.className = 'emoji-category-summary';
    summary.textContent = category.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    details.appendChild(summary);
    // Create grid for this category
    const catGrid = document.createElement('div');
    catGrid.className = 'emoji-grid';
    emojis.forEach(emojiObj => {
      catGrid.appendChild(createEmojiCard(emojiObj));
    });
    details.appendChild(catGrid);
    grid.appendChild(details);
  });
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.style.display = 'block';
  toast.style.opacity = '0.98';
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 300);
  }, 1200);
}

// Initial render
renderGrid();

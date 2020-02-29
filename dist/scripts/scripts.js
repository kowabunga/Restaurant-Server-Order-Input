// Caching DOM
const addItemBtn = document.getElementById('add-item-btn'),
  backItemBtn = document.getElementById('back-item-btn'),
  addItemMenu = document.getElementById('addItem');

// Event listeners
addItemBtn.addEventListener('click', showAddItem);
backItemBtn.addEventListener('click', hideAddItem);

function showAddItem(e) {
  e.preventDefault();
  if (!addItemMenu.classList.contains('visible')) {
    addItemMenu.classList.add('visible');
  }
}

function hideAddItem(e) {
  e.preventDefault();
  if (addItemMenu.classList.contains('visible')) {
    addItemMenu.classList.remove('visible');
  }
}

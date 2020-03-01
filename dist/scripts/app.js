// Caching DOM
const addItemBtn = document.getElementById('add-item-btn'),
  backItemBtn = document.getElementById('back-item-btn'),
  addItemMenu = document.getElementById('addItem'),
  submitItemBtn = document.getElementById('submit-new-item');

// classes
const ui = new UI();

/* ---------------------------------------------------------------------- */
// Trim Date and get time
function trimDate() {
  let trimmedDate = new Date();
  let hours = trimmedDate.getHours() < 12 ? trimmedDate.getHours() : trimmedDate.getHours() - 12;
  let minutes = trimmedDate.getMinutes() > 10 ? trimmedDate.getMinutes() : `0${trimmedDate.getMinutes()}`;
  let seconds = trimmedDate.getSeconds() > 10 ? trimmedDate.getSeconds() : `0${trimmedDate.getSeconds()}`;
  let currentTime = trimmedDate.getHours < 12 ? `${hours}:${minutes}:${seconds} AM` : `${hours}:${minutes}:${seconds} PM`;
  return `${trimmedDate.toDateString()} \xa0 \xa0 \xa0 \xa0 ${currentTime}`;
}

// Call upon load, then call every second for updating
ui.populateDate(trimDate());
setInterval(() => {
  ui.populateDate(trimDate());
}, 1000);

/* ---------------------------------------------------------------------- */
// Event listeners
addItemBtn.addEventListener('click', showAddItem);
backItemBtn.addEventListener('click', hideAddItem);
submitItemBtn.addEventListener('click', addNewItem);

/* ---------------------------------------------------------------------- */
// show/hide add item sidebar
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

function addNewItem(e) {
  e.preventDefault();
  hideAddItem(e);
  console.log('New item added.');
}

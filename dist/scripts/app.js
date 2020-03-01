// Caching DOM
const addItemBtn = document.getElementById('add-item-btn'),
  backItemBtn = document.getElementById('back-item-btn'),
  addItemMenu = document.getElementById('addItem'),
  submitItemBtn = document.getElementById('submit-new-item'),
  menuItemButtons = document.querySelector('.menu-items-btns'),
  closeModalBtn = document.getElementById('close'),
  modal = document.querySelector('.modal');

// classes
const ui = new UI(),
  menuItems = new MenuItems();

/* ---------------------------------------------------------------------- */
// Trim Date and get time
function trimDate() {
  let trimmedDate = new Date();
  let hours = trimmedDate.getHours() < 12 ? trimmedDate.getHours() : trimmedDate.getHours() - 12;
  let minutes = trimmedDate.getMinutes() > 9 ? trimmedDate.getMinutes() : `0${trimmedDate.getMinutes()}`;
  let seconds = trimmedDate.getSeconds() > 9 ? trimmedDate.getSeconds() : `0${trimmedDate.getSeconds()}`;
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
menuItemButtons.addEventListener('click', displayModal);

// We can't add the close button here because it is generated dynamically.
// To get around this, we add an event listener to the window object
// When the target of what is clicked is either the object with the 'modal class' or
// the span with the id of 'close' (the X), close the modal
window.addEventListener('click', e => {
  if (e.target.classList.contains('modal') || e.target.id === 'close') {
    closeModal();
  }
});

/* ---------------------------------------------------------------------- */
// show/hide add item sidebar+
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

// Add new item to menu
function addNewItem(e) {
  e.preventDefault();
  hideAddItem(e);
  console.log('New item added.');
}

// Display/Close modal
function displayModal(e) {
  e.preventDefault();
  getModalData(e.target.id);
  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

// This function handles getting the data to create the modal and calls a UI class function to generate the modal
function getModalData(target) {
  menuItems
    .getData()
    .then(data => ui.generateModalHtml(data, target))
    .catch(err => console.log(err));
}

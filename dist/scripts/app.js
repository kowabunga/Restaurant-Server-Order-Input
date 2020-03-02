// Caching DOM
const addItemBtn = document.getElementById('add-item-btn'),
  backItemBtn = document.getElementById('back-item-btn'),
  addItemMenu = document.getElementById('addItem'),
  submitItemBtn = document.getElementById('submit-new-item'),
  menuItemButtons = document.querySelector('.menu-items-btns'),
  closeModalBtn = document.getElementById('close'),
  modal = document.querySelector('.modal'),
  currentBill = document.getElementById('bill'),
  menuSelector = document.getElementById('menu-category-selector'),
  newItemName = document.getElementById('item-name'),
  newItemPrice = document.getElementById('item-price');

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
submitItemBtn.addEventListener('click', submitNewItem);
menuItemButtons.addEventListener('click', displayModal);
modal.addEventListener('click', addToBill);
menuSelector.addEventListener('change', selectMenuCategory);

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
function hideAddItem() {
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
  // make sure only buttons works
  if (e.target.classList.contains('menu-btns')) {
    getModalData(e.target.id);
    modal.style.display = 'block';
  }
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

/* ---------------------------------------------------------------------- */
// This function ensures that the clicked object is the menu item itself, not any of its children or parents
function addToBill(e) {
  e.preventDefault();
  if (e.target.parentElement.classList.contains('menu-item')) {
    ui.insertInBill(e.target.parentElement.children);
  } else if (e.target.classList.contains('menu-item')) {
    ui.insertInBill(e.target.children);
  }
}

/* ---------------------------------------------------------------------- */
// Function to get menu category that is to be modified
function selectMenuCategory() {
  return menuSelector.value;
}

function dataReturner(data) {
  return data;
}

function submitNewItem(e) {
  e.preventDefault();
  let data;
  const selectItem = selectMenuCategory();
  console.log(data);
  console.log(selectItem);
  menuItems.postData(data, selectItem);
  hideAddItem();
}

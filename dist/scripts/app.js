// Caching DOM
const mainContainer = document.querySelector('.container'),
  serverLoginBtn = document.getElementById('server-login-btn'),
  backItemBtn = document.getElementById('back-item-btn'),
  loginBtnMain = document.getElementById('login'),
  loginBtn = document.getElementById('submit-login'),
  logoutBtn = document.getElementById('logout'),
  menuItemButtons = document.querySelector('.menu-items-btns'),
  closeModalBtn = document.getElementById('close'),
  modal = document.querySelector('.modal'),
  currentBill = document.getElementById('bill'),
  serverName = document.getElementById('server-name'),
  serverPass = document.getElementById('server-pass'),
  formGroup = document.querySelector('.form-group'),
  billServerName = document.getElementById('bill-server-name'),
  clearBillBtn = document.getElementById('clear-bill'),
  billUL = document.getElementById('bill-ul'),
  billTotal = document.getElementById('total'),
  billTime = document.getElementById('bill-time');

// classes
const ui = new UI(),
  menuItems = new MenuItems();

// boolean for adding p element to login box
let exists = false;

/* ---------------------------------------------------------------------- */
// Trim Date and get time

// Call upon load, then call every second for updating
ui.populateDate();
setInterval(() => {
  ui.populateDate();
}, 1000);

/* ---------------------------------------------------------------------- */
// Event listeners
serverLoginBtn.addEventListener('click', showLogin);
backItemBtn.addEventListener('click', hideLogin);
loginBtn.addEventListener('click', checkLogin);
logoutBtn.addEventListener('click', logOut);
menuItemButtons.addEventListener('click', displayModal);
modal.addEventListener('click', addToBill);
clearBillBtn.addEventListener('click', ui.clearBill);

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
function showLogin(e) {
  e.preventDefault();
  if (!loginBtnMain.classList.contains('visible')) {
    loginBtnMain.classList.add('visible');
  }
}
function hideLogin() {
  if (loginBtnMain.classList.contains('visible')) {
    loginBtnMain.classList.remove('visible');
  }
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
// Check login validity
// for simplicity, it is currently just empty strings
function checkLogin(e) {
  e.preventDefault();
  if (serverName.value !== '' && serverPass.value !== '') {
    billTime.innerHTML = `${ui.trimDate()}`;
    billServerName.innerHTML = `Server: ${serverName.value}`;
    hideLogin();
    serverLoginBtn.style.display = 'none';
    setTimeout(() => {
      mainContainer.style.display = 'grid';
      serverName.value = '';
      serverPass.value = '';
    }, 500);
  } else if (serverName.value === '' && serverPass.value === '') {
    serverName.classList.add('wrong');
    serverPass.classList.add('wrong');
    appendError('Invalid username/pass.');
  } else if (serverName.value === '') {
    serverName.classList.add('wrong');
    appendError('Invalid username.');
  } else if (serverPass.value === '') {
    serverPass.classList.add('wrong');
    appendError('Invalid password.');
  }
}

// logout and return to server login
function logOut(e) {
  e.preventDefault();
  mainContainer.style.display = 'none';
  setTimeout(() => {
    serverLoginBtn.style.display = 'block';
  }, 150);
}

// Append error message to login IF exists is true (!false), otherwise don't.
// prevents multiple error messages
function appendError(msg) {
  if (!exists) {
    exists = true;
    const p = document.createElement('p');
    p.innerHTML = `<br>${msg}`;
    formGroup.appendChild(p).style.color = 'crimson';
    setTimeout(() => {
      p.remove();
      if (serverName.classList.contains('wrong')) {
        serverName.classList.remove('wrong');
      }
      if (serverPass.classList.contains('wrong')) {
        serverPass.classList.remove('wrong');
      }
      exists = false;
    }, 3000);
  }
}

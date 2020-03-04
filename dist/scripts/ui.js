class UI {
  constructor() {
    this.timeSection = document.getElementById('date-time');
    this.menuModal = document.getElementById('menu-item-modal');
    this.billModal = document.getElementById('bill-print-modal');
    this.billUL = document.getElementById('bill-ul');
    this.billTotalValue = document.getElementById('total');
    this.billTotal = [];
    // need to bind this function to ensure that the clearBill function is bound to the class, not to the object whose event listener is calling it.
    this.clearBill = this.clearBill.bind(this);
  }

  trimDate() {
    let trimmedDate = new Date();
    let hours = trimmedDate.getHours() < 12 ? trimmedDate.getHours() : trimmedDate.getHours() - 12;
    let minutes = trimmedDate.getMinutes() > 9 ? trimmedDate.getMinutes() : `0${trimmedDate.getMinutes()}`;
    let seconds = trimmedDate.getSeconds() > 9 ? trimmedDate.getSeconds() : `0${trimmedDate.getSeconds()}`;
    let currentTime = trimmedDate.getHours < 12 ? `${hours}:${minutes}:${seconds} AM` : `${hours}:${minutes}:${seconds} PM`;
    return `${trimmedDate.toDateString()} \xa0 \xa0 \xa0 \xa0 ${currentTime}`;
  }

  populateDate() {
    this.timeSection.innerText = this.trimDate();
  }

  // App.js calls function sending json file data, and the id of the target button
  // Target button id is checked to see if it is included.
  // Based on result, function calls loopthrough() with particular argument equal to the classNames
  generateModalHtml(data, target) {
    if (target.includes('drinks')) {
      this.loopThrough(data, 'Drinks');
    } else if (target.includes('apps')) {
      this.loopThrough(data, 'Appetizers');
    } else if (target.includes('lunch')) {
      this.loopThrough(data, 'Lunch');
    } else if (target.includes('dinner')) {
      this.loopThrough(data, 'Dinner');
    } else if (target.includes('dessert')) {
      this.loopThrough(data, 'Dessert');
    } else {
      console.log('Error! Not a valid button.');
    }
  }

  // This function loops through the appropriate array from the json file object based on the arrName passed in as arrName from above function
  loopThrough(data, arrName) {
    let menu_items = '';
    data[arrName].forEach(item => {
      menu_items += `
        <button class="menu-item btn">
          <div class="name">${item.name}</div>
          <div class="price">$${item.price}</div>
        </button>
      `;
    });

    let output = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 id="drink-title" class="menu-title">${arrName}</h3>
          <span id="close">&times;</span>
        </div>
        <div class="modal-body">
          ${menu_items}
        </div>
      </div>
    `;

    this.menuModal.innerHTML = output;
  }

  // This function takes the clicked menu item in as a parameter and extracts the item name and price
  // It then takes the price and adds it to an array for later use
  // Adds selected meal options as li's to ul
  // produces bill subtotal, tax (8.75), gratuity values and grand total
  insertInBill(items) {
    const name = items[0].innerText;
    const price = +items[1].innerText.slice(1, items[1].innerText.length);
    this.billTotal.push(price);

    // create element and add to list
    const li = document.createElement('li');
    li.innerText = `${name} \xa0 \xa0 $${price}`;
    this.billUL.appendChild(li);
    // parse string as float, then fix it to two decimal places.
    // this ensures that the string 1.80 stays as 1.80, not 1.8, as a number
    let total = parseFloat(this.billTotal.reduce((acc, curr) => acc + curr)).toFixed(2);
    let tax = parseFloat(this.billTotal.reduce((acc, curr) => acc + curr) * 0.0875).toFixed(2);

    // add total to bill
    this.billTotalValue.innerText = `
      SUBTOTAL : $${total}
      TAX: $${tax}
      GRATUITY: 
      15%: $${parseFloat(total * 0.15).toFixed(2)}
      18%: $${parseFloat(total * 0.18).toFixed(2)}
      20%: $${parseFloat(total * 0.2).toFixed(2)}
      GRAND TOTAL: $ ${parseFloat(total + tax).toFixed(2)}

      Thank you for dining with us. Please come again!
    `;
  }

  clearBill() {
    this.billUL.innerHTML = '';
    this.billTotalValue.innerText = '';
    this.billTotal.length = 0;
  }
}

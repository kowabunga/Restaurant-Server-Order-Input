class UI {
  constructor() {
    this.timeSection = document.getElementById('date-time');
    this.modal = document.querySelector('.modal');
  }
  populateDate(time) {
    this.timeSection.innerText = time;
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

  // This function loops through the appropriate array from the json file object based on the arrName passed in from
  loopThrough(data, arrName) {
    let menu_items = '';
    data[arrName].forEach(item => {
      menu_items += `
        <div class="menu-item">
          <div class="name">${item.name}</div>
          <div class="price">$${item.price}</div>
        </div>
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

    this.modal.innerHTML = output;
  }
}

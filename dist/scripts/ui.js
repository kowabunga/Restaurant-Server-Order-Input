class UI {
  constructor() {
    this.timeSection = document.getElementById('date-time');
    this.modal = document.querySelector('.modal');
  }
  populateDate(time) {
    this.timeSection.innerText = time;
  }
  loopThrough(data, arrName) {
    let menu_items = '';
    data[arrName].forEach(item => {
      console.log(item.name, item.price);
      menu_items += `
        <div class="menu-item">
          <div class="name">${item.name}</div>
          <div class="price">${item.price}</div>
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
  generateModalHtml(data, target) {
    if (target.includes('drinks')) {
      this.loopThrough(data, 'drinks');
    } else if (target.includes('apps')) {
      this.loopThrough(data, 'apps');
    } else if (target.includes('lunch')) {
      this.loopThrough(data, 'lunch');
    } else if (target.includes('dinner')) {
      this.loopThrough(data, 'dinner');
    } else if (target.includes('dessert')) {
      this.loopThrough(data, 'dessert');
    } else {
      console.log('Error! Not a valid button.');
    }
  }
}

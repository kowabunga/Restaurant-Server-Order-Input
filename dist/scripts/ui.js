class UI {
  constructor() {
    this.timeSection = document.getElementById('date-time');
  }
  populateDate(time) {
    this.timeSection.innerText = time;
  }
}

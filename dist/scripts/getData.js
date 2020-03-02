class MenuItems {
  constructor() {
    this.url = 'dist/jsondata/menu-modal-items.json';
  }
  async getData() {
    const response = await fetch(this.url);
    const resData = await response.json();
    return resData;
  }
}

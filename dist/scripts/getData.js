class MenuItems {
  constructor() {
    this.url = 'dist/jsondata/menu-modal-items.json';
  }
  async getData() {
    const response = await fetch(this.url);
    const resData = await response.json();
    return resData;
  }
  async postData(data, target) {
    // console.log('Data: ', data);
    // console.log('Target: ', target);
    // const response = await fetch(this.url, {
    //   method: 'POST',
    //   headers: {
    //     'Content-type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // });
    // const resData = await response.json();
    // return resData;
  }
}

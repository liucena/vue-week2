const url = 'https://vue3-course-api.hexschool.io/api';
const path = 'cena1';
const app = {
  data: {
    products: [],
  },
  //取得資料
  getData(page = 1) {
    const api = `${url}/${path}/products?page=${page}`;
    axios.get(api).then((res) => {
      if (res.data.success) {
        this.data.products = res.data.products;
        console.log(this.data.products)
        this.render();//渲染
      }
    })
  },
  render () {
    const productList = document.querySelector('#productList');//清單
    const productCount = document.querySelector("#productCount"); // 產品數量
    productCount.innerHTML = this.data.products.length; //渲染 產品數量

   //map 產生陣列
    const productsData = this.data.products.map(item =>`
      <tr>
        <td>${item.title}</td>
      <td width="120">
        ${item.origin_price}
      </td>
      <td width="120">
        ${item.price}
      </td>
      <td width="100">
        <span class="${item.is_enabled ? 'text-success' : 'text-secondary'}">${item.is_enabled ? '啟用' : '未啟用'}</span>
      </td>
      <td width="120">
        <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
      </td>
        </tr>
    `).join('');//轉為存字串
    // console.log(productsData);
    productList.innerHTML = productsData; //渲染到畫面上
    const deleteBtns = document.querySelectorAll('.deleteBtn');//刪除
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', this.deleteProduct);
    })
  },
  //刪除特定品項
  deleteProduct (e) {
    const id = e.target.dataset.id;
    console.log(id);
    axios.delete(`${url}/${path}/admin/product/${id}`).then(
      res => {
        console.log(res);
        app.getData();//重新渲染
      }
    )
  },
  init() {
      //cookie 取出來
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    //存到axios
    axios.defaults.headers.common.Authorization = token;
    // console.log(token)
    // axios.post(`${url}/user/check`).then(res => {
    //   console.log(res)
    // })

    this.getData();
  }
}
app.init();
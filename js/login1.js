const form = document.querySelector('#form');
const username = document.querySelector('#username');//帳號
const password = document.querySelector('#password');//密碼
const api = 'https://vue3-course-api.hexschool.io'

function login (e) {
    e.preventDefault();
    const url = `${api}/admin/signin`;
    const user = {
        username: username.value,
        password: password.value,
    }
    console.log(url)
    console.log(user)
    axios.post(url, user).then((res) => {
        if (res.data.success) {
            //取得token expired
            const { token, expired } = res.data;
            //存入cookie
            document.cookie = `hexToken = ${token}; expires = ${new Date(expired)}; path=/`;
            //成功跳轉products
            window.location = 'products.html';
        } else {
            alert(res.data.message);
        }
    }).catch((error) => {
        console.log(error);
    })

}

form.addEventListener('submit', login);























import products from "./products.js";
import cart from "./cart.js";

// products.js と cart.js を読み込み
// import products from "products.js";
// products.js から商品データをインポート
// import cart from "cart.js";
// cart.js から商品データをインポート

// 要素を取得
let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

const loadTemplate = () => {
    fetch('./template.html')
        .then(response => response.text())
        .then(html => {
            app.innerHTML = html;
            let contentTab = document.getElementById('contentTab');
            contentTab.innerHTML = temporaryContent.innerHTML;
            temporaryContent.innerHTML = null;
            cart();
            initApp();
        })
}
loadTemplate();

const initApp = () => {
    let idProduct = new URLSearchParams(window.location.search).get("id");
    let info = products.filter((value) => value.id == idProduct)[0];
    console.log(info);

    if (!info) {
        window.location.href = "/";
    }
    let detail = document.querySelector(".detail");
    detail.querySelector(".image img").src = info.img;
    detail.querySelector(".name").innerText = info.name;
    detail.querySelector(".price").innerText = "￥" + info.price.toLocaleString();
    detail.querySelector(".description").innerText = info.description;
    detail.querySelector(".addCart").dataset.id = idProduct;


    //similar product
    // 商品リストを表示する場所の要素を取得
    let listProduct = document.querySelector(".listProduct");
    // 商品リストの内容を一旦クリア
    listProduct.innerHTML = null;

    // 商品数の分だけ繰り返す
    products.filter((value) => value.id != idProduct).forEach(product => {
        // divを生成
        let newProduct = document.createElement("div");
        // .itemを付与
        newProduct.classList.add("item");
        // 作成したdivに配置する要素を生成
        newProduct.innerHTML = `
            <a href="/detail.html?id=${product.id}">
                <img src="${product.img}"/>
            </a>
            <h2>${product.name}</h2>
            <div class="price">￥${product.price.toLocaleString()}</div>
            <button class="addCart"
                data-id="${product.id}">
                カートに追加する
            </button>
        `;
        // 生成した商品アイテムの要素を商品リストに追加
        listProduct.appendChild(newProduct);
    })

}
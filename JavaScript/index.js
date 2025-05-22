import cart from "./cart.js"; // cart.js から商品データをインポート
import products from "./products.js"; // products.js から商品データをインポート

// import cart from "cart.js";
 // cart.js から商品データをインポート
// import products from "products.js";
 // products.js から商品データをインポート
// 要素を取得

let app = document.getElementById("app");
let temporaryContent = document.getElementById("temporaryContent");

const loadTemplate = () => {
    // '/template.html' ファイルを非同期で取得
    fetch('./template.html')
        // レスポンスをテキスト形式に変換
        .then(response => response.text())
        // 変換された HTML を処理
        .then(html => {
            // app要素の HTML を取得したテンプレートの内容で書き換える
            app.innerHTML = html;
            // 要素を取得
            let contentTab = document.getElementById('contentTab');
            // contentTabのHTMLを一時的に保存していた temporaryContentの内容で書き換える
            contentTab.innerHTML = temporaryContent.innerHTML;
            // この時点で一時的なコンテンツは不要なため"temporaryContent"の内容をクリア
            temporaryContent.innerHTML = null;
            // 関数を実行
            cart();
            initApp();
        })
}
// テンプレートの読み込みと初期化処理を開始
loadTemplate();

const initApp = () => {
    // 商品リストを表示する場所の要素を取得
    let listProduct = document.querySelector(".listProduct");
    // 商品リストの内容を一旦クリア
    listProduct.innerHTML = null;
    // 
    products.forEach(product => {
        // divを生成
        let newProduct = document.createElement("div");
        // .itemを付与
        newProduct.classList.add("item");
        // 作成したdivに配置する要素を生成
        newProduct.innerHTML = `
            <a href="detail.html?id=${product.id}">
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
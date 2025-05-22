import products from "./products.js";
// import products from "product.js";
 // products.js から商品データをインポート

// カート機能を制御する関数
const cart = () => {

    // 要素を取得
    let iconCart = document.querySelector(".icon_cart");
    let closeBtn = document.querySelector(".cartTab .close");
    let wrapper = document.querySelector("#wrapper");
    
    // カート内の商品情報を格納する配列を初期化（関数スコープなので、毎回初期化される点に注意）
    let cart = [];

    // カートアイコンがクリックされた時の処理
    iconCart.addEventListener("click", () => {
        // wrapper に activeTabCart クラスを付与/削除して、カートタブの表示/非表示を切り替える
        wrapper.classList.toggle("activeTabCart");
    });

    // 閉じるボタンがクリックされた時の処理
    closeBtn.addEventListener("click", () => {
        // wrapper に activeTabCart クラスを付与/削除して、カートタブの表示/非表示を切り替える
        wrapper.classList.toggle("activeTabCart");
    });

    // カートに商品をセット、または数量を更新する関数
    const setProductInCart = (idProduct, quantity, position) => {
        // 数量が 0 より大きい場合
        if (quantity > 0) {
            // カート内に同じ商品が存在しない場合
            if (position < 0) {
                // 新しい商品をカートに追加
                cart.push({
                    product_id: idProduct,
                    quantity: quantity
                });
            }
            // カート内に同じ商品が存在する場合
            else {
                // 既存の商品の数量を更新
                cart[position].quantity = quantity;
            }
        }
        // 数量が 0 以下の場合
        else {
            // カートから該当商品を削除
            cart.splice(position, 1);
        }
        // カートの内容をローカルストレージに保存
        localStorage.setItem("cart", JSON.stringify(cart));
        // カートの表示を更新
        refreshCartHTML();
    }

    // カートのHTML表示を更新する関数
    const refreshCartHTML = () => {
        // カートリストの要素を取得
        let listHTML = document.querySelector(".listCart");
        let totalHTML = document.querySelector(".icon_cart span");
        // カート内の合計数量を初期化
        let totalQuantity = 0;
        // カートリストの内容を一旦クリア
        listHTML.innerHTML = null;

        // カート内の各商品に対して処理
        cart.forEach(item => {
            // 合計数量を更新
            totalQuantity = totalQuantity + item.quantity;
            // 商品IDが一致する商品を products 配列から検索
            let position = products.findIndex((value) => value.id == item.product_id);
            // 検索結果の商品情報を取得
            let info = products[position];
            console.log("item.product_id:", item.product_id);
            console.log("info:", info);

            // 新しいカートアイテムの要素を作成とクラス付与
            let newItem = document.createElement("div");
            newItem.classList.add("item");
            
            // カートアイテムのHTMLを生成
            // 商品画像を表示
            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.img}" />
                </div>
                <div class="name">
                    ${info.name}
                </div>
                <div class="totalPrice">￥
                    ${info?.price * item.quantity}
                </div>
                <div class="quantity">
                    <span class="minus" data-id="${info.id}">-</span>
                    <span>${item.quantity}</span>
                    <span class="plus" data-id="${info.id}">+</span>
                </div>
            `;
            // 生成したカートアイテムをリストに追加
            listHTML.appendChild(newItem);
        });
        // カートアイコンの数量表示を更新
        totalHTML.innerText = totalQuantity;
    }

    // ドキュメント全体のクリックイベントを監視
    document.addEventListener("click", (e) => {
        // クリックされた要素を取得
        let buttonClick = e.target;
        // クリックされた要素の data-id 属性を取得
        let idProduct = buttonClick.dataset.id;
        // カート内の該当商品の位置を検索
        let position = cart.findIndex((value) => value.product_id == idProduct);
        // 該当商品の数量を取得（存在しない場合は 0）
        let quantity = position < 0 ? 0 : cart[position].quantity;

        // addCart クラスまたは plus クラスを持つ要素がクリックされた場合
        if (buttonClick.classList.contains("addCart") || buttonClick.classList.contains("plus")) {
            quantity++;
            // カートを更新
            setProductInCart(idProduct, quantity, position);
        }
        // minus クラスを持つ要素がクリックされた場合
        else if (buttonClick.classList.contains("minus")) {
            quantity--;
            // カートを更新
            setProductInCart(idProduct, quantity, position);
        }
    });

    // アプリケーションの初期化処理
    const initApp = () => {
        // ローカルストレージにカート情報が存在する場合
        if (localStorage.getItem("cart")) {
            // カート情報を読み込む
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        // カートの初期表示を更新
        refreshCartHTML();
    }
    // アプリケーション初期化を実行
    initApp();

}
export default cart;
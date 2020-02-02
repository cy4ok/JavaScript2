const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";
function makeGETRequest(url) {
    return new Promise((resolve, reject) => {
        let xhr;
        if (window.XMLHttpRequest) {
            xhr = new window.XMLHttpRequest();
        } else {
            xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const body = JSON.parse(xhr.responseText);
                resolve(body);
            }
        };
        xhr.onerror = function(err) {
            reject(err);
        }

        xhr.open('GET', url);
        xhr.send();
    });
};

class GoodsItem {
    constructor(id, title = 'Без названия', price = 0, img = 'https://via.placeholder.com/150') {
        this.id = id;
        this.title = title;
        this.price = price;
        this.img = img;
    }
    render() {
        return `
            <div class="goods-item" data-id="${this.id}">
                <img src="${this.img}" alt="alt">
                <h3 class="title-goods-item">${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-item">Добавить</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {}
    findGood(id) {
        return this.goods.find(good => good.id === id);
    }
    fetchGoods() {}
    totalSum() {
        let sum = 0;
        for (const good of this.goods) {
            if (good.price) {
                sum += good.price;
            }
        }
        return sum;
        // return this.goods.reduce((totalPrice, good) => {
        //     if (!good.price) return totalPrice;
        //     totalPrice += good.price;
        //     return totalPrice;
        // }, 0)
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id, good.product_name, good.price, good.img);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
}

class GoodsPage extends GoodsList {
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.buy-item')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    fetchGoods() {
        return makeGETRequest(`${API_URL}/catalogData.json`).then((goods) => {
            this.goods = goods;
        });
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        console.log(good);
    }
}

class Cart extends GoodsList {
    removeFromCart(goodId) {

    }
    cleanCart() {

    }
    updateCartItem(goodId, goods) {

    }
}

class CartItem extends GoodsItem {
    constructor(...attrs) {
        super(attrs);
        this.count = 0;
    }
    incCount() {

    }
    decCount() {

    }
}

const list = new GoodsPage('.goods-list');
list.fetchGoods().then(() => {
    list.render();
});

console.log(list.totalSum());

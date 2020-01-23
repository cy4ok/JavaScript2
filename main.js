class GoodsItem {
    constructor(id, title = 'Без названия', price = 0, img = '') {
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
                <button class="buy-item">Купить</button>
            </div>
        `;
    }
}

class GoodsList {
    constructor(container) {
        this.container = document.querySelector(container);
        this.goods = [];
    }
    initListeners() {
        const buttons = [...this.container.querySelectorAll('.js-add-to-cart')];
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const goodId = event.target.parentElement.getAttribute('data-id');
                this.addToCart(parseInt(goodId, 10));
            })
        })
    }
    findGood(id) {
        return this.goods.find(good => good.id === id);
    }
    addToCart(goodId) {
        const good = this.findGood(goodId);
        console.log(good);
    }
    fetchGoods() {
        this.goods = [
            {id: 1, title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/150'},
            {id: 2, title: "Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150'},
            {id: 3, title: "Стиральная машина hotpoint", price: 32000, img: 'https://via.placeholder.com/150'},
            {id: 4, title: "Умные часы apple watch", price: 26000, img: 'https://via.placeholder.com/150'},
            {id: 5, title: "Посудомоечная машина bosh", price: 26000, img: 'https://via.placeholder.com/150'},
        ]
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id, good.title, good.price, good.img);
            listHtml += goodItem.render();
        });
        this.container.innerHTML = listHtml;
        this.initListeners();
    }
}
class GoodsCart extends GoodsList {
    constructor() {
        super();
    }
    cartClearn() {} // Очистка корзины
    addCart() {} //Добавление в корзину товара
    removeCart() {} //Удаление товара из корзины
}

const list = new GoodsList('.goods-list');
list.fetchGoods();
list.render();

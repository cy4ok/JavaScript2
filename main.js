const goods = [
    { title: "Робот-пылесос xiaomi", price: 20000, img: 'https://via.placeholder.com/150' },
    { title: "Samsung Galaxy", price: 21500, img: 'https://via.placeholder.com/150' },
    { title: "Стиральная машина hotpoint", price: 32000, img: 'https://via.placeholder.com/150' },
    { title: "Умные часы apple watch", price: 26000, img: 'https://via.placeholder.com/150' },
];

const renderGoodsItem = (title = '', price = '', img = '') =>
    `<div class="goods-item">
        <img src="${img}" alt="alt">
        <h3 class="title-goods-item">${title}</h3>
        <p>${price}</p>
        <button class="buy-item">Купить</button>
    </div>`;

const renderGoodsList = (list = [], container = '') => {
    const goodsList = list.map(good => renderGoodsItem(good.title, good.price, good.img));
    document.querySelector(container).innerHTML = goodsList.join('');
};

renderGoodsList(goods, '.goods-list');

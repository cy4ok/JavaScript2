const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const cart = [];

function debounce(callback, wait, immediate) {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) callback.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {
            callback.apply(context, args)
        }
    }
}

Vue.component('search', {
    props: {
        searchLine: {
          type: String,
          default: '',
        }
    },
    template: `
        <form class="goods-search">
            <input type="text" class="goods-search-value" @input="filteredGoodsHandler">
        </form>
    `,
    methods: {
        filteredGoodsHandler(val) {
            const value = val.target.value;
            this.$emit('update:searchLine', value);
    }
  }
});

Vue.component('cart', {
  data: () => ({
    cart,
    isVisibleCart: false,
  }),
  methods: {
    cartVisibility() {
      this.isVisibleCart = !this.isVisibleCart;
    }
  },
  template: `
        <div class="cart-container" v-if="isVisibleCart">
             <ul class="cart-goods"></ul>
        </div>
  `
});

Vue.component('goods-item', {
    props: ['good'],
    template: `
        <div class="goods-item" >
           <img src="https://via.placeholder.com/150" alt="alt">
           <h3>{{ good.product_name }}</h3>
           <p>{{ good.price }}</p>
           <button class="buy-item">Добавить</button>
        </div>
    `
});

Vue.component('goods-list', {
    props: ['goods'],
    computed: {
        isFilteredGoodsEmpty() {
            return this.goods.length === 0;
        },
    },
    template: `
        <div class="goods-list" v-if="!isFilteredGoodsEmpty">
            <goods-item v-for="good in goods"
                        :key="good.id_product" :good="good"></goods-item>
        </div>
        <div class="goods-not-found" v-else>
            <h3>Нет данных</h3>
        </div>
    `
});


const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        isVisibleCart: false,
    },
    computed: {
        filteredGoodsHandler() {
            return debounce((event) => {
                const regexp = new RegExp(event.target.value.trim(), 'i');
                this.filteredGoods = this.goods.filter((good) => {
                    return regexp.test(good.product_name);
                });
            }, 300)
        }
    },
    methods: {
        makeGetRequest(url) {
            return new Promise((resolve, reject) => {
                let xhr;
                if (window.XMLHttpRequest) {
                    xhr = new window.XMLHttpRequest(); // readyState = 1
                } else  {
                    xhr = new window.ActiveXObject("Microsoft.XMLHTTP")
                }

                xhr.onreadystatechange = function () { // xhr changed
                    if (xhr.readyState === 4) {
                        if (xhr.status !== 200) {
                            reject(xhr.responseText);
                            return
                        }
                        const body = JSON.parse(xhr.responseText);
                        resolve(body)
                    }
                };

                xhr.onerror = function (err) {
                    reject(err)
                };

                xhr.open('GET', url);
                xhr.send(); // readyState 2
            });
        },
        toCartVisibility() {
            this.$refs.cart.cartVisibility();
        },
        async fetchGoods() {
            try {
                this.goods = await this.makeGetRequest(`${API_URL}/catalogData.json`)
                this.filteredGoods = [...this.goods];
            } catch (e) {
                console.error(e);
            }
        },


    },
    mounted() {
        this.fetchGoods();
    }
});

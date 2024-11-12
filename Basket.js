class Basket {
    constructor(products) {
        this.products = [];
        this.product_ids = {};
        products.forEach((product) => {
            if (this.hasProductByProductId(product.id)) {
                this.addProduct(product);
            }
        });
        this.updateText();
        BasketStore.setProductIds(this.product_ids);
        $('body').on(Basket.EVENT_UPDATE, (event, product) => {
            this.hasProductByProductId(product.id)
                ? this.removeProduct(product)
                : this.addProduct(product);
            BasketStore.createById(product.id);
            this.updateText();
        });
    }
    updateText() {
        if (this.getCountProduct() === 0) {
            $('body').find('.info').text('Пусто');
        }
        else {
            // @ts-ignore
            $('body').find('.info').
                text(this.getCountProduct() + ' '
                + Basket.declofNum(this.getCountProduct(), ['товар', 'товара', 'товаров'])
                + ' на ' + this.getSumPrices() + ' p');
        }
    }
    // @link https://ru.stackoverflow.com/questions/89458/%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE%D0%BA%D0%BE%D0%BD%D1%87%D0%B0%D0%BD%D0%B8%D1%8F-%D1%81%D0%BB%D0%BE%D0%B2%D0%B0-%D0%BF%D0%BE-%D1%87%D0%B8%D1%81%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%D1%83-1-%D0%B3%D0%BE%D0%B4-2-%D0%B3%D0%BE%D0%B4%D0%B0-5-%D0%BB%D0%B5%D1%82
    static declofNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }
    hasProductByProductId(product_id) {
        let product_ids = BasketStore.getProductIds();
        return !product_ids[BasketStore.getKeyProductId(product_id)] == false;
    }
    addProduct(product) {
        product.$context.addClass('in_basket');
        product.showButton();
        this.product_ids[BasketStore.getKeyProductId(product.id)] = product.id;
        this.products.push(product);
    }
    removeProduct(product) {
        product.$context.removeClass('in_basket');
        product.showButton();
        delete this.product_ids[BasketStore.getKeyProductId(product.id)];
        this.products.forEach((basket_product, index) => {
            if (product.id == basket_product.id) {
                this.products.splice(index, 1);
            }
        });
    }
    getSumPrices() {
        let sum = 0;
        this.products.forEach((product) => {
            sum = sum + product.price;
        });
        return sum;
    }
    getCountProduct() {
        return this.products.length;
    }
    getProducts() {
        return this.products;
    }
    static create(products) {
        return new Basket(products).getProducts();
    }
}
Basket.EVENT_UPDATE = 'Basket.EVENT_UPDATE';

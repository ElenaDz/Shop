export class Product {
    constructor($context) {
    }
    get in_basket() {
        return;
    }
    get id() {
        return;
    }
    get price() {
        return;
    }
    static create($context = $('.b_product')) {
        let $products = $context;
        /** @type {Product[]} */
        let products = [];
        console.log($products);
        $products.each((index, element) => {
            let product = $(element);
            // products.push(new Product(product));
        });
        return products;
    }
    // наполняет корзину в момент загрузки страницы продуктами,которые добавили ранее
    // 1 продукт возвращает
    static createById(id) {
        return;
    }
}

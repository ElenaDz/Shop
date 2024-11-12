class BasketStore {
    // fixme должен вращать массив а не объект
    static getProductIds() {
        return JSON.parse(localStorage.getItem(BasketStore.KEY_PRODUCT_IDS)) || {};
    }
    // fixme должен принимать массив а не объект
    static setProductIds(product_ids) {
        localStorage.setItem(BasketStore.KEY_PRODUCT_IDS, JSON.stringify(product_ids));
    }
    // fixme убрать, это ерунда непонятная какая-то
    static createById(id) {
        let product_ids = BasketStore.getProductIds();
        product_ids[BasketStore.getKeyProductId(id)]
            ? delete product_ids[BasketStore.getKeyProductId(id)]
            : product_ids[BasketStore.getKeyProductId(id)] = id;
        BasketStore.setProductIds(product_ids);
    }
    // fixme убрать
    static getKeyProductId(product_id) {
        return BasketStore.PREFIX_ID + product_id;
    }
}
BasketStore.KEY_PRODUCT_IDS = 'shop_basket_product_ids';
// fixme убрать Нельзя тупо копировать то что ты использовала в прошлом проекте, нужно делать так как требует каждый проект,
//  здесь мы сохраняем массив ids без ключей
BasketStore.PREFIX_ID = 'id_';

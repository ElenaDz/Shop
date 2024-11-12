class BasketStore {
    static getProductIds() {
        return JSON.parse(localStorage.getItem(BasketStore.KEY_PRODUCT_IDS)) || {};
    }
    static setProductIds(product_ids) {
        localStorage.setItem(BasketStore.KEY_PRODUCT_IDS, JSON.stringify(product_ids));
    }
    static createById(id) {
        let product_ids = BasketStore.getProductIds();
        product_ids[BasketStore.getKeyProductId(id)]
            ? delete product_ids[BasketStore.getKeyProductId(id)]
            : product_ids[BasketStore.getKeyProductId(id)] = id;
        BasketStore.setProductIds(product_ids);
    }
    static getKeyProductId(product_id) {
        return BasketStore.PREFIX_ID + product_id;
    }
}
BasketStore.KEY_PRODUCT_IDS = 'shop_basket_product_ids';
BasketStore.PREFIX_ID = 'id_';

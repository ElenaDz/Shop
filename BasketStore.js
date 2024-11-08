class BasketStore {
    static getProductIds() {
        return;
    }
    static setProductIds(product_ids) {
        localStorage.setItem(BasketStore.KEY_PRODUCT_IDS, JSON.stringify(product_ids));
    }
}
BasketStore.KEY_PRODUCT_IDS = 'shop_basket_product_ids';

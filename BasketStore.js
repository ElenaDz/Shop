class BasketStore {
    static removeId(id) {
        let product_ids = BasketStore.getProductIds();
        product_ids = product_ids.filter((product_id) => product_id != id);
        BasketStore.setProductIds(product_ids);
        $('body').trigger(BasketStore.EVENT_REMOVE);
    }
    static addId(id) {
        let product_ids = BasketStore.getProductIds();
        product_ids.push(id);
        BasketStore.setProductIds(product_ids);
        $('body').trigger(BasketStore.EVENT_ADD);
    }
    static getProductIds() {
        return JSON.parse(localStorage.getItem(BasketStore.KEY_PRODUCT_IDS)) || [];
    }
    static setProductIds(product_ids) {
        localStorage.setItem(BasketStore.KEY_PRODUCT_IDS, JSON.stringify(product_ids));
    }
}
BasketStore.EVENT_ADD = 'BasketStore.EVENT_ADD';
BasketStore.EVENT_REMOVE = 'BasketStore.EVENT_REMOVE';
BasketStore.KEY_PRODUCT_IDS = 'shop_basket_product_ids';

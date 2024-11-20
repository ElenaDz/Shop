class BasketStore {
    constructor() {
        this.eventUpdate();
    }
    eventUpdate() {
        $('body').on(Basket.EVENT_UPDATE, (event, id) => {
            let product_ids = BasketStore.getProductIds();
            if (product_ids.length == 0) {
                product_ids.push(id);
                BasketStore.setProductIds(product_ids);
                return;
            }
            product_ids.find((product_id) => id == product_id)
                ? this.removeId(id)
                : this.addId(id);
        });
    }
    removeId(id) {
        let product_ids = BasketStore.getProductIds();
        product_ids.forEach((product_id, index) => {
            if (product_id == id) {
                product_ids.splice(index, 1);
            }
        });
        BasketStore.setProductIds(product_ids);
    }
    addId(id) {
        let product_ids = BasketStore.getProductIds();
        product_ids.push(id);
        BasketStore.setProductIds(product_ids);
    }
    static getProductIds() {
        return JSON.parse(localStorage.getItem(BasketStore.KEY_PRODUCT_IDS)) || [];
    }
    static setProductIds(product_ids) {
        localStorage.setItem(BasketStore.KEY_PRODUCT_IDS, JSON.stringify(product_ids));
    }
}
BasketStore.KEY_PRODUCT_IDS = 'shop_basket_product_ids';

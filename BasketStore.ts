class BasketStore
{
    private static KEY_PRODUCT_IDS = 'shop_basket_product_ids';

    constructor() {

        this.eventUpdate();
    }

    private  eventUpdate()
    {
        $('body').on(Basket.EVENT_UPDATE,(event,id : string) =>
        {
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

    private  removeId(id : string)
    {
        let product_ids = BasketStore.getProductIds();

        product_ids.forEach((product_id, index) =>
        {
            if (product_id == id) {
                product_ids.splice(index, 1);
            }
        })

        BasketStore.setProductIds(product_ids);
    }

    private addId(id : string)
    {
        let product_ids = BasketStore.getProductIds();

        product_ids.push(id);

        BasketStore.setProductIds(product_ids);
    }

    public static getProductIds(): string[]
    {
        return JSON.parse(localStorage.getItem(BasketStore.KEY_PRODUCT_IDS)) || [];
    }


    public static setProductIds(product_ids: string[])
    {
        localStorage.setItem(
            BasketStore.KEY_PRODUCT_IDS,
            JSON.stringify(product_ids)
        );
    }
}
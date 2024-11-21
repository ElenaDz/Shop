class BasketStore
{
    static readonly EVENT_ADD = 'BasketStore.EVENT_ADD';
    static readonly EVENT_REMOVE = 'BasketStore.EVENT_REMOVE';

    private static KEY_PRODUCT_IDS = 'shop_basket_product_ids';

    constructor() {

        $('body').on(Basket.EVENT_ADD_PRODUCT,(event, id : string) =>
        {
            this.addId(id);
        });

        $('body').on(Basket.EVENT_REMOVE_PRODUCT,(event, id : string) =>
        {
            this.removeId(id);
        });

    }

    private  removeId(id : string)
    {
        let product_ids = BasketStore.getProductIds();

        product_ids = product_ids.filter((product_id) => product_id != id)

        BasketStore.setProductIds(product_ids);

        $('body').trigger(BasketStore.EVENT_REMOVE);
    }

    private addId(id : string)
    {
        let product_ids = BasketStore.getProductIds();

        product_ids.push(id);

        BasketStore.setProductIds(product_ids);

        $('body').trigger(BasketStore.EVENT_ADD);
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
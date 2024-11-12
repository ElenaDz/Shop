class BasketStore
{
    private static KEY_PRODUCT_IDS = 'shop_basket_product_ids';
    private static PREFIX_ID = 'id_';

    public static getProductIds(): string[]
    {
        return JSON.parse(localStorage.getItem(BasketStore.KEY_PRODUCT_IDS)) || {};
    }

    public static setProductIds(product_ids: {})
    {
        localStorage.setItem(
            BasketStore.KEY_PRODUCT_IDS,
            JSON.stringify(product_ids)
        );
    }

    public static createById(id : string)
    {
        let product_ids = BasketStore.getProductIds();

        product_ids[BasketStore.getKeyProductId(id)]
            ? delete product_ids[BasketStore.getKeyProductId(id)]
            : product_ids[BasketStore.getKeyProductId(id)] = id;

        BasketStore.setProductIds(product_ids);
    }

    public static getKeyProductId(product_id: string) :string
    {
        return BasketStore.PREFIX_ID + product_id;
    }
}
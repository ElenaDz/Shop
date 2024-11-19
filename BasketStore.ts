class BasketStore
{
    private static KEY_PRODUCT_IDS = 'shop_basket_product_ids';

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
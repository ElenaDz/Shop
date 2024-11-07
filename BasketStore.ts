class BasketStore
{
    private static KEY_PRODUCT_IDS = 'basket_basket_product_ids';

    private static getProductIds(): string[]
    {
        return;
    }

    private static setProductIds(product_ids: string[])
    {
        localStorage.setItem(
            BasketStore.KEY_PRODUCT_IDS,
            JSON.stringify(product_ids)
        );
    }
}
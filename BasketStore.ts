class BasketStore
{
    private static KEY_PRODUCT_IDS = 'shop_basket_product_ids';
    // fixme убрать Нельзя тупо копировать то что ты использовала в прошлом проекте, нужно делать так как требует каждый проект,
    //  здесь мы сохраняем массив ids без ключей ok

    // fixme должен вращать массив а не объект ok
    public static getProductIds(): string[]
    {
        return JSON.parse(localStorage.getItem(BasketStore.KEY_PRODUCT_IDS)) || [];
    }

    // fixme должен принимать массив а не объект ok
    public static setProductIds(product_ids: string[])
    {
        localStorage.setItem(
            BasketStore.KEY_PRODUCT_IDS,
            JSON.stringify(product_ids)
        );
    }
}
class ProductMyStore
{

    private static KEY_LOCAL_STORE = 'products_my_store';
    private static PREFIX_ID = 'id_';

    private static getProductsMy(): {}
    {
        return
    }

    private static setProductsMy(products_my)
    {
        localStorage.setItem(
            ProductMyStore.KEY_LOCAL_STORE,
            JSON.stringify(products_my)
        );
    }

}
 class Product
{
    public $context: JQuery;

    constructor($context)
    {

    }

    private get in_basket():boolean
    {
        return;
    }


    private get id() : number
    {
        return
    }

    public get price(): number
    {
        return
    }

    public static create($context = $('.b_product')): Product[]
    {

        let $products = $context;
        /** @type {Product[]} */
        let products = [];
        console.log($products)
        $products.each((index, element) => {
            let product = $(element);
            // products.push(new Product(product));
        })
        return products;
    }

    // наполняет корзину в момент загрузки страницы продуктами,которые добавили ранее
    // 1 продукт возвращает

    public static createById(id):Product
    {
        return;
    }
}
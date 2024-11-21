
class Basket
{
    static readonly EVENT_ADD_PRODUCT = 'Basket.EVENT_ADD_PRODUCT';
    static readonly EVENT_REMOVE_PRODUCT = 'Basket.EVENT_EVENT_REMOVE_PRODUCT';

    private $context: JQuery;

    constructor($context: JQuery)
    {
        this.$context = $context;

        // @ts-ignore
        if (this.$context[0].Basket) return;

        // @ts-ignore
        this.$context[0].Basket = this;

        BasketStore.setProductIds(this.getProducts().map(product => product.id));

        this.updateText();

        $('body').on(BasketStore.EVENT_ADD +' , '+BasketStore.EVENT_REMOVE, () =>
        {
            this.updateText();
        })
    }


    public static hasProductByProductId(product_id: string):boolean
    {
        let product_ids = BasketStore.getProductIds();

        if (!product_ids) return false;

        return !!product_ids.find((id) => id == product_id);
    }

    public addProduct(id : string)
    {
        BasketStore.addId(id);
    }

    public removeProduct(id : string)
    {
        BasketStore.removeId(id);
    }

    public getSumPrices(): number
    {
        let sum:number = 0;

        this.getProducts().forEach((product) =>
        {
            sum = sum + product.price;
        })

        return sum;
    }

    public getCountProduct(): number
    {
        return this.getProducts().length;
    }

    public updateText()
    {
        let $info = this.$context.find('.info')

        if (this.getCountProduct() === 0) {
            $info.text('Пусто');

        } else {
            // @ts-ignore
            $info.text(
                this.getCountProduct()+' '
                + Basket.declofNum(this.getCountProduct(), ['товар', 'товара', 'товаров'])
                + ' на ' + this.getSumPrices() + ' p'
            );
        }
    }

    // @link https://ru.stackoverflow.com/questions/89458/%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE%D0%BA%D0%BE%D0%BD%D1%87%D0%B0%D0%BD%D0%B8%D1%8F-%D1%81%D0%BB%D0%BE%D0%B2%D0%B0-%D0%BF%D0%BE-%D1%87%D0%B8%D1%81%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%D1%83-1-%D0%B3%D0%BE%D0%B4-2-%D0%B3%D0%BE%D0%B4%D0%B0-5-%D0%BB%D0%B5%D1%82
    private static declofNum(number: number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    private getProducts(): Product[]
    {
        let products : Product[] = [];
        let product_ids = BasketStore.getProductIds();

        if (!product_ids) return;

        product_ids.forEach((id) =>
        {
            if (!Product.createById(id)) return;

            let product = Product.createById(id);

            products.push(product);
        })

        return products;
    }

    public static create($context = $('.b_basket')): Basket
    {
        return new Basket($context);
    }
}

class Basket
{
    static readonly EVENT_UPDATE = 'Basket.EVENT_UPDATE';

    // fixme одно и тоже храниться в двух местах в products и product_ids, так нельзя, риск рассинхронизации
    // fixme избавься от обоих свойств так как реально состоящие ты хранишь в Store пускай он и останется единственным местом хранения
    private products: Product[] = [];
    private product_ids = {};

    constructor(products: Product[])
    {
        products.forEach((product) =>
        {
            // fixme эта проверка должна быть не здесь, думай где и переноси
            if (this.hasProductByProductId(product.id)) {

                this.addProduct(product);
            }
        })

        this.updateText();

        BasketStore.setProductIds(this.product_ids);

        // fixme убрать отсюда, логика работы кнопок продукта должна быть у продукта, и не просто у продукта, а у кнопок продукта,
        //  уж точно не в корзине
        $('body').on(Basket.EVENT_UPDATE,(event, product: Product) =>
        {
            this.hasProductByProductId(product.id)
                ? this.removeProduct(product)
                : this.addProduct(product);

            BasketStore.createById(product.id);

            this.updateText();
        })
    }

    private updateText()
    {
        // fixme повторяющийся код вынести в переменную
        if (this.getCountProduct() === 0) {
            $('body').find('.info').text('Пусто');

        } else {
            // @ts-ignore
            $('body').find('.info').
                text(
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

    public hasProductByProductId(product_id: string):boolean
    {
        let product_ids = BasketStore.getProductIds();

        return ! product_ids[BasketStore.getKeyProductId(product_id)] == false ;
    }

    public addProduct(product: Product)
    {
        // fixme корзина не управляет продуктами, связь через события
        product.$context.addClass('in_basket');

        product.showButton();

        this.product_ids[BasketStore.getKeyProductId(product.id)] = product.id;

        this.products.push(product);
    }

    public removeProduct(product: Product)
    {
        product.$context.removeClass('in_basket');

        product.showButton();

        delete this.product_ids[BasketStore.getKeyProductId(product.id)];

        this.products.forEach((basket_product: Product, index) =>
        {
            if (product.id == basket_product.id) {
                this.products.splice(index, 1);
            }
        })
    }

    public getSumPrices(): number
    {
        let sum:number = 0;

        this.products.forEach((product) =>
        {
            sum = sum + product.price;
        })

        return sum;
    }

    public getCountProduct(): number
    {
        return this.products.length;
    }

    private getProducts(): Product[]
    {
        return this.products;
    }

    // fixme передовать в корзину продукты на этапе создания корзины не нужно это просто не логично - убрать
    // fixme метод должен возвращать корзину а не продукты
    public static create(products: Product[]): Product[]
    {
        return new Basket(products).getProducts();
    }
}
export class Basket
{
    static readonly EVENT_UPDATE = 'Basket.EVENT_UPDATE';

    private products: Product[] = null;


    constructor()
    {


        // подписываемся на событие Basket.EVENT_UPDATE, делаем updateText()

    //     Из стора берум массив Id по нему заполняем products: Product[] и из него берем цены
    }

    private updateText()
    {
        // @ts-ignore
        $('body').find('.info').
        html(
            this.getCountProduct()+' '+
            '<span>' + Basket.declofNum(this.getCountProduct(), ['товар', 'товара', 'товаров']) + 'на' + this.getSumPrices() + ' p' +'</span>'
        );

    }

    // @link https://ru.stackoverflow.com/questions/89458/%D0%A4%D1%83%D0%BD%D0%BA%D1%86%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-%D0%BE%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B5%D0%BD%D0%B8%D1%8F-%D0%BE%D0%BA%D0%BE%D0%BD%D1%87%D0%B0%D0%BD%D0%B8%D1%8F-%D1%81%D0%BB%D0%BE%D0%B2%D0%B0-%D0%BF%D0%BE-%D1%87%D0%B8%D1%81%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D0%BC%D1%83-1-%D0%B3%D0%BE%D0%B4-2-%D0%B3%D0%BE%D0%B4%D0%B0-5-%D0%BB%D0%B5%D1%82
    private static declofNum(number, titles) {
        let cases = [2, 0, 1, 1, 1, 2];
        return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    public hasProductByProductId(product_id: string):boolean
    {
        return ;
    }

    public addProduct(product: Product)
    {

    }

    public removeProduct(product_id: string)
    {

    }


    public getSumPrices(): number
    {
        return
    }

    public getCountProduct(): number
    {
        return
    }


    private getProducts(): Product[]
    {
        // Если массив равен нал, заполняем
        return ;
    }


    public static create(): Product[]
    {
        return
    }
}
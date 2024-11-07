import {Product} from "./Product";

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
        return ;
    }
}
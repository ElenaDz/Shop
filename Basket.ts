import {Product} from "./Product";

export class Basket
{
    static readonly EVENT_UPDATE = 'Basket.EVENT_UPDATE';

    private products: Product[] = null;


    constructor()
    {

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
        return ;
    }


    public static create(): Product[]
    {
        return ;
    }
}
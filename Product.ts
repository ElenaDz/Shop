class Product
{
    static readonly EVENT_SELECT = 'Product.EVENT_SELECT';
    public $context: JQuery;

    constructor($context: JQuery)
    {
        this.$context = $context;

        // @ts-ignore
        if (this.$context[0].Product) return;

        // @ts-ignore
        this.$context[0].Product = this;

        this.updateStatus();

        this.$context.find('button').on('click', () =>
        {
            // fixme событие обновления корзины должна генерировать корзина OK
            this.$context.trigger(Product.EVENT_SELECT, this);

            this.updateStatus();
        })
    }

    private get in_basket():boolean
    {
        return Basket.hasProductByProductId(this.id);
    }

    private updateStatus()
    {
        this.in_basket
            ? this.$context.addClass('in_basket')
            : this.$context.removeClass('in_basket');

    }

    public get id() : string
    {
        return this.$context.attr('id');
    }

    public get price(): number
    {
        return parseInt(this.$context.find('.number').text());
    }

    public static create($context = $('.b_product')): Product[]
    {
        let $products = $context;
        let products: Product[] = [];

        $products.each((index, element) => {
            let product = $(element);
            products.push(new Product(product));
        })
        return products;
    }

    public static createById(id : string):Product
    {
        let $context =  $('.b_product#'+id);

        if ($context.length > 0) return new Product($context);
    }
}
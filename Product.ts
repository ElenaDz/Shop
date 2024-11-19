class Product
{
    static readonly EVENT_UPDATE_STATUS = 'Product.EVENT_UPDATE_STATUS';
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
            this.$context.trigger(Basket.EVENT_UPDATE, this);
        })

        $('body').on(Product.EVENT_UPDATE_STATUS,() =>
        {
            this.updateStatus();
        })
    }

    // fixme не правильно, это проверка состояния состояние должно храниться в одном месте а именно в корзине,
    //  здесь нужно спросить у корзины есть ли там этот продукт ok
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
    // fixme убрать, перенеси эту логику в css, я уже говорил об этом видимо ты не поняла меня ok

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
        // fixme тип надо указывать в коде а не в комментарии ok
        let products: Product[] = [];

        $products.each((index, element) => {
            let product = $(element);
            products.push(new Product(product));
        })
        return products;
    }

    // todo переписать, этот метод не работает с BasketStore он делает тоже самое что выше метод create только
    //  создает не все продукты а один конкретный с заданным id ok
    public static createById(id : string):Product
    {
        let $context =  $('.b_product#'+id);

        if ($context.length > 0) return new Product($context);
    }
}
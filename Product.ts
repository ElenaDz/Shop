class Product
{
    public $context: JQuery;

    constructor($context)
    {
        this.$context = $context;

        // @ts-ignore
        if (this.$context[0].Product) return;

        // @ts-ignore
        this.$context[0].Product = this;

        this.showButton()

        this.$context.find('button').on('click', () =>
        {
            this.$context.trigger(Basket.EVENT_UPDATE, this);
        })
    }

    private get in_basket():boolean
    {
        return this.$context.hasClass('in_basket');
    }

    public showButton()
    {
        if (this.in_basket) {
            this.$context.find('.add').hide();
            this.$context.find('.delete').show();
        } else {
            this.$context.find('.delete').hide();
            this.$context.find('.add').show();
        }
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
        /** @type {Product[]} */
        let products = [];

        $products.each((index, element) => {
            let product = $(element);
            products.push(new Product(product));
        })
        return products;
    }

    // не поняла как использовыать этот метод, обошлась без него
    public static createById(id : string):Product
    {
        let $context = $('body').attr('id', id);

        BasketStore.createById(id);

        return  new Product($context);
    }
}
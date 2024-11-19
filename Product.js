class Product {
    constructor($context) {
        this.$context = $context;
        // @ts-ignore
        if (this.$context[0].Product)
            return;
        // @ts-ignore
        this.$context[0].Product = this;
        this.updateStatus();
        this.$context.find('button').on('click', () => {
            this.$context.trigger(Basket.EVENT_UPDATE, this);
        });
        $('body').on(Product.EVENT_UPDATE_STATUS, () => {
            this.updateStatus();
        });
    }
    // fixme не правильно, это проверка состояния состояние должно храниться в одном месте а именно в корзине,
    //  здесь нужно спросить у корзины есть ли там этот продукт ok
    get in_basket() {
        return Basket.hasProductByProductId(this.id);
    }
    updateStatus() {
        this.in_basket
            ? this.$context.addClass('in_basket')
            : this.$context.removeClass('in_basket');
    }
    // fixme убрать, перенеси эту логику в css, я уже говорил об этом видимо ты не поняла меня ok
    get id() {
        return this.$context.attr('id');
    }
    get price() {
        return parseInt(this.$context.find('.number').text());
    }
    static create($context = $('.b_product')) {
        let $products = $context;
        // fixme тип надо указывать в коде а не в комментарии ok
        let products = [];
        $products.each((index, element) => {
            let product = $(element);
            products.push(new Product(product));
        });
        return products;
    }
    // todo переписать, этот метод не работает с BasketStore он делает тоже самое что выше метод create только
    //  создает не все продукты а один конкретный с заданным id ok
    static createById(id) {
        let $context = $('.b_product#' + id);
        if ($context.length > 0)
            return new Product($context);
    }
}
Product.EVENT_UPDATE_STATUS = 'Product.EVENT_UPDATE_STATUS';

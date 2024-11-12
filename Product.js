class Product {
    constructor($context) {
        this.$context = $context;
        // @ts-ignore
        if (this.$context[0].Product)
            return;
        // @ts-ignore
        this.$context[0].Product = this;
        this.showButton();
        this.$context.find('button').on('click', () => {
            this.$context.trigger(Basket.EVENT_UPDATE, this);
        });
    }
    // fixme не правильно, это проверка состояния состояние должно храниться в одном месте а именно в корзине,
    //  здесь нужно спросить у корзины есть ли там этот продукт
    get in_basket() {
        return this.$context.hasClass('in_basket');
    }
    // fixme убрать, перенеси эту логику в css, я уже говорил об этом видимо ты не поняла меня
    showButton() {
        if (this.in_basket) {
            this.$context.find('.add').hide();
            this.$context.find('.delete').show();
        }
        else {
            this.$context.find('.delete').hide();
            this.$context.find('.add').show();
        }
    }
    get id() {
        return this.$context.attr('id');
    }
    get price() {
        return parseInt(this.$context.find('.number').text());
    }
    static create($context = $('.b_product')) {
        let $products = $context;
        // fixme тип надо указывать в коде а не в комментарии
        /** @type {Product[]} */
        let products = [];
        $products.each((index, element) => {
            let product = $(element);
            products.push(new Product(product));
        });
        return products;
    }
    // todo переписать, этот метод не работает с BasketStore он делает тоже самое что выше метод create только
    //  создает не все продукты а один конкретный с заданным id
    static createById(id) {
        let $context = $('body').attr('id', id);
        BasketStore.createById(id);
        return new Product($context);
    }
}

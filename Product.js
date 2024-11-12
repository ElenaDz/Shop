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
    get in_basket() {
        return this.$context.hasClass('in_basket');
    }
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
        /** @type {Product[]} */
        let products = [];
        $products.each((index, element) => {
            let product = $(element);
            products.push(new Product(product));
        });
        return products;
    }
    // не поняла как использовыать этот метод, обошлась без него
    static createById(id) {
        let $context = $('body').attr('id', id);
        BasketStore.createById(id);
        return new Product($context);
    }
}

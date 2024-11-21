class Product {
    constructor($context) {
        this.$context = $context;
        // @ts-ignore
        if (this.$context[0].Product)
            return;
        // @ts-ignore
        this.$context[0].Product = this;
        this.updateStatus();
        let basket = Basket.create();
        this.$context.find('button').on('click', () => {
            this.in_basket
                ? basket.removeProduct(this.id)
                : basket.addProduct(this.id);
        });
        $('body').on(BasketStore.EVENT_ADD + ' , ' + BasketStore.EVENT_REMOVE, () => {
            this.updateStatus();
        });
    }
    get in_basket() {
        return Basket.hasProductByProductId(this.id);
    }
    updateStatus() {
        this.in_basket
            ? this.$context.addClass('in_basket')
            : this.$context.removeClass('in_basket');
    }
    get id() {
        return this.$context.attr('id');
    }
    get price() {
        return parseInt(this.$context.find('.number').text());
    }
    static create($context = $('.b_product')) {
        let $products = $context;
        let products = [];
        $products.each((index, element) => {
            let product = $(element);
            products.push(new Product(product));
        });
        return products;
    }
    static createById(id) {
        let $context = $('.b_product#' + id);
        if ($context.length > 0)
            return new Product($context);
    }
}

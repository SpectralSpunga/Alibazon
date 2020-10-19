const stripe = Stripe('pk_test_51HcsLmGeV8SUiJfKQ4UOOj0v2N0R09Y3QlrgTWTuDinSHeUqcrth35mnOcgk7brDAirZxQjIlzVAdRKi5T8vaa5i00XfCEEFTs');

$('#checkout-button').on('click', async ()=>{
    const products = $('.product-cart');
    const items = [];

    for(let product of products){
        let name = $(product).find($('.product-name')).text();
        let quantity = $(product).find($('.product-quantity')).text();
        let price = parseFloat($(product).find($('.price')).text().replace('$', ''));

        items.push(
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name
                    },
                    unit_amount: price.toFixed(2) * 100
                }, 
                quantity
            }
        )
    }

    if(items.length > 0){
        const response = await axios({
            url: `/create-checkout-session`,
            method: 'post',
            data: { items }
        });
    
        stripe.redirectToCheckout({ sessionId: response.data.id })
    }
    else alert("Your cart is empty")
})
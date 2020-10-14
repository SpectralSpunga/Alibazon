function total(){
    let arr = $('.total').text().split('$');
    arr.shift()
    let total = 0;
    for(let elem of arr){
        total += parseFloat(elem)
    }
    $('#cart-total h3').text(`$${total.toFixed(2)}`)
}

$('.quantity').on('click', async (e)=>{
    let $price = $(e.target).parent().parent().parent().find($('.price'));
    let price = parseFloat($($price).text().split('$')[1])

    let $total = $(e.target).parent().parent().parent().find($('.total'));
    let total = parseFloat($($total).text().split('$')[1])

    if($(e.target).attr('class') === 'plus'){
        let q = parseInt($(e.target).prev().text());

        let product_id = $(e.target).parent().parent().parent().attr('value');
        let variant_id = $(e.target).parent().parent().parent().attr('id');
        let quantity = ++q;
        let headers = { "Content-Type":"application/json" }

        await axios({
            url: `/cart/changeItemQuantity`,
            method: 'post',
            data: {product_id, variant_id, quantity},
            headers
        });

        $($total).text(`$${(total + price).toFixed(2)}`)
        $(e.target).prev().text(q)
        
        let arr = $('.total').text().split('$');
        arr.shift()
        let cartTotal = 0;
        for(let elem of arr){
            cartTotal += parseFloat(elem)
        }
        $('#cart-total h3').text(`$${cartTotal.toFixed(2)}`)
    }
    else if($(e.target).attr('class') === 'minus'){
        let product_id = $(e.target).parent().parent().parent().attr('value');
        let variant_id = $(e.target).parent().parent().parent().attr('id');

        if(parseInt($(e.target).next().text()) === 1){
            let headers = { "Content-Type":"application/json" }

            await axios({
                url: `/cart/removeItem`,
                method: 'post',
                data: {product_id, variant_id},
                headers
            });

            $(e.target).parent().parent().parent().hide();
        }

        let q = parseInt($(e.target).next().text());

        let quantity = --q;
        let headers = { "Content-Type":"application/json" }
        await axios({
            url: `/cart/changeItemQuantity`,
            method: 'post',
            data: {product_id, variant_id, quantity},
            headers
        });

        $($total).text(`$${(total - price).toFixed(2)}`)
        $(e.target).next().text(q)

        let arr = $('.total').text().split('$');
        arr.shift()
        let cartTotal = 0;
        for(let elem of arr){
            cartTotal += parseFloat(elem)
        }
        $('#cart-total h3').text(`$${cartTotal.toFixed(2)}`)
    }
})

total()

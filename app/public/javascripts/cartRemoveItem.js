$('.trash').on('click', async (e)=>{
    let product_id = $(e.target).parent().parent().attr('value');
    let variant_id = $(e.target).parent().parent().attr('id');

    let headers = { "Content-Type":"application/json" }

    await axios({
        url: `/cart/removeItem`,
        method: 'post',
        data: {product_id, variant_id},
        headers
    });

    $(e.target).parent().parent().remove();

    let arr = $('.total').text().split('$');
    arr.shift()
    let cartTotal = 0;
    for(let elem of arr){
        cartTotal += parseFloat(elem)
    }
    $('#cart-total h3').text(`$${cartTotal.toFixed(2)}`)
})
// $('.addToCart').on('click', async (e)=>{
//     let quantity = parseInt($('.quantity p').text());
//     let product_id = e.target.value;
//     let variant_id = e.target.id;
//     let headers = { "Content-Type":"application/json" }

//     await axios({
//         url: `/cart/add`,
//         method: 'post',
//         data: {product_id, variant_id, quantity},
//         headers
//     });
//     $(e.target).attr('disabled', 'true')
// })

// $('.addToWishlist').on('click', async (e)=>{
//     let quantity = parseInt($('.quantity p').text());
//     let product_id = e.target.value;
//     let variant_id = e.target.id;
//     let headers = { "Content-Type":"application/json" }

//     await axios({
//         url: `/wishlist/add`,
//         method: 'post',
//         data: {product_id, variant_id, quantity},
//         headers
//     });
//     $(e.target).attr('disabled', 'true')
// })

$('.addFromWishlist').on('click', async (e)=>{
    let q = $(e.target).parent().parent().find($('.quantity p'));
    let quantity = parseInt($(q).text());
    let product_id = $(e.target).parent().parent().attr('value');
    let variant_id = $(e.target).parent().parent().attr('id');
    let headers = { "Content-Type":"application/json" }

    await axios({
        url: `/cart/add`,
        method: 'post',
        data: {product_id, variant_id, quantity},
        headers
    });

    await axios({
        url: `/wishlist/removeItem`,
        method: 'post',
        data: {product_id, variant_id},
        headers
    });

    $(e.target).parent().parent().remove();
})

$('.product-btn').on('click', async (e)=>{
    let quantity = parseInt($('.quantity p').text());
    let product_id = e.target.value;
    let variant_id = e.target.id;
    let headers = { "Content-Type":"application/json" }
    let url = ''

    if($(e.target).attr('class') === "addToCart" ) url = "/cart/add"
    else if($(e.target).attr('class') === "addToWishlist") url = "/wishlist/add"

    await axios({
        url,
        method: 'post',
        data: {product_id, variant_id, quantity},
        headers
    });

    $(e.target).attr('disabled', 'true')
})
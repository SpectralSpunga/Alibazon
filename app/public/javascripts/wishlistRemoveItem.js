$('.trash').on('click', async (e)=>{
    let product_id = $(e.target).parent().parent().attr('value');
    let variant_id = $(e.target).parent().parent().attr('id');

    let headers = { "Content-Type":"application/json" }

    await axios({
        url: `/wishlist/removeItem`,
        method: 'post',
        data: {product_id, variant_id},
        headers
    });

    $(e.target).parent().parent().remove();
})
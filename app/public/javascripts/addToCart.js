$('.addToCart').on('click', async (e)=>{

    const arr = $('button[style*="color: crimson"]');
    let arr2= {};
    $(arr).each((i, elem)=>{
        arr2[elem.name] =  elem.value
    })

    let quantity = parseInt($('.quantity p').text());

    let product_id = e.target.value;
    let headers = { "Content-Type":"application/json" }

    await axios({
        url: `/cart/add`,
        method: 'post',
        data: {product_id, variations: arr2, quantity},
        headers
    });

    $(e.target).attr('disabled', 'true')
})

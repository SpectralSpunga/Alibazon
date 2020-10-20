const $arr = $('.productId')
let arr = [];
$($arr).each(async (i, elem)=>{
    let productId = $(elem).attr('id')
    let headers = { "Content-Type":"application/json" }

    let product = await axios({
        url: `/productById/${productId}`,
        method: 'get',
        headers
    });

    $(elem).text(product.data.product[0].name)
    const img = $(elem).prev().find($('img'));
    $(img).attr('src', "/images/" + product.data.product[0].image_groups[0].images[0].link)
    $(img).attr('alt', product.data.product[0].image_groups[0].images[0].alt)
})
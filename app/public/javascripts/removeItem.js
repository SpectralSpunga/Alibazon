import { Req } from './requests.js'
const AJAX = Req()

$('.trash').on('click', async (e)=>{
    //getting info for request
    let product_id = $(e.target).parent().parent().attr('value');
    let variant_id = $(e.target).parent().parent().attr('id');
    let url = ($('title').text() === 'Wishlist') ? "wishlist" : ($('title').text() === 'Cart') ? "cart" : undefined;

    //if url is defined
    if(url){
        //removing item
        await AJAX.removeItem(product_id, variant_id, url)
        $(e.target).parent().parent().remove();

        //if cart change total
        if(url === "cart"){
            let arr = $('.total').text().split('$').shift();
            let cartTotal = arr.reduce((acc, elem)=> parseFloat(acc) + parseFloat(elem));
            $('#cart-total h3').text(`$${cartTotal.toFixed(2)}`)
        }
    }
})
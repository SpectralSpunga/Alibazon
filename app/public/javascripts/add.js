import { Req } from "./requests.js"
const AJAX = Req();

function add(selector){
    $(selector).on('click', async (e)=>{
        if(!['addToCart', 'addToWishlist'].includes($(e.target).attr('class'))) return;
        //getting product info
        let $quantity = $(e.target).parent().parent().find($('.quantity p'));
        let quantity = parseInt($($quantity).text());
        let product_id = e.target.value;
        let variant_id = e.target.id;
        let url = ''
    
        if($(e.target).attr('class') === "addToCart") url = "cart"
        else if($(e.target).attr('class') === "addToWishlist") url = "wishlist"
    
        //adding item to cart || wishlist
        await AJAX.addItem(product_id, variant_id, quantity, url)

        //if add from wishlist --> remove item from wihslist
        if($('title').text() === "Wishlist"){
            await AJAX.removeItem(product_id, variant_id, "wishlist");
            $(e.target).parent().parent().remove();
        }
        else $(e.target).attr('disabled', 'true')
    })
}

add('.product-btn');

export { add }
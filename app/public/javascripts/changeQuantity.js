import { Req } from "./requests.js";
import totalCart from "./total.js"
const AJAX = Req();

$('.quantity').on('click', async (e)=>{
    //getting price and total
    let $price = $(e.target).parent().parent().parent().find($('.price'));
    let price = parseFloat($($price).text().split('$')[1])
    let $total = $(e.target).parent().parent().parent().find($('.total'));
    let total = parseFloat($($total).text().split('$')[1]);

    //getting product info
    let product_id = $(e.target).parent().parent().parent().attr('value');
    let variant_id = $(e.target).parent().parent().parent().attr('id');
    let url = ($('title').text() === 'Wishlist') ? "wishlist" : ($('title').text() === 'Cart') ? "cart" : undefined;
    if(url){

        //incrementing quantity
        if($(e.target).attr('class') === 'plus'){
            let quantity = parseInt($(e.target).prev().text());
            let url = ($('title').text() === 'Wishlist') ? "wishlist" : ($('title').text() === 'Cart') ? "cart" : undefined;
            quantity += 1;

            await AJAX.changeQuantity(product_id, variant_id, quantity, url)
            
            $($total).text(`$${(total + price).toFixed(2)}`)
            $(e.target).prev().text(quantity)
        }
        //decrementing quantity
        else if($(e.target).attr('class') === 'minus'){
            let quantity = parseInt($(e.target).next().text());
            if(quantity === 1){
                await AJAX.removeItem(product_id, variant_id, url);
                $(e.target).parent().parent().parent().remove();
                totalCart()
                return undefined;
            }
            quantity -= 1;
    
            await AJAX.changeQuantity(product_id, variant_id, quantity, url)
    
            $($total).text(`$${(total - price).toFixed(2)}`)
            $(e.target).next().text(quantity)
        }
        totalCart()
    }
})

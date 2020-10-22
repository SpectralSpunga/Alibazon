jQuery(function() { 
    let products = $('.product-elem');

    function moreProducts(numberOfItems){
        let arr = [];
        let arr2 = []
        if(products.length > numberOfItems){
            for(let i = 0; i < numberOfItems; i++){
                arr.push(products[i])
            }
            for(let i = numberOfItems; i < numberOfItems + 25; i++){
                arr2.push(products[i])
            }
        
            $('.product-elem').remove()
            $('.main-grid').append(arr)
            $('hr').append('<button class="more-products">MORE PRODUCTS</button>')
            $('.more-products').on('click', function(e){
                $('.main-grid').append(arr2)
                $('.more-products').remove()
                moreProducts(numberOfItems + 25)
            })
        }
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
    }
    moreProducts(25)
})
import { add } from "./add.js";

jQuery(function() { 
    let products = $('.product-elem');

    function moreProducts(num){
        if(products.length > num){
            let first25 = $(products).slice(0, num); 
            let next25 = $(products).slice(num, num + 25);

            $('.product-elem').remove()
            $('.catalog').append(first25)
            add('.product-btn');
            $('.catalog').append('<button class="more-products">MORE PRODUCTS</button>')
            $('.more-products').on('click', function(e){
                $('.product-elem').remove()
                $('.catalog').append(first25)
                $('.catalog').append(next25)
                $('.more-products').remove()
                add('.product-btn');
                moreProducts(num + 25)
            })
        }
    }
    moreProducts(25)
})
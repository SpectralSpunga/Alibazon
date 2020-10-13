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
    }
    moreProducts(25)
})
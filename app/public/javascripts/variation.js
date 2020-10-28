import { Req } from "./requests.js";

(async function productPage(){
    const AJAX = Req()
    //convert string with html to html
    $('.description-p').html($('.description-p').text())

    //global variables
    const no_style = { "background-color":  "#F2F2F2",
    "color": "#F24162" }
    const style = { "background-color":  "#F24162",
        "color": "#F2F2F2" }
    const product_id = $('.addToCart').attr('value');
    //load product
    let product = await AJAX.loadProduct(product_id); 

    //define default variants and check
    $('.sizeVariant').first().css(style)
    $('.colorVariant').first().css(style)
    $('.widthVariant').first().css(style)
    $('.accessorySizeVariant').first().css(style)

    $('.sizeVariant').first().addClass('checked')
    $('.colorVariant').first().addClass('checked')
    $('.widthVariant').first().addClass('checked')
    $('.accessorySizeVariant').first().addClass('checked')
    checkVariant()

    //change style of clicked variant and check if variant is available
    $('.product-text').on('click', (e)=>{
        if( ['color', 'width', 'size'].includes($(e.target).attr('name')) ){
            $(e.target).parent().children().css(no_style)
            $(e.target).parent().find('p').css({"color":"black"})
            $(e.target).parent().children().removeClass('checked')
            $(e.target).css(style)
            $(e.target).addClass('checked')
            checkVariant()
        }
    })

    //check variant for availability
    function checkVariant(){
        const arr = $('.checked');
        let variantObj = {};
        $(arr).each((i, elem)=> variantObj[elem.name] = elem.value )
        const variantArr = Object.values(variantObj)

        const variants = product.variants;

        for(let elem of variants){
            const arr0 = Object.values(elem.variation_values)
            let temp = compare(arr0, variantArr);
            if(temp) {
                $('.price').html("Price: <b>$" + elem.price + "</b>");
                $('.addToCart').removeAttr('disabled')
                $('.addToWishlist').removeAttr('disabled')
                $('.addToCart').attr('id', elem.product_id)
                $('.addToWishlist').attr('id', elem.product_id);
                return 0;
            }
            else{
                $('.price').html(`<b>SOLD OUT</b>`);
                $('.addToCart').attr('disabled', 'true');
                $('.addToCart').attr('id', '');
                $('.addToWishlist').attr('id', '');
            }
        };
    }

    //compare two arrays
    function compare(arr1, arr2){
        let count = 0;
        for(let elem of arr1){
            if(arr2.includes(elem)) count++
            else count = 0

            if(count === arr1.length) return true
        }
        return false;
    }

    //decrement quantity
    $('.minus').on('click', ()=>{
        let q = parseInt($('.quantity p').text());
        if(q > 1) $('.quantity p').text(--q)
        $('.addToCart').removeAttr('disabled')
        $('.addToWishlist').removeAttr('disabled')
    })

    //increment quantity
    $('.plus').on('click', ()=>{
        let q = parseInt($('.quantity p').text());
        $('.quantity p').text(++q)
        $('.addToCart').removeAttr('disabled')
        $('.addToWishlist').removeAttr('disabled')
    })
})()
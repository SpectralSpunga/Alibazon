const noStyle = { "color": "black" }
const style = { "color": "crimson" }

$('.description-p').html($('.description-p').text())
$('.product-elem').css({"margin":"auto", "max-width":"600px"})

$('.sizeVariant').first().css(style)
$('.colorVariant').first().css(style)
$('.widthVariant').first().css(style)
$('.accessorySizeVariant').first().css(style)

function variant(str){
    $(str).on('click', function(e){
        $(str).each(function(index, elem){
            $(elem).css(noStyle)
        })
        const btn = e.target;
        $(btn).css(style)
    })
}

variant('.sizeVariant')
variant('.colorVariant')
variant('.widthVariant')
variant('.accessorySizeVariant')

let price = $('.price').text();

async function check(){
    const arr = $('button[style*="color: crimson"]');
    if(arr.length > 0){
        let arr2= {};
        $(arr).each((i, elem)=>{
            arr2[elem.name] =  elem.value
        })

        let quantity = parseInt($('.quantity p').text());

        let product_id = $('.addToCart').attr('value');

        let headers = { "Content-Type":"application/json" }
        let datad = await axios({
            url: `/cart/check`,
            method: 'post',
            data: {product_id, variations: arr2, quantity},
            headers
        });

        $('.addToCart').attr('id', datad.data.variant.product_id)
        $('.addToWishlist').attr('id', datad.data.variant.product_id)

        if(datad.data === 'sold out') {
            $('.check').attr('disabled', 'true')
            $('.addToCart').attr('disabled', 'true')
            $('.price').text('Price: SOLD OUT')
        }
        else {
            $('.check').removeAttr('disabled')
            $('.addToCart').removeAttr('disabled')
            $('.price').text("Price: $" + datad.data.variant.price)
        }
    }
    else{
        $('.check').attr('disabled', 'true')
        $('.addToCart').attr('disabled', 'true')
        $('.price').text('Price: SOLD OUT')
    }
}

check();

function checkVariant(str){
    $(str).on('click', check)
}

checkVariant('.sizeVariant')
checkVariant('.colorVariant')
checkVariant('.widthVariant')
checkVariant('.accessorySizeVariant')

$('.minus').on('click', ()=>{
    let q = parseInt($('.quantity p').text());
    if(q > 1) $('.quantity p').text(--q)
})

$('.plus').on('click', ()=>{
    let q = parseInt($('.quantity p').text());
    $('.quantity p').text(++q)
})
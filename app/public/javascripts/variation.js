import { Req } from "./requests.js";
const AJAX = Req()

const noStyle = { "color": "black" }
const style = { "color": "crimson" }
let product_id = $('.addToCart').attr('value');
let variants = '';

async function loadVariants(){
    let data = await AJAX.loadProduct(product_id)
    variants = data.variants;
    check()
}

$('.description-p').html($('.description-p').text())

function changeColor(arrOfClasses){
    arrOfClasses.forEach( (elem, i) => {
        $(elem).on('click', (e) => {
            $(elem).each((index, val) => $(val).css(noStyle) )
            $(e.target).css(style)
        })
    })
}

function check(){
    const arr = $('button[style*="color: crimson"]');
    console.dir(arr)
    let arr2= {};
    $(arr).each((i, elem)=>{
        arr2[elem.name] =  elem.value
    })

    let objArr = Object.keys(arr2).length;
    let count = 0;

    for(let variant of variants){
        for(let prop in variant.variation_values){
            if(variant.variation_values[prop] === arr2[prop]) count++
            else count = 0

            if(count === objArr) {
                $('.price').text(`Price: $${variant.price}`);
                $('.addToCart').removeAttr('disabled')
                $('.addToWishlist').removeAttr('disabled')
                $('.addToCart').attr('id', variant.product_id)
                $('.addToWishlist').attr('id', variant.product_id)
                return 0;
            };
        }
    }
    $('.price').text('SOLD OUT');
    $('.addToCart').attr('disabled', 'true')
    return 0;
}

function checkVariant(str){
    $(str).on('click', check)
}

$('.minus').on('click', ()=>{
    let q = parseInt($('.quantity p').text());
    if(q > 1) $('.quantity p').text(--q)
    $('.addToCart').removeAttr('disabled')
    $('.addToWishlist').removeAttr('disabled')
})

$('.plus').on('click', ()=>{
    let q = parseInt($('.quantity p').text());
    $('.quantity p').text(++q)
    $('.addToCart').removeAttr('disabled')
    $('.addToWishlist').removeAttr('disabled')
})

$('.sizeVariant').first().css(style)
$('.colorVariant').first().css(style)
$('.widthVariant').first().css(style)
$('.accessorySizeVariant').first().css(style)

changeColor(['.sizeVariant', '.colorVariant', '.widthVariant', '.accessorySizeVariant'])

loadVariants()

checkVariant('.sizeVariant')
checkVariant('.colorVariant')
checkVariant('.widthVariant')
checkVariant('.accessorySizeVariant')
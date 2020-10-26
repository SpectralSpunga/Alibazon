import { Req } from "./requests.js";
const AJAX = Req()

let product;
let product_id = $('.addToCart').attr('value');
(async function productDataLoader(){
    product = await AJAX.loadProduct(product_id)
})()

//change image on click
$('.other-images div').on('click', (e)=>{
    $('.main-image img').attr('src', $(e.target).attr('src'))
    $('.main-image img').attr('alt', $(e.target).attr('alt'))
})

$('.colorVariant').on('click', (e)=>{
    //searching for corresponding image group for color variant
    let image_group = product.image_groups.filter((elem, i)=> elem.variation_value === $(e.target).attr('value') && elem.view_type === 'large')
    image_group = image_group[0];

    //changing main image
    $('.main-image img').attr('src', "/images/" + image_group.images[0].link)
    $('.main-image img').attr('alt', image_group.images[0].alt)

    //changing other images
    let newImages = $('<div class="other-images"></div>');
    for(let i in image_group.images){
        $(newImages).append(`
        <div>
            <img src=/images/${image_group.images[i].link} alt=${image_group.images[i].alt}>
        </div>`)
    }
    $('.other-images').remove()
    $('.images').append(newImages)

    //change image on click
    $('.other-images div').on('click', (e)=>{
        $('.main-image img').attr('src', $(e.target).attr('src'))
        $('.main-image img').attr('alt', $(e.target).attr('alt'))
    })
})
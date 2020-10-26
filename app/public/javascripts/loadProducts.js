import { Req } from "./requests.js";
const AJAX = Req()
const $arr = $('.product-cart');

let products = $arr.map( (i, elem) => {
    return {
        productId: $(elem).attr('value'),
        variantId: $(elem).attr('id')
    }
})

products.each( async (index, variant) => {
    let product = await AJAX.loadProduct(variant.productId);
    if(product instanceof Error) product = await AJAX.loadProduct(variant.productId);

    //add name and category
    $($arr[index]).find('.product-name').text(product.name);
    $($arr[index]).find('.primary-category-id').text(product.primary_category_id);

    //add image
    let imgId = $($arr[index]).find('img').attr('id')
    let imgObj = product.image_groups.filter( (elem, i)=> elem.variation_value === imgId && elem.view_type === 'large' )

    if(imgObj.length === 0){
        $($arr[index]).find('img').attr('src', `/images/${product.image_groups[0].images[0].link}`);
        $($arr[index]).find('img').attr('alt', product.image_groups[0].images[0].alt);
    }
    else {
        $($arr[index]).find('img').attr('src', `/images/${imgObj[0].images[0].link}`);
        $($arr[index]).find('img').attr('alt', imgObj[0].images[0].alt);
    }

    //add variation attributes
    let variantObj = product.variants.filter((elem, i)=> variant.variantId === elem.product_id)

    product.variation_attributes.forEach((elem, i)=> {
        let temp = elem.values.filter((val, j)=> variantObj[0].variation_values[elem.id] === val.value)
        delete variantObj[0].variation_values[elem.id]
        variantObj[0].variation_values[elem.name] = temp[0].name;
    })
    variantObj = Object.entries(variantObj[0].variation_values)

    variantObj.forEach((elem, k)=>{
        $($arr[index]).find('.variantions').append(`<p>${elem[0]}: ${elem[1]}</p>`);
    })

    //add total
    let price = parseFloat($($arr[index]).find('.price').text().replace('$', ''));
    let quantity = parseInt($($arr[index]).find('.product-quantity').text());
    $($arr[index]).find('.total').text(`$${(price * quantity).toFixed(2)}`)
})
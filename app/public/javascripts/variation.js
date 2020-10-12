const noStyle = {
    "color": "black"
}
const style = {
    "color": "crimson"
}

$('.description-p').html($('.description-p').text())
$('.product-elem').css({"margin":"auto", "max-width":"600px"})

$('.sizeVariant').first().css(style)
$('.colorVariant').first().css(style)

$('.sizeVariant').on('click', function(e){
    $('.sizeVariant').each(function(index, elem){
        $(elem).css(noStyle)
    })
    const btn = e.target;
    $(btn).css(style)
})

$('.colorVariant').on('click', function(e){
    $('.colorVariant').each(function(index, elem){
        $(elem).css(noStyle)
    })
    const btn = e.target;
    $(btn).css(style)
})

$('.minus').on('click', ()=>{
    let q = parseInt($('.quantity p').text());
    if(q > 1){
        q--
        $('.quantity p').text(q)
    }
})

$('.plus').on('click', ()=>{
    let q = parseInt($('.quantity p').text());
    q++
    $('.quantity p').text(q)
})
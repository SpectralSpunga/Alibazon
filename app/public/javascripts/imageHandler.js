let datad = ''
async function productDataLoader(){
    let headers = { "Content-Type":"application/json" }
    datad = await axios({
        url: `/productById/${product_id}`,
        method: 'get',
        headers
    });
}

productDataLoader()

$('.other-images div').on('click', (e)=>{
    $('.main-image img').attr('src', $(e.target).attr('src'))
    $('.main-image img').attr('alt', $(e.target).attr('alt'))
})

$('.colorVariant').on('click', (e)=>{
    for(let image_group of datad.data.product[0].image_groups){
        if(image_group.variation_value === $(e.target).attr('value') && image_group.view_type === 'large'){
            $('.main-image img').attr('src', "/images/" + image_group.images[0].link)
            $('.main-image img').attr('alt', image_group.images[0].alt)

            let newImages = $('<div class="other-images"></div>');
            for(let i = 0; i < image_group.images.length; i++){
                $(newImages).append(`
                <div>
                    <img src=/images/${image_group.images[i].link} alt=${image_group.images[0].alt}>
                </div>`)
            }
            $('.other-images').remove()
            $('.images').append(newImages)
        }
    }
    $('.other-images div').on('click', (e)=>{
        $('.main-image img').attr('src', $(e.target).attr('src'))
        $('.main-image img').attr('alt', $(e.target).attr('alt'))
    })
})
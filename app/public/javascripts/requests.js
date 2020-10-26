function Req(){
    var headers = { "Content-Type":"application/json" }

    async function addItem(product_id, variant_id, quantity, url){
        try{
            await axios({
                url: `/${url}/add`,
                method: 'post',
                data: {product_id, variant_id, quantity},
                headers
            });
        } catch(err){
            return err
        }
    }

    async function removeItem(product_id, variant_id, url){
        try{
            await axios({
                url: `/${url}/removeItem`,
                method: 'post',
                data: {product_id, variant_id},
                headers
            });
        } catch(err){
            return err
        }
    }

    async function changeQuantity(product_id, variant_id, quantity, url){
        try{
            await axios({
                url: `/${url}/changeItemQuantity`,
                method: 'post',
                data: {product_id, variant_id, quantity},
                headers
            });
        } catch(err){
            return err
        }
    }

    async function loadProduct(product_id){
        try{
            let result = await axios({
                url: `/productById/${product_id}`,
                method: 'get',
                headers
            });

            return result.data.product[0]
        } catch(err){
            return err
        }
    }

    return {
        addItem,
        removeItem,
        changeQuantity,
        loadProduct
    }
}

export { Req }
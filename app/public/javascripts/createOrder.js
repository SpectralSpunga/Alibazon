(async function createOrderDeleteCart(){
    await axios({
        url: `/orders`,
        method: 'post'
    });
    
    await axios({
        url: `/cart`,
        method: 'delete'
    });
})()
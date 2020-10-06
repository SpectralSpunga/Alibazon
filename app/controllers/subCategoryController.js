const https = require('https');
const secretKey = "%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2";
const API = "https://osf-digital-backend-academy.herokuapp.com/api";

function clothingMens(req, res, next){
    let resultStr = "";
    let resultStrRoot = "";
    let result = [];
    let resultRoot = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get(`${API}/categories/parent/mens-clothing?secretKey=${secretKey}`, response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            https.get(`${API}/categories/parent/mens?secretKey=${secretKey}`, response2=>{
                response2.on('data', data=>{
                    resultStrRoot += data.toString();
                })
                response2.on('end', ()=>{
                    resultRoot = JSON.parse(resultStrRoot);
        
                    resultRoot.forEach(elem=>{
                        if(elem.name === 'Clothing'){
                            mainCategory = elem.name;
                            categoryDesc = elem.page_description;
                        }
                    })

                    return res.render('category', 
                    {
                        mens: result, 
                        mainCategory, 
                        categoryDesc,
                        links : [
                            {
                                link: 'mens',
                                ap: 'Mens'
                            },
                            {
                                link: 'mens/clothing',
                                ap: 'Clothing'
                            }
                        ]
                    })
                })
            })
        })
    })
}

function accessoriesMens(req, res, next){
    let resultStr = "";
    let resultStrRoot = "";
    let result = [];
    let resultRoot = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get(`${API}/categories/parent/mens-accessories?secretKey=${secretKey}`, response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            https.get(`${API}/categories/parent/mens?secretKey=${secretKey}`, response2=>{
                response2.on('data', data=>{
                    resultStrRoot += data.toString();
                })
                response2.on('end', ()=>{
                    resultRoot = JSON.parse(resultStrRoot);
        
                    resultRoot.forEach(elem=>{
                        if(elem.name === 'Accessories'){
                            mainCategory = elem.name;
                            categoryDesc = elem.page_description;
                        }
                    })

                    return res.render('category', 
                    {
                        mens: result, 
                        mainCategory, 
                        categoryDesc,
                        links : [
                            {
                                link: 'mens',
                                ap: 'Mens'
                            },
                            {
                                link: 'mens/accessories',
                                ap: 'Accessories'
                            }
                        ]
                    })
                })
            })
        })
    })
}

function clothingWomens(req, res, next){
    let resultStr = "";
    let resultStrRoot = "";
    let result = [];
    let resultRoot = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get(`${API}/categories/parent/womens-clothing?secretKey=${secretKey}`, response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            https.get(`${API}/categories/parent/womens?secretKey=${secretKey}`, response2=>{
                response2.on('data', data=>{
                    resultStrRoot += data.toString();
                })
                response2.on('end', ()=>{
                    resultRoot = JSON.parse(resultStrRoot);
        
                    resultRoot.forEach(elem=>{
                        if(elem.name === 'Clothing'){
                            mainCategory = elem.name;
                            categoryDesc = elem.page_description;
                        }
                    })

                    return res.render('category', 
                    {
                        mens: result, 
                        mainCategory, 
                        categoryDesc,
                        links : [
                            {
                                link: 'womens',
                                ap: 'Womens'
                            },
                            {
                                link: 'womens/clothing',
                                ap: 'Clothing'
                            }
                        ]
                    })
                })
            })
        })
    })
}

function accessoriesWomens(req, res, next){
    let resultStr = "";
    let resultStrRoot = "";
    let result = [];
    let resultRoot = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get(`${API}/categories/parent/womens-accessories?secretKey=${secretKey}`, response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            https.get(`${API}/categories/parent/womens?secretKey=${secretKey}`, response2=>{
                response2.on('data', data=>{
                    resultStrRoot += data.toString();
                })
                response2.on('end', ()=>{
                    resultRoot = JSON.parse(resultStrRoot);
        
                    resultRoot.forEach(elem=>{
                        if(elem.name === 'Accessories'){
                            mainCategory = elem.name;
                            categoryDesc = elem.page_description;
                        }
                    })

                    return res.render('category', 
                    {
                        mens: result, 
                        mainCategory, 
                        categoryDesc,
                        links : [
                            {
                                link: 'womens',
                                ap: 'Womens'
                            },
                            {
                                link: 'womens/accessories',
                                ap: 'Accessories'
                            }
                        ]
                    })
                })
            })
        })
    })
}

function jewelryWomens(req, res, next){
    let resultStr = "";
    let resultStrRoot = "";
    let result = [];
    let resultRoot = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get(`${API}/categories/parent/womens-jewelry?secretKey=${secretKey}`, response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            https.get(`${API}/categories/parent/womens?secretKey=${secretKey}`, response2=>{
                response2.on('data', data=>{
                    resultStrRoot += data.toString();
                })
                response2.on('end', ()=>{
                    resultRoot = JSON.parse(resultStrRoot);
        
                    resultRoot.forEach(elem=>{
                        if(elem.name === 'Jewelry'){
                            mainCategory = elem.name;
                            categoryDesc = elem.page_description;
                        }
                    })

                    return res.render('category', 
                    {
                        mens: result, 
                        mainCategory, 
                        categoryDesc,
                        links : [
                            {
                                link: 'womens',
                                ap: 'Womens'
                            },
                            {
                                link: 'womens/jewelry',
                                ap: 'Jewelry'
                            }
                        ]
                    })
                })
            })
        })
    })
}

module.exports = { clothingMens, accessoriesMens, accessoriesWomens, jewelryWomens, clothingWomens }
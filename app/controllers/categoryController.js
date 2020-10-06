const https = require('https');
const secretKey = "%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2";
const API = "https://osf-digital-backend-academy.herokuapp.com/api";

function categoryMens(req, res, next){
    let resultStr = "";
    let resultStrRoot = "";
    let result = [];
    let resultRoot = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get(`${API}/categories/parent/mens?secretKey=${secretKey}`, response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            https.get(`${API}/categories/parent/root?secretKey=${secretKey}`, response2=>{
                response2.on('data', data=>{
                    resultStrRoot += data.toString();
                })
                response2.on('end', ()=>{
                    resultRoot = JSON.parse(resultStrRoot);
        
                    resultRoot.forEach(elem=>{
                        if(elem.name === 'Mens'){
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
                            }
                        ]
                    })
                })
            })
        })
    })
}

function categoryWomens(req, res, next){
    let resultStr = "";
    let resultStrRoot = "";
    let result = [];
    let resultRoot = [];
    let mainCategory = "";
    let categoryDesc = '';

    https.get(`${API}/categories/parent/womens?secretKey=${secretKey}`, response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            https.get(`${API}/categories/parent/root?secretKey=${secretKey}`, response2=>{
                response2.on('data', data=>{
                    resultStrRoot += data.toString();
                })
                response2.on('end', ()=>{
                    resultRoot = JSON.parse(resultStrRoot);
        
                    resultRoot.forEach(elem=>{
                        if(elem.name === 'Womens'){
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
                            }
                        ]
                    })
                })
            })
        })
    })
}

module.exports = { categoryMens, categoryWomens }
  
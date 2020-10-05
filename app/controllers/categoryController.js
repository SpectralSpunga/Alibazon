const https = require('https');

function homepageMens(req, res, next){
    let resultStr = "";
    let result = [];
    let regMensSub = /^mens-\w+$/;
    let mens = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get('https://osf-digital-backend-academy.herokuapp.com/api/categories?secretKey=%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2', response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            result.forEach(elem => {
                let matMens = elem.id.match(regMensSub);

                if(matMens){
                    elem.image = 'images/' + elem.image;
                    mens.push(elem);
                }
                if(elem.parent_category_id === 'root' && elem.name === 'Mens'){
                    categoryDesc = elem.page_description
                    mainCategory = elem.name;
                }
            });

            return res.render('category', {mens, mainCategory, categoryDesc})
        })
    })
}

function homepageWomens(req, res, next){
    let resultStr = "";
    let result = [];
    let regWomensSub = /^womens-\w+$/;
    let womens = [];
    let mainCategory = "";
    let categoryDesc = ''

    https.get('https://osf-digital-backend-academy.herokuapp.com/api/categories?secretKey=%242a%2408%24STOLShNCDYZndkbNStJm5.FUBCS3DXqYlPZ1GZMWun9XGrj7yYnZ2', response=>{
        response.on('data', data=>{
            resultStr += data.toString();
        })
        response.on('end', ()=>{
            result = JSON.parse(resultStr);

            result.forEach(elem => {
                let matWomens = elem.id.match(regWomensSub);

                if(matWomens){
                    elem.image = 'images/' + elem.image;
                    womens.push(elem);
                }
                if(elem.parent_category_id === 'root' && elem.name === 'Womens'){
                    categoryDesc = elem.page_description
                    mainCategory = elem.name;
                }
            });

            return res.render('category', {mens: womens, mainCategory, categoryDesc})
        })
    })
}

module.exports = { homepageMens, homepageWomens }
  
const divs = document.querySelectorAll('.product-div');
let arr = [];
const arr2 = []

if(divs.length > 25){
    for(let i = 25; i < divs.length; i += 25){
        for(let j = i - 25; j < i; j++){
            arr.push(divs[j])
        }
        arr2.push(arr);
        arr=[];
    }

    
}
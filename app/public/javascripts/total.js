export default function total(){
    const $totalArr = $('.total');
    const totalArr = $($totalArr).text().split("$")
    totalArr.shift()
    let total = totalArr.reduce((acc, elem)=> parseFloat(acc) + parseFloat(elem))

    $('#cart-total h3').text(`$${Number(total).toFixed(2)}`)
}
function linkMaker(subsubCategory){
    let linkMensCloting = [{ link: '/category/mens', ap: 'Mens' }, { link: '/category/mens/clothing', ap: 'Clothing' }]

    let linkWomensCloting = [{ link: '/category/womens', ap: 'Womens' }, { link: '/category/womens/clothing', ap: 'Clothing' }]

    switch(subsubCategory){
        case "mens-clothing-jackets":
            return [
                ...linkMensCloting,
                {
                    link: '/products/mens-clothing-jackets',
                    ap: 'Jackets'
                }
        ]
        case "mens-clothing-dress-shirts":
            return [
                ...linkMensCloting,
                {
                    link: '/products/mens-clothing-pants',
                    ap: 'Dress Shorts'
                }
        ]
        case "mens-clothing-suits":
            return [
                ...linkMensCloting,
                {
                    link: '/products/mens-clothing-suits',
                    ap: 'Suits'
                }
        ]
        case "mens-clothing-shorts":
            return [
                ...linkMensCloting,
                {
                    link: '/products/mens-clothing-shorts',
                    ap: 'Shorts'
                }
        ]
        case "mens-clothing-pants":
            return [
                ...linkMensCloting,
                {
                    link: '/products/mens-clothing-pants',
                    ap: 'Pants'
                }
        ]
        case "mens-accessories-ties":
            return [
                {
                    link: '/category/mens',
                    ap: 'Mens'
                },
                {
                    link: '/category/mens/accessories',
                    ap: 'Accessories'
                },
                {
                    link: '/products/mens-accessories-ties',
                    ap: 'Ties'
                }
        ]
        case "mens-accessories-gloves":
            return [
                {
                    link: '/category/mens',
                    ap: 'Mens'
                },
                {
                    link: '/category/mens/accessories',
                    ap: 'Accessories'
                },
                {
                    link: '/products/mens-accessories-gloves',
                    ap: 'Gloves'
                }
        ]
        case "mens-accessories-luggage":
            return [
                {
                    link: '/category/mens',
                    ap: 'Mens'
                },
                {
                    link: '/category/mens/accessories',
                    ap: 'Accessories'
                },
                {
                    link: '/products/mens-accessories-luggage',
                    ap: 'Luggage'
                }
        ]
        case "womens-outfits":
            return [
                ...linkWomensCloting,
                {
                    link: '/products/womens-outfits',
                    ap: 'Outfits'
                }
        ]
        case "womens-clothing-tops":
            return [
                ...linkWomensCloting,
                {
                    link: '/products/womens-clothing-tops',
                    ap: 'Tops'
                }
        ]
        case "womens-clothing-bottoms":
            return [
                ...linkWomensCloting,
                {
                    link: '/products/womens-clothing-bottoms',
                    ap: 'Bottoms'
                }
        ]
        case "womens-clothing-dresses":
            return [
                ...linkWomensCloting,
                {
                    link: '/products/womens-clothing-dresses',
                    ap: 'Dresses'
                }
        ]
        case "womens-clothing-jackets":
            return [
                ...linkWomensCloting,
                {
                    link: '/products/womens-clothing-jackets',
                    ap: 'Jackets'
                }
        ]
        case "womens-clothing-feeling-red":
            return [
                ...linkWomensCloting,
                {
                    link: '/products/womens-clothing-feeling-red',
                    ap: 'Feeling Red'
                }
        ]
        case "womens-accessories-scarves":
            return [
                {
                    link: '/category/womens',
                    ap: 'Womens'
                },
                {
                    link: '/category/womens/accessories',
                    ap: 'Accessories'
                },
                {
                    link: '/products/womens-accessories-scarves',
                    ap: 'Scarves'
                }
        ]
        case "womens-accessories-shoes":
            return [
                {
                    link: '/category/womens',
                    ap: 'Womens'
                },
                {
                    link: '/category/womens/accessories',
                    ap: 'Accessories'
                },
                {
                    link: '/products/womens-accessories-shoes',
                    ap: 'Shoes'
                }
        ]
        case "womens-jewlery-bracelets":
            return [
                {
                    link: '/category/womens',
                    ap: 'Womens'
                },
                {
                    link: '/category/womens/jewelry',
                    ap: 'Jewelry'
                },
                {
                    link: '/products/womens-jewlery-bracelets',
                    ap: 'Bracelets'
                }
        ]
        case "womens-jewelry-earrings":
            return [
                {
                    link: '/category/womens',
                    ap: 'Womens'
                },
                {
                    link: '/category/womens/jewelry',
                    ap: 'Jewelry'
                },
                {
                    link: '/products/womens-jewelry-earrings',
                    ap: 'Earrings'
                }
        ]
        case "womens-jewelry-necklaces":
            return [
                {
                    link: '/category/womens',
                    ap: 'Womens'
                },
                {
                    link: '/category/womens/jewelry',
                    ap: 'Jewelry'
                },
                {
                    link: '/products/womens-jewelry-necklaces',
                    ap: 'Necklaces'
                }
        ]

        default:
            return []
    }
}

module.exports = {
    linkMaker
}
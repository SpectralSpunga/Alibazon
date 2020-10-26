const axios = require('axios');
const { secretKey, API } = require('../../config').config;
/**
 * Loads information about category
 * @param { string } category - name of category
 * @example "mens", "womens", "womens-clothing" 
 * 
 * @returns { Object } object with info about category
 * @example 
 * return {
            data: [
                    {
                        image: '...',
                        _id: '...',
                        id: '...',
                        name: '...',
                        page_description: "...",
                        page_title: '...',
                        parent_category_id: '...',
                        c_showInMenu: true,
                        __v: 0
                    },
                    ....
            ],
            mainCategory: '...',
            categoryDesc: "...",
            title: "..."
        }
 */
async function dataLoader(category){
    try{
        let subCategory = await axios.get(`${API}/categories/parent/${category}?secretKey=${secretKey}`);
        let mainCategory = await axios.get(`${API}/categories/${category}?secretKey=${secretKey}`);

        return {
            data: subCategory.data, 
            mainCategory: mainCategory.data.name, 
            categoryDesc: mainCategory.data.page_description,
            title: mainCategory.data.page_title
        }
    } catch(err){
        return err;
    }
}

module.exports = dataLoader;

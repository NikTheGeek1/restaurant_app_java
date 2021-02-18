export const MENU_ITEMS = [
    "TOMATO_SOUP",
    "MUSHROOM_SOUP",
    "VEGETABLE_SOUP",
    "RASAM_SOUP",
    "FRIED_IDLY",
    "SPECIAL_MASALA_IDLY",
    "UPMA",
    "MASALA_UPMA",
    "SAMOSA",
    "GREEN_SALAD",
    "LEMON_RICE",
    "PLAIN_RICE",
    "TOMATO_RICE",
    "DAL_RICE",
    "MUSHROOM_BIRIYANI",
    "POORI",
    "POORI_CHANNA_MASALA",
    "VEGETABLE_NOODLES",
    "FRIED_NOODLES",
    "JUICE",
    "WATER",
    "LEMON_SODA",
    "BEVERAGE",
    "BEER"
].map(item => ({ realName: item, prettyName: item.replace('_', ' ') }));


export const convertQtyObjectToList = (object) => {
    const list = [];
    for (const item in object) {
        for (let qty = 0; qty < object[item]; qty++) {
            list.push(item);
        }
    }
    return list
};
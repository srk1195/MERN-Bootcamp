/* eslint-disable valid-typeof */
export const addItemToCart = (item, next) => {
    let cart = [];
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.push({
            ...item,
        });
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const loadCartPage = () => {
    if (typeof window !== undefined) {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
};

export const removeItemFromCartByID = (itemID) => {
    if (localStorage.getItem('cart') && typeof window !== undefined) {
        const cart = JSON.parse(localStorage.getItem('cart'));

        //  Filtering via productID
        const newCart = cart.filter((product) => product._id !== itemID);

        localStorage.setItem('cart', JSON.stringify(newCart));
    }
};

export const cartEmpty = (next) => {
    if (typeof window !== undefined) {
        localStorage.removeItem('cart');
        const cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

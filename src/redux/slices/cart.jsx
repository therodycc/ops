import { cartService } from 'src/services/cart.service';
const { createSlice } = require('@reduxjs/toolkit');

import { dispatch } from '../store';

const initialState = {
    error: null,
    isLoading: false,
    products: [],
    itbis: 0,
    total: 0,
    discount: 0,
    subTotal: 0,
};

const cartSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },
        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
        addCart(state, action) {
            state.isLoading = false;
            const cart = action.payload;

            state.products.push(cart.products[0]);

            state.itbis += cart.itbis;
            state.total += cart.total;
            state.discount += cart.discount;
            state.subTotal += cart.subTotal;
        },
        updateCart(state, action) {
            state.isLoading = false;
            const cart = action.payload;
            const newProduct = cart.products[0];

            const productIndex = state.products.findIndex(_product => newProduct.id === _product.id);

            const oldProduct = state.products[productIndex];
            if (newProduct.selectedSellType !== oldProduct.selectedSellType) {
                state.itbis += (Number(cart.itbis) - Number(state.itbis));
                state.total += (Number(cart.total) - Number(state.total));
                state.discount += (Number(cart.discount) - Number(state.discount));
                state.subTotal += (Number(cart.subTotal) - Number(state.subTotal));
            }

            state.products[productIndex] = oldProduct;
        },
        resetCart(state) {
            state.products = [];
            state.total = 0;
            state.itbis = 0;
            state.subTotal = 0;
            state.discount = 0;
        },
    }
});

// ----------------------------------------------------------------------


export default cartSlice.reducer;

export const addToCart = (product) => {
    return async () => {
        try {
            dispatch(cartSlice.actions.startLoading());
            const { data } = await cartService.add(product);
            dispatch(cartSlice.actions.addCart(data));
        } catch (error) {
            console.error(error);
            dispatch(cartSlice.actions.hasError(error));
        }
    };
}

export const updateCart = (cart) => {
    return async () => {
        try {
            dispatch(cartSlice.actions.startLoading());
            const { data } = await cartService.update(cart);
            dispatch(cartSlice.actions.updateCart(data));
        } catch (error) {
            console.error(error);
            dispatch(cartSlice.actions.hasError(error));
        }
    };
}

export const clearCart = () => {
    return async () => {
        try {
            dispatch(cartSlice.actions.startLoading());
            await cartService.clear();
            dispatch(cartSlice.actions.resetCart());
        } catch (error) {
            console.error(error);
            dispatch(cartSlice.actions.hasError(error));
        }
    };
}




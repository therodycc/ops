import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
import { Product } from '../../interfaces/product/product';

// utils
import { productService } from '../../services/product.service';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------
type ProductType = {
  isLoading: Boolean;
  error: any;
  product: Product;
  products: Product[];
};
const initialState: ProductType = {
  isLoading: false,
  error: null,
  products: null,
  product: null
};

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },

    // GET PRODUCT
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.products.push(action.payload);
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export const createProduct = product => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await productService.save(product);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

// ----------------------------------------------------------------------

export const getProducts = () => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await productService.list();
      dispatch(slice.actions.getProductsSuccess(data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
};

// ----------------------------------------------------------------------
export const getProduct = id => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await productService.detail(id);
      dispatch(slice.actions.getProductSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

export const addElementToCartCart = ({ id, quantity, selectedSellType }) => {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const { data } = await productService.detail(id);
      dispatch(slice.actions.getProductSuccess(data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
};

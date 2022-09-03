import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import productReducer from './slices/product';
import authReducer from './slices/auth';
import orderReducer from './slices/order';
import cartReducer from './slices/cart';
import notification from './slices/notification';

// ----------------------------------------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  }
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const authPersistConfig = {
  key: 'auth',
  storage,
  keyPrefix: 'redux-'
};

const cartPersistConfig = {
  key: 'cart',
  storage,
  keyPrefix: 'redux-'
};

const orderPersistConfig = {
  key: 'order',
  storage,
  keyPrefix: 'redux-',
  whiteList: ['products']
};

const rootReducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  order: persistReducer(orderPersistConfig, orderReducer),
  notification,
  cart: persistReducer(cartPersistConfig, cartReducer)
});

export type AppState = ReturnType<typeof rootReducer>;

export { rootPersistConfig, rootReducer };

import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// slices
import productReducer from './slices/product';
import authReducer from './slices/auth';

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

const rootReducer = combineReducers({
  product: persistReducer(productPersistConfig, productReducer),
  auth: persistReducer(authPersistConfig, authReducer)
});

export { rootPersistConfig, rootReducer };

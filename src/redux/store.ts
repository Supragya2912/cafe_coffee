// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import beansReducer from './reducers/beansSlice';
import coffeeReducer from './reducers/coffeeSlice';
import { combineReducers } from 'redux';
import cartSlice from './reducers/CartSlice';
import favouriteSlice from './reducers/favouriteSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  beans: beansReducer,
  coffee: coffeeReducer,
  cart: cartSlice,
  favourite: favouriteSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof rootReducer>;
export default store;

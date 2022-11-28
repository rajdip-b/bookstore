import { appReducer, IAppSlice } from './app-slice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

interface IStoreState {
	app: IAppSlice;
}

const rootPersistConfig = {
	key: 'bookstore',
	storage,
};

const appPersistConfig = {
	key: 'bookstore-app',
	storage,
};

const rootReducer = combineReducers({
	app: persistReducer(appPersistConfig, appReducer),
});

const store = configureStore({
	reducer: persistReducer(rootPersistConfig, rootReducer),
});

const persistor = persistStore(store);

export default store;
export { persistor };
export type RootDispatch = ReturnType<typeof store.dispatch>;
export type { IStoreState };

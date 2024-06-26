import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
const persistor = persistStore(store);

export default () => {
    return { store, persistor }
}
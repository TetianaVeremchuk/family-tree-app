import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import familyReducer from './slices/familySlice';
import rootSaga from './sagas/rootSaga';
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: {
        family: familyReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
export default store;

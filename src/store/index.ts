import { createStore, applyMiddleware, StoreEnhancer, Reducer, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { AppReducer } from '@/store/app/app.module';
import { DictionaryReducer } from '@/store/dictionary/dictionary.module';
import { LoadingReducer } from '@/store/loading/loading.module';
import { useDispatch } from 'react-redux';


// config redux for dev tools (https://github.com/zalmoxisus/redux-devtools-extension)
declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:any;
	}
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


// Add all needed middleware
// currently using only thunk but may use redux-logger for dev in future
let middleware: StoreEnhancer = applyMiddleware(thunk);

const appReducer = combineReducers({
  app: AppReducer,
	dictionary: DictionaryReducer,
	loading: LoadingReducer,
});

const store = createStore(appReducer, composeEnhancers(middleware));

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;

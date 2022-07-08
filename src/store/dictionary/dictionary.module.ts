import RoutesPaths from "@/RoutesPaths";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import DictionaryAPI from "./dictionary.api";
import { DictionaryReduxState, Source } from "./dictionary.type";


const initialState: DictionaryReduxState = { 
  sources: {},
};

enum DictionaryActionType {
  SET_SOURCES = 'SET_SOURCES',
}

type DictionaryAction = {
	type: DictionaryActionType;
	sources: Source[];
}

//Reducers
const reducer = (state = initialState, action: DictionaryAction): DictionaryReduxState => {
  switch (action.type) {
    case DictionaryActionType.SET_SOURCES:
			if (action.sources) {
				const sourcesRecord = action.sources
          .reduce((prev, source) => {
            prev[source.id] = source;
            return prev;
          }, {} as Record<string, Source>);
          state.sources = sourcesRecord;
			} else {
				console.warn('sources were not set');
			}
      return { ...state };

    default:
      return state;
  }
};


// Actions
const actions = {

  setSources: (sources: Source[]): DictionaryAction => ({
    type: DictionaryActionType.SET_SOURCES,
    sources
  }),

  downloadSources: (): ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      try {
        const sources = await DictionaryAPI.getAllDictionaries();
        dispatch(DictionaryActions.setSources(sources));
      } catch (err) {
        console.log(err);
      }
    }
  },

  // performSearch: (expression: string, setExpressionSearchQuery: (expression: string) => void) => {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   console.log('performSearch', expression)
  //   if (expression == undefined || expression.length === 0) {
  //     return;
  //   }
  //   if (location.pathname === RoutesPaths.Search) {
  //     setExpressionSearchQuery(expression);
  //   } else {
  //     navigate({
  //       pathname: RoutesPaths.Search, 
  //       search: `?${createSearchParams({expression})}`,
  //     });
  //   }
  // }
}

export const DictionaryActions = actions;
export const DictionaryReducer = reducer;

import RoutesPaths from "@/RoutesPaths";
import { createSearchParams, useLocation, useNavigate } from "react-router-dom";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Language } from "@/store/app/app.enum";
import DictionaryAPI from "./dictionary.api";
import { DictionaryReduxState, Source } from "./dictionary.type";

export const SupportedLanguages: Record<string, string[]> = {
  [Language.LEZGI]: [Language.RUSSIAN],
  [Language.TABASARAN]: [Language.RUSSIAN],
  [Language.RUSSIAN]: [Language.LEZGI, Language.TABASARAN]
}

const initialState: DictionaryReduxState = { 
  sources: {},
  fromLang: Language.LEZGI,
  toLang: Language.RUSSIAN,
};

enum DictionaryActionType {
  SET_SOURCES = 'SET_SOURCES',
  SET_FROM_LANG = 'SET_FROM_LANG',
  SET_TO_LANG = 'SET_TO_LANG',
}

type DictionaryAction = {
	type: DictionaryActionType.SET_SOURCES;
	sources: Source[];
} |
{
  type: DictionaryActionType.SET_FROM_LANG;
  fromLang: Language;
} |
{
  type: DictionaryActionType.SET_TO_LANG;
  toLang: Language;
};

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

    case DictionaryActionType.SET_FROM_LANG:
      if (!Object.keys(SupportedLanguages).includes(action.fromLang)) {
        return { ...state }
      }
      const newToLangOptions = SupportedLanguages[action.fromLang];
      console.log('dictionary.module', newToLangOptions);
      let toLang: Language;
      if (newToLangOptions.includes(state.toLang)) {
        // 1. Prio: toLang should remain same if possible
        toLang = state.toLang;
      } else if (newToLangOptions.includes(state.fromLang)) {
        // 2. Prio: toLang should get previous fromLang value if possible
        toLang = state.fromLang;
      } else {
        // 3. if nothong else is abailable toLang should be the 1st value of available options
        toLang = newToLangOptions[0] as Language;
      }
      return { ...state, fromLang: action.fromLang, toLang };
    
    case DictionaryActionType.SET_TO_LANG:
      const langOptions = SupportedLanguages[state.fromLang];
      if (langOptions.includes(action.toLang)) {
        return { ...state, toLang: action.toLang };
      }
      return { ...state, toLang:  langOptions[0] as Language };

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

  setFromLang: (fromLang: Language): DictionaryAction => ({
    type: DictionaryActionType.SET_FROM_LANG,
    fromLang
  }),

  setToLang: (toLang: Language): DictionaryAction => ({
    type: DictionaryActionType.SET_TO_LANG,
    toLang
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

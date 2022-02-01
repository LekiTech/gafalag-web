import { Language } from "./app.enum";
import { AppReduxState } from "./app.types";

const browserLang = navigator.language;

const initialState: AppReduxState = { languageId: browserLang === 'ru-RU' ? Language.RUSSIAN : Language.ENGLISH };

enum AppActionType {
  SET_LANGUAGE = 'SET_LANGUAGE',
}

type AppAction = {
	type: AppActionType
	languageId?: string
}

//Reducers
const reducer = (state = initialState, action: AppAction): AppReduxState => {
  switch (action.type) {
    case AppActionType.SET_LANGUAGE:
			if (action.languageId) {
				state.languageId = action.languageId;
			} else {
				console.warn('languageId was not set');
			}
      return { ...state };

    default:
      return state;
  }
};

// Actions
const actions = {

  setLanguageId: (languageId: string): AppAction => ({
    type: AppActionType.SET_LANGUAGE,
    languageId
  }),
}

export const AppActions = actions;
export const AppReducer = reducer;

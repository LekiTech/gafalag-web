import { Language } from "./app.enum";
import { AppReduxState } from "./app.types";


const browserLang = navigator.language;
const storageLanguageId = 'language_id';

function getInitLanguage() {
  const storedLanguage = window.localStorage.getItem(storageLanguageId);
  return storedLanguage ??
    (browserLang === 'ru-RU' ? Language.RUSSIAN : Language.ENGLISH);
}


const initLang = getInitLanguage();
const initialState: AppReduxState = { 
  languageId: initLang,
};

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
        window.localStorage.setItem(storageLanguageId, action.languageId);
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

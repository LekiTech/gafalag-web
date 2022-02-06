import { LoadingReduxState, LoadingStatus } from "./loading.types";

const initialState: LoadingReduxState = { };

enum LoadingActionType {
  SET_LOADING_STATUS = 'SET_LOADING_STATUS',
  REMOVE_LOADING_STATUS = 'REMOVE_LOADING_STATUS',
}

type LoadingAction = {
	type: LoadingActionType;
  processId: string;
  status: LoadingStatus;
}

//Reducers
const reducer = (state = initialState, action: LoadingAction): LoadingReduxState => {
	if (Object.values(LoadingActionType).includes(action.type)) {
		console.log('loading state:', state, action);
	}
  switch (action.type) {
    case LoadingActionType.SET_LOADING_STATUS:
      return { ...state, [action.processId]: action.status };

    case LoadingActionType.REMOVE_LOADING_STATUS:
      delete state[action.processId];
      return { ...state };

    default:
      return state;
  }
};

// Actions
const actions = {

  setStartLoadingStatus: (processId: string): LoadingAction => ({
    type: LoadingActionType.SET_LOADING_STATUS,
    processId,
    status: {loading: true},
  }),

  setEndLoadingStatus: (processId: string, success: boolean, error: any = undefined): LoadingAction => ({
    type: LoadingActionType.SET_LOADING_STATUS,
    processId,
    status: {
      loading: false,
      result: {
        success,
        error
      }
    },
  }),

  removeLoadingStatus: (processId: string): LoadingAction => ({
    type: LoadingActionType.REMOVE_LOADING_STATUS,
    processId,
    status: {loading: false},
  }),
}

export const LoadingActions = actions;
export const LoadingReducer = reducer;

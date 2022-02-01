export type LoadingResult = {
	success: boolean;
	error?: any;
}

export type LoadingStatus = {
	loading: boolean;
	result?: LoadingResult
}

export type LoadingReduxState = {
  [processId: string]: LoadingStatus
}
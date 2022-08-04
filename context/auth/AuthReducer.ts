import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	CLEAR_ERRORS,
	LOGOUT,
	CLEAR_MESSAGES,
	SET_LOADING,
	FUND_WALLET,
	GET_BUDGETS,
	GET_EXPENSES,
	CREATE_BUDGET,
	ADD_EXPENSE,
	DELETE_BUDGET,
	ERROR,
	GET_ALL_EXPENSES,
	GET_HISTORY,
	FILTER_BY_DATE,
	GET_USERS,
} from '../types';
import moment from 'moment-timezone';

const AuthReducer = (state: any, action: any) => {
	switch (action.type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				user: action.payload,
				loading: false,
			};
		case AUTH_ERROR:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case REGISTER_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				message: action.payload.msg,
			};
		case REGISTER_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				message: 'Login Successful',
				token: action.payload.token,
			};
		case GET_USERS:
			return {
				...state,
				users: action.payload,
				loading: false,
			};
		case LOGIN_FAIL:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};

		case SET_LOADING:
			return {
				...state,
				loading: true,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
				loading: false,
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
				loading: false,
			};
		case CLEAR_MESSAGES:
			return {
				...state,
				message: null,
				loading: false,
			};
		default:
			return state;
	}
};

export default AuthReducer;

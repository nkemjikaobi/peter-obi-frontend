import React, { useReducer } from 'react';
import axios from 'axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS,
	CLEAR_MESSAGES,
	SET_LOADING,
	ERROR,
	GET_USERS,
} from '../types';

const AuthState = (props: any) => {
	const initialState = {
		token: typeof window !== 'undefined' && localStorage.getItem('token'),
		isAuthenticated: null,
		loading: false,
		user: null,
		error: null,
		message: null,
		budgets: null,
		users: null,
		expenses: [],
		allExpenses: [],
		transactionHistory: [],
		filtered: null,
	};

	const [state, dispatch] = useReducer(AuthReducer, initialState);

	const customAxios = axios.create({
		baseURL: process.env.NEXT_PUBLIC_BASE_URL,
		headers: {
			'Content-Type': 'application/json',
			authorization: `${
				typeof window !== 'undefined' && localStorage.token
					? localStorage.getItem('token')
					: ''
			}`,
		},
	});

	//Load User
	const loadUser = async () => {
		try {
			const res = await customAxios.get('/api/v1/auth');
			dispatch({
				type: USER_LOADED,
				payload: res.data.user,
			});
		} catch (err: any) {
			dispatch({
				type: AUTH_ERROR,
				payload: err.response.data.msg,
			});
		}
	};

	//Register User
	const register = async (user: any, router: any) => {
		setLoading();

		try {
			const res = await customAxios.post('/api/v1/users', user);
			dispatch({
				type: REGISTER_SUCCESS,
				payload: res.data,
			});

			//loadUser();
			router.push('/');
		} catch (err: any) {
			dispatch({
				type: REGISTER_FAIL,
				payload: err.response.data.errors
					? err.response.data.errors
					: err.response.data.msg,
			});
		}
	};

	//Login User
	const login = async (user: any, router: any) => {
		setLoading();

		try {
			const res = await customAxios.post('/api/v1/auth', user);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});

			router.push('/dashboard');
		} catch (err: any) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.errors
					? err.response.data.errors
					: err.response.data.msg,
			});
		}
	};


	//Get Users
	const getUsers = async () => {
		setLoading();

		try {
			const res = await customAxios.get('/api/v1/users');
			dispatch({
				type: GET_USERS,
				payload: res.data,
			});
		} catch (err: any) {
			dispatch({
				type: ERROR,
				payload: err.response.data.msg,
			});
		}
	};


	//Set loading
	const setLoading = () => dispatch({ type: SET_LOADING });

	//Logout User
	const logout = (router: any) => {
		dispatch({ type: LOGOUT });
		router.push('/');
	};

	//Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	//Clear Messages
	const clearMessages = () => dispatch({ type: CLEAR_MESSAGES });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				message: state.message,
				budgets: state.budgets,
				expenses: state.expenses,
				allExpenses: state.allExpenses,
				transactionHistory: state.transactionHistory,
				filtered: state.filtered,
				users: state.users,
				register,
				clearErrors,
				clearMessages,
				loadUser,
				login,
				logout,
				getUsers
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;

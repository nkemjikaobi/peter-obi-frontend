import { CURRENCIES } from 'Constants';
import formatNumberWithCommas from 'helpers/formatNumberWithCommas';
import React, { useContext } from 'react';
import { GiMoneyStack } from 'react-icons/gi';
import ProgressBar from '@ramonak/react-progress-bar';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import 'moment-timezone';
import AuthContext from 'context/auth/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment-timezone';

const BudgetCard = ({ handleExpenseChange, budget }: any) => {
	const router = useRouter();

	const authContext = useContext(AuthContext);
	const { getExpenses } = authContext;

	const [progress, setProgress] = useState<number>(0);
	const [isExpired, setIsExpired] = useState<boolean>(false);

	const handleViewExpenses = () => {
		getExpenses(budget._id);
		setTimeout(() => {
			router.push('/dashboard/expenses');
		}, 1000);
	};

	const calculateProgress = (startingPrice: any, amountAvailable: any) => {
		const data = (parseInt(amountAvailable) / parseInt(startingPrice)) * 100;
		const result = Math.round(data);
		return result;
	};

	useEffect(() => {
		if (budget) {
			const result = calculateProgress(budget.start_price, budget.max_spending);
			setProgress(result);
			const expiry = moment(new Date()).isAfter(budget.end_date);
			setIsExpired(expiry);
		}
		//eslint-disable-next-line
	}, [budget]);

	return (
		<div className='bg-black drop-shadow-md rounded-lg p-5 mb-4 md:mb-0'>
			<div className='flex justify-between items-center'>
				<p>{budget.name}</p>
				<GiMoneyStack className='text-4xl' />
			</div>

			<p className='text-4xl text-gray-500 my-4'>
				{CURRENCIES.NAIRA}
				{budget.start_price ? formatNumberWithCommas(budget.start_price) : 0}
			</p>
			<p className='text-4xl text-gray-500 my-4'>
				<span className='text-base text-white'>Amount available: </span>
				{CURRENCIES.NAIRA}
				{budget.max_spending ? formatNumberWithCommas(budget.max_spending) : 0}
			</p>
			<div>
				<ProgressBar
					completed={progress ? progress : 0}
					className='mb-4'
					baseBgColor='#0F172B'
				/>
			</div>
			<div>
				<div className='mb-4 flex justify-between items-center text-white'>
					<p>
						<Moment format='MMM Do YYYY' date={budget.start_date} /> - {''}
						<Moment format='MMM Do YYYY' date={budget.end_date} />
					</p>
					{/* {budget.hasExpired ? (
						<button className='border bg-red-500 border-black px-5 py-3 rounded-lg hover:bg-green-600'>
							Expired
						</button>
					) : (
						<button className='border bg-green-500 border-black px-5 py-3 rounded-lg hover:bg-green-600'>
							Active
						</button>
					)} */}
					{isExpired ? (
						<button className='border bg-red-500 border-black px-5 py-3 rounded-lg hover:bg-red-600'>
							Expired
						</button>
					) : (
						<button className='border bg-green-500 border-black px-5 py-3 rounded-lg hover:bg-green-600'>
							Active
						</button>
					)}
				</div>
				<hr className='mb-4' />
				<div className='flex justify-between flex-col md:flex-row items-center'>
					<button
						className={`border bg-purple-900 border-black px-5 py-3 rounded-lg hover:bg-blue-900 w-full md:w-2/5 mb-4 md:mb-0 ${
							isExpired && 'pointer-events-none bg-purple-400 opacity-40'
						}`}
						onClick={() => handleExpenseChange(true, budget._id)}
					>
						Add Expense
					</button>
					<button
						className={`border bg-purple-900 border-black px-5 py-3 rounded-lg hover:bg-blue-900 w-full md:w-2/5 ${
							isExpired && 'pointer-events-none bg-purple-400 opacity-40'
						}`}
						onClick={() => handleViewExpenses()}
					>
						View Expenses
					</button>
				</div>
			</div>
		</div>
	);
};

export default BudgetCard;

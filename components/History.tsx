import { CURRENCIES } from 'Constants';
import formatNumberWithCommas from 'helpers/formatNumberWithCommas';
import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone';

const History = ({ history }: any) => {
	return (
		<>
			<div className='flex items-center justify-between bg-black mt-8 p-5 rounded-lg mr-4 hover:bg-blue-900'>
				<p>{history.name}</p>
				<p
					className={`${
						history.type === 'debit' ? 'text-red-600' : 'text-green-600'
					}`}
				>
					{history.type === 'debit' ? '-' : '+'} {''}
					{CURRENCIES.NAIRA}
					{formatNumberWithCommas(history.amount)}
				</p>
				<Moment format='MMM Do YYYY' date={history.date} />
			</div>
		</>
	);
};

export default History;

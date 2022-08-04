import { CURRENCIES } from 'Constants';
import formatNumberWithCommas from 'helpers/formatNumberWithCommas';
import React from 'react';

const Expense = ({
	expense: {
		narration,
		amount,
		budget: { name },
	},
}: any) => {
	return (
		<>
			<div className='flex items-center justify-between bg-black mt-8 p-5 rounded-lg mr-4 hover:bg-blue-900'>
				<p>{narration}</p>
				<p className='text-red-600'>
					- {''}
					{CURRENCIES.NAIRA}
					{formatNumberWithCommas(amount)}
				</p>
			</div>
		</>
	);
};

export default Expense;

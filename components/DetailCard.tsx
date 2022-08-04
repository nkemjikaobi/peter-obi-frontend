import { CURRENCIES } from 'Constants';
import formatNumberWithCommas from 'helpers/formatNumberWithCommas';
import React from 'react';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const DetailCard = ({ name, count, isCurrency }: any) => {
	return (
		<div className='bg-black drop-shadow-md rounded-lg p-5'>
			<div className='flex justify-between items-center'>
				<p>{name}</p>
				<MdOutlineAccountBalanceWallet className='text-4xl' />
			</div>

			<p className='text-4xl text-gray-500 my-4'>
				{isCurrency && CURRENCIES.NAIRA}{' '}
				{count ? formatNumberWithCommas(count) : 0}
			</p>
		</div>
	);
};

export default DetailCard;

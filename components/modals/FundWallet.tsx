import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import AuthContext from 'context/auth/AuthContext';
import { ImSpinner9 } from 'react-icons/im';
import toast, { Toaster } from 'react-hot-toast';

const FundWallet = ({ setFundWallet }: any) => {
	const [amount, setAmount] = useState<any>('');

	const authContext = useContext(AuthContext);
	const { fundWallet, loading, message, error, clearErrors, clearMessages } =
		authContext;

	useEffect(() => {
		if (error !== null && Array.isArray(error)) {
			for (let i = 0; i < error.length; i++) {
				toast.error(error[i].msg);
			}
			clearErrors();
		} else if (error !== null) {
			toast.error(error);
			clearErrors();
		}
		//eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		if (message !== null) {
			toast.success(message);
			clearMessages();
		}
		//eslint-disable-next-line
	}, [message]);

	const handleSubmit = () => {
		if (amount === '') {
			return toast.error('Provide an amount');
		}
		fundWallet({ amount });
		setTimeout(() => {
			setFundWallet(false);
		}, 2000);
	};

	return (
		<div className='text-white relative bg-black rounded-lg p-10'>
			<Toaster position='top-right' />
			<div className='absolute right-5 top-10 cursor-pointer'>
				<AiOutlineClose onClick={() => setFundWallet(false)} />
			</div>
			<div className='flex flex-col justify-center items-center'>
				<h4 className='mb-4 text-base tablet:text-xl font-bold mt-8'>
					Fund Account
				</h4>
				<div>
					<input
						type='number'
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						onChange={e => setAmount(e.target.value)}
						value={amount}
						placeholder='30,000'
					/>
				</div>
				<button
					className='flex items-center mb-4 hover:text-blue-900'
					onClick={() => handleSubmit()}
				>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							Funding...
						</>
					) : (
						<>
							Fund Account <BsArrowRight className='ml-4' />
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default FundWallet;

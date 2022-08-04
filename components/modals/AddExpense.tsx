import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import AuthContext from 'context/auth/AuthContext';
import { ImSpinner9 } from 'react-icons/im';
import toast, { Toaster } from 'react-hot-toast';

const AddExpense = ({ setAddExpense, budgetId }: any) => {
	const [expense, setExpense] = useState<any>({
		narration: '',
		amount: '',
		budget: budgetId,
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setExpense({ ...expense, [name]: value });
	};

	const authContext = useContext(AuthContext);
	const { addExpense, loading, message, error, clearErrors, clearMessages } =
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

	const handleSubmit = (e: any) => {
		e.preventDefault();

		//Validation
		const hasEmptyFields = Object.values(expense).some(
			element => element === ''
		);

		if (hasEmptyFields) {
			return toast.error('Please fill in all fields');
		}
		addExpense(expense);
		setTimeout(() => {
			setAddExpense(false);
		}, 2000);
	};
	return (
		<div className='text-white relative bg-black rounded-lg p-10'>
			<Toaster position='top-right' />
			<div className='absolute right-5 top-10 cursor-pointer'>
				<AiOutlineClose onClick={() => setAddExpense(false)} />
			</div>
			<div className='flex flex-col justify-center items-center'>
				<h4 className='mb-4 text-2xl tablet:text-xl font-bold mt-8'>
					Add Expense
				</h4>
				<div>
					<input
						type='text'
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						placeholder='2 bags of rice'
						name='narration'
						onChange={e => handleChange(e)}
					/>
				</div>
				<div>
					<input
						type='number'
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						placeholder='12,500'
						name='amount'
						onChange={e => handleChange(e)}
					/>
				</div>
				<button
					onClick={e => handleSubmit(e)}
					className='flex items-center mb-4 hover:text-blue-900'
				>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							Adding...
						</>
					) : (
						<>
							Add Expense <BsArrowRight className='ml-4' />
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default AddExpense;

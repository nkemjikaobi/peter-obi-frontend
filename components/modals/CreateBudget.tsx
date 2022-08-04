import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AuthContext from 'context/auth/AuthContext';
import { ImSpinner9 } from 'react-icons/im';
import toast, { Toaster } from 'react-hot-toast';

const CreateBudget = ({ setCreateBudget }: any) => {
	const [budget, setBudget] = useState<any>({
		name: '',
		max_spending: '',
		start_date: new Date(),
		end_date: new Date(),
		hasExpired: false,
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setBudget({ ...budget, [name]: value });
	};
	const authContext = useContext(AuthContext);
	const {
		createBudget,
		loading,
		message,
		error,
		clearErrors,
		clearMessages,
	} = authContext;

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
		const hasEmptyFields = Object.values(budget).some(
			element => element === ''
		);

		if (hasEmptyFields) {
			return toast.error('Please fill in all fields');
		}

		createBudget(budget);
		setTimeout(() => {
			setCreateBudget(false);
		}, 2000);
	};

	return (
		<div className='text-white relative bg-black rounded-lg p-10'>
			<Toaster position='top-right' />
			<div className='absolute right-5 top-10 cursor-pointer'>
				<AiOutlineClose onClick={() => setCreateBudget(false)} />
			</div>
			<div className='flex flex-col justify-center items-center'>
				<h4 className='mb-4 text-2xl tablet:text-xl font-bold mt-8'>
					Create Budget
				</h4>
				<div>
					<input
						type='text'
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						placeholder='food stuff'
						name='name'
						onChange={e => handleChange(e)}
					/>
				</div>
				<div>
					<input
						type='number'
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						placeholder='30,000'
						name='max_spending'
						onChange={e => handleChange(e)}
					/>
				</div>
				<div>
					<DatePicker
						onChange={(date: any) =>
							setBudget({ ...budget, ['start_date']: date })
						}
						minDate={new Date()}
						dateFormat='yyyy-MM-dd'
						showYearDropdown
						scrollableMonthYearDropdown
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						selected={budget.start_date}
					/>
				</div>
				<div>
					<DatePicker
						onChange={(date: any) =>
							setBudget({ ...budget, ['end_date']: date })
						}
						minDate={new Date()}
						dateFormat='yyyy-MM-dd'
						showYearDropdown
						scrollableMonthYearDropdown
						className='p-5 text-black border border-gray-300 rounded-md  mb-4 focus:outline-none'
						selected={budget.end_date}
					/>
				</div>
				<button
					className='flex items-center mb-4 hover:text-blue-900'
					onClick={e => handleSubmit(e)}
				>
					{loading ? (
						<>
							<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
							Funding...
						</>
					) : (
						<>
							Create Budget <BsArrowRight className='ml-4' />
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default CreateBudget;

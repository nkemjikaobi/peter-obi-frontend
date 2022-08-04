import BasePageLayout from 'components/BasePageLayout';
import Expense from 'components/Expense';
import SideBar from 'components/SideBar';
import React, { useContext, useState } from 'react';
import AuthContext from 'context/auth/AuthContext';
import { ImSpinner9 } from 'react-icons/im';
import { useEffect } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';

const ExpensesPage = () => {
	const authContext = useContext(AuthContext);
	const { expenses, loading } = authContext;
	const [name, setName] = useState<string>('');
	const router = useRouter();
	useEffect(() => {
		if (expenses.length > 0) {
			const expense = expenses[0];
			console.log({ expense });
			setName(expense.budget.name);
		}
	}, [expenses]);
	return (
		<BasePageLayout title='Expenses'>
			<div className='grid grid-cols-6 gap-4'>
				<div className='hidden md:block md:bg-black md:text-white md:h-[300vh]'>
					<SideBar />
				</div>

				<div className='col-span-5 mt-16'>
					<div className='block md:hidden'>
						<AiOutlineArrowLeft
							className='text-2xl ml-8'
							onClick={() => router.push('/dashboard')}
						/>
					</div>
					<div className='flex justify-between items-center'>
						{name && (
							<h2 className='text-3xl font-bold ml-4'>Expenses for {name}</h2>
						)}
					</div>
					<div className='ml-4 md:ml-0'>
						{loading ? (
							<div>
								<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
								Fetching expenses...
							</div>
						) : expenses.length === 0 ? (
							<div className='text-base mt-8 ml-4'>
								No expense for this budget yet.
							</div>
						) : (
							expenses &&
							expenses.map((expense: any) => (
								<Expense expense={expense} key={expense._id} />
							))
						)}
					</div>
				</div>
			</div>
		</BasePageLayout>
	);
};

export default ExpensesPage;

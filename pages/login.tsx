import BasePageLayout from 'components/BasePageLayout';
import type { NextPage } from 'next';
import Link from 'next/link';
import { GiMoneyStack } from 'react-icons/gi';
import { useRouter } from 'next/router';
import { BsArrowRight } from 'react-icons/bs';
import { useState, useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import AuthContext from 'context/auth/AuthContext';
import { ImSpinner9 } from 'react-icons/im';

const Home: NextPage = () => {
	const router = useRouter();

	const authContext = useContext(AuthContext);
	const { login, message, error, clearErrors, clearMessages } = authContext;
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (error !== null && Array.isArray(error)) {
			for (let i = 0; i < error.length; i++) {
				toast.error(error[i].msg);
			}
		} else if (error !== null) {
			toast.error(error);
		}
		clearErrors();

		//eslint-disable-next-line
	}, [error]);

	useEffect(() => {
		if (message !== null) {
			toast.success(message);
			clearMessages();
		}
		//eslint-disable-next-line
	}, [message]);

	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e: any) => {
		const { name, value } = e.target;
		setUser({ ...user, [name]: value });
	};

	const handleSubmit = async (e: any) => {
		setLoading(true);
		e.preventDefault();

		//Validation
		const hasEmptyFields = Object.values(user).some(element => element === '');

		if (hasEmptyFields) {
			return toast.error('Please fill in all fields');
		}
		if (
			user.email === 'admin@peterobi.com' &&
			user.password === 'PeterObi2023'
		) {
			toast.success('Login success');
			router.push('/dashboard');
		} else {
			toast.error('Unauthorized');
		}
		setLoading(false);
		//await login(user, router);
	};
	return (
		<BasePageLayout title='PeterObi-BabaAhmed Home Page'>
			<Toaster position='top-right' />
			<nav className='flex items-center justify-between mt-12 px-5 md:px-20'>
				<div
					className='flex items-center cursor-pointer hover:text-blue-500'
					onClick={() => router.push('/')}
				>
					<GiMoneyStack className='text-3xl md:text-4xl' />
					<h3 className='ml-4 text-2xl md:text-3xl font-bold'>
						PeterObi-BabaAhmed
					</h3>
				</div>
			</nav>
			<div className='container mx-auto text-center'>
				<h1 className='uppercase text-3xl md:text-5xl font-extrabold mb-4 mt-32 md:mt-64'>
					Welcome
				</h1>
				<h4 className='font-bold mb-6 text-sm md:text-base'>
					Sign in to the admin
				</h4>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 text-black rounded-md w-2/3 md:w-1/3 focus:border-black focus:outline-black'
						type='email'
						placeholder='Email Address'
						name='email'
						onChange={handleChange}
					/>
				</div>
				<div>
					<input
						className='bg-gray-200 p-5 border border-gray-300 text-black rounded-md w-2/3 md:w-1/3 focus:border-black focus:outline-black my-5'
						type='password'
						placeholder='Password'
						name='password'
						onChange={handleChange}
					/>
				</div>
				<div className='flex justify-center'>
					<button
						onClick={e => handleSubmit(e)}
						className='bg-black flex items-center justify-center p-5 w-2/3 md:w-1/3 rounded-md text-white mt-4 hover:bg-blue-500 hover:text-white hover:border hover:border-black'
					>
						{loading ? (
							<>
								<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
								Logging in...
							</>
						) : (
							<>
								Sign In <BsArrowRight className='ml-4' />
							</>
						)}
					</button>
				</div>
				<div className='flex justify-center'>
					<Link href='/'>
						<a className='bg-white flex items-center justify-center p-5 w-2/3 md:w-1/3 border border-black rounded-md text-black my-5 hover:bg-blue-500 hover:text-white '>
							Register Account Here
						</a>
					</Link>
				</div>
			</div>
		</BasePageLayout>
	);
};

export default Home;

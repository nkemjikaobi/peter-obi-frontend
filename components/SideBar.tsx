import Link from 'next/link';
import React, { useContext } from 'react';
import { MdLogout } from 'react-icons/md';
import { useRouter } from 'next/router';
import { GiMoneyStack, GiTakeMyMoney } from 'react-icons/gi';
import { BsClockHistory } from 'react-icons/bs';
import AuthContext from 'context/auth/AuthContext';

const SideBar = () => {
	const router = useRouter();

	const authContext = useContext(AuthContext);
	const { logout } = authContext;
	return (
		<div className='px-7 py-24'>
			<Link href='/dashboard'>
				<a href='#' className='text-2xl font-bold'>
					PeterObi-BabaAhmed
				</a>
			</Link>
			<Link href='/dashboard'>
				<a
					href='#'
					className={`flex items-center mt-16 hover:text-[#498feb] cursor-pointer ${
						router.pathname === '/dashboard' && 'text-[#498feb]'
					}`}
				>
					<GiTakeMyMoney className='text-3xl mr-4' /> Users
				</a>
			</Link>
			<button
				className='flex items-center mt-16 hover:text-[#498feb] cursor-pointer'
				onClick={() => {
					logout(router);
				}}
			>
				<MdLogout className='text-3xl mr-4' /> Logout
			</button>
		</div>
	);
};

export default SideBar;

import BasePageLayout from 'components/BasePageLayout';
import DetailCard from 'components/DetailCard';
import SideBar from 'components/SideBar';
import React, { useContext } from 'react';
import AuthContext from 'context/auth/AuthContext';
import { useEffect } from 'react';
import { ImSpinner9 } from 'react-icons/im';
import { useRouter } from 'next/router';

const DashboardPage = () => {
	const router = useRouter();

	const authContext = useContext(AuthContext);
	const { logout, users, getUsers, loading } = authContext;

	useEffect(() => {
		getUsers();
		//eslint-disable-next-line
	}, []);
	return (
		<BasePageLayout title='Dashboard'>
			<div className='grid grid-cols-6 gap-4'>
				<div className='hidden md:block md:bg-black md:text-white md:h-[300vh]'>
					<SideBar />
				</div>
				<div className='col-span-5 ml-4 tablet:ml-0'>
					<div className='flex items-center justify-between'>
						<h3 className='mt-8 text-2xl'>
							Hello , <span className='text-purple-700'>Admin 😌</span>
						</h3>
						<div className='block md:hidden'>
							<button
								className='border mt-8 bg-black border-black px-5 py-3 rounded-lg hover:bg-blue-900 whitespace-nowrap'
								onClick={() => logout(router)}
							>
								Logout
							</button>
						</div>
					</div>

					<div className=' grid grid-cols-1 md:grid-cols-3 gap-4 mt-16 mr-4'>
						<DetailCard
							name='Users'
							icon='FaUsers'
							count={users ? users.length : 0}
						/>
						<DetailCard name='Polling Units' icon='FaUsers' count={0} />
					</div>
					<div className='mt-16'>
						<div className='flex items-center justify-between mb-4'>
							<h3 className='text-4xl mr-8 md:mr-32'>Users</h3>
							<input type='text' className='mr-8 rounded-md h-12 w-96 p-3 text-black' placeholder='search' />
						</div>
						<hr />
						<div className=' gri grid-cols-1 md:grid-cols-3 gap-4 mt-16 mr-4'>
							{loading ? (
								<>
									<ImSpinner9 className='animate-spin h-5 w-5 mr-3' />
									Fetching users...
								</>
							) : users && users.length > 0 ? (
								<table className='table-auto w-full'>
									<thead>
										<tr className='border-b-2 text-xl'>
											<th className=''>FirstName</th>
											<th className=''>LastName</th>
											<th className=''>Email</th>
											<th className=''>State</th>
											<th className=''>Lga</th>
											<th className=''>Polling Unit</th>
										</tr>
									</thead>

									<tbody className='mt-8'>
										{users.map((admin: any, index: number) => (
											<tr
												className='border-b-2 h-16 hover:bg-gray-200 text-gray-300 text-center'
												key={index}
											>
												<td className=''>{admin.first_name}</td>
												<td className=''>{admin.last_name}</td>
												<td className=''>{admin.email}</td>
												<td className=''>{admin.state}</td>
												<td className=''>{admin.lga}</td>
												<td className=''>{admin.polling_unit}</td>
											</tr>
										))}
									</tbody>
								</table>
							) : (
								<>There are no users yet...</>
							)}
						</div>
					</div>
				</div>
			</div>
		</BasePageLayout>
	);
};

export default DashboardPage;

import React, { useEffect, useContext } from 'react';
import Head from 'next/head';
import AuthContext from 'context/auth/AuthContext';

const BasePageLayout = ({ title, children }: any) => {

	const authContext = useContext(AuthContext);
	const { loadUser, token } = authContext;

	useEffect(() => {
		if (typeof window !== 'undefined' && localStorage.token) {
			//loadUser();
		}
		//eslint-disable-next-line
	}, [token]);
	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content='Your number one finance management system'
				/>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main>{children}</main>
		</div>
	);
};

BasePageLayout.defaultProps = {
	title: 'PeterObi-BabaAhmed',
};

export default BasePageLayout;

import {Head, Html, Main, NextScript} from 'next/document';

export default function Document() {
	return (
		<Html lang='zh'>
			<Head>
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<body className='bg-red'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}

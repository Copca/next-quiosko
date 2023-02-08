import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import { QuioskoProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<QuioskoProvider>
			<Component {...pageProps} />
		</QuioskoProvider>
	);
}

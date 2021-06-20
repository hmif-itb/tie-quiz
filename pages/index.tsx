import Head from 'next/head';
import { AppProvider } from '../context/AppContext';
import Container from '../components/Container';

const Home = (): JSX.Element => {

    return (
        <AppProvider>
            <div>
                <Head>
                    <title>TIE Quiz</title>
                    <meta property="og:title" content="HMIF Tech - TIE Quiz" />
                </Head>

                
                <Container />
            </div>
        </AppProvider>
    );
};

export default Home;
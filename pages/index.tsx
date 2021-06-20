import Head from 'next/head';
import { AppProvider } from '../context/AppContext';
import Container from '../components/Container';

const Home = (): JSX.Element => {

    return (
        <AppProvider>
            <div>
                <Head>
                    <title>Quiz</title>
                    <meta property="og:title" content="Next.js + Typescript Starter" />
                </Head>

                
                <Container />
            </div>
        </AppProvider>
    );
};

export default Home;
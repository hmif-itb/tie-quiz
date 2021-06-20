import '../styles/globals.css'
import { AppProvider } from '../context/AppContext';
const MyApp = ({ Component, pageProps }) => {
    
    return <Component {...pageProps} />;
}

export default MyApp;

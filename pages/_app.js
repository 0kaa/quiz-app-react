import Layout from "../components/Layout";
import { Provider } from 'react-redux'
import { useStore } from '../store'
import "bootstrap/dist/css/bootstrap.min.css";
import "styles/global.scss";
export default function App({ Component, pageProps }) {
    const store = useStore(pageProps.initialReduxState)
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>

    );
}

import Head from "next/head";
import { useSelector } from 'react-redux'
import styles from "styles/home.module.scss";
const Layout = ({ children }) => {
    const userName = useSelector((state) => state.userName)
    return (
        <>
            <Head>
                <title>Question Task</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            {userName ? <h4 className={styles.name_title}>Hello, <span>{userName}</span></h4> : ''}
            <main className="main-bg">
                {children}
            </main>
        </>
    );
};

export default Layout;

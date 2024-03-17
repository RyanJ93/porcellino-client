import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import AuthView from '../AuthView/AuthView';
import MainView from '../MainView/MainView';
import { CssBaseline } from '@mui/material';
import styles from './App.module.scss';
import Box from '@mui/material/Box';

const App = (props: any) => {
    // @ts-ignore
    useEffect(() => { window.hasAppMounted = true; }, []);
    const [viewName, setViewName] = useState<string>('auth');

    const handleAuthentication = (isNewUser: boolean) => {
        console.log('AUTH', isNewUser);
        setViewName('main');
    };

    return (
        <main>
            <CssBaseline />
            <Box className={'h-100 w-100 d-flex'}>
                { viewName === 'auth' && <AuthView onAuthenticated={handleAuthentication} /> }
                { viewName === 'main' && <MainView /> }
            </Box>
        </main>
    );
};

export default withTranslation(undefined, { withRef: true })(App);

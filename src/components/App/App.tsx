import AuthenticationService from '../../services/AuthenticationService';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import AuthView from '../AuthView/AuthView';
import MainView from '../MainView/MainView';
import { CssBaseline } from '@mui/material';
import styles from './App.module.scss';
import Box from '@mui/material/Box';

const App = (props: any) => {
    const [viewName, setViewName] = useState<string>('');

    useEffect(() => {
        new AuthenticationService().checkAuthenticationStatus().then((status) => {
            const view: string = status ? 'main' : 'auth';
            setViewName(view);
        });
        // @ts-ignore
        window.hasAppMounted = true;
    }, []);


    const handleAuthentication = (isNewUser: boolean): void => setViewName('main');
    const handleLogout = (): void => {
        new AuthenticationService().logout();
        setViewName('auth');
    };

    return (
        <main>
            <CssBaseline />
            <Box className={'h-100 w-100 d-flex'}>
                { viewName === 'auth' && <AuthView onAuthenticated={handleAuthentication} /> }
                { viewName === 'main' && <MainView onLogout={handleLogout} /> }
            </Box>
        </main>
    );
};

export default withTranslation(undefined, { withRef: true })(App);

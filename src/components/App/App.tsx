import { withTranslation } from 'react-i18next';
import AuthView from '../AuthView/AuthView';
import React, { useEffect } from 'react';
import styles from './App.module.scss';
import Box from '@mui/material/Box';

const App = (props: any) => {
    // @ts-ignore
    useEffect(() => { window.hasAppMounted = true; }, []);

    const handleAuthentication = (isNewUser: boolean) => {
        console.log('AUTH', isNewUser);
    };

    return (
        <main>
            <Box className={'h-100 w-100 d-flex'}>
                <AuthView onAuthenticated={handleAuthentication} />
            </Box>
        </main>
    );
};

export default withTranslation(undefined, { withRef: true })(App);

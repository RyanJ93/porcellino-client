import { withTranslation } from 'react-i18next';
import AuthView from '../AuthView/AuthView';
import styles from './App.module.scss';
import Box from '@mui/material/Box';
import React from 'react';

const App = (props: any) => {
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

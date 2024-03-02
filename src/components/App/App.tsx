import { withTranslation } from 'react-i18next';
import AuthView from '../AuthView/AuthView';
import Box from '@mui/material/Box';
import styles from './App.scss';
import React from 'react';

const App = (props: any) => {
    return (
        <main>
            <Box className={'h-100 w-100 d-flex'}>
                <AuthView />
            </Box>
        </main>
    );
};

export default withTranslation(undefined, { withRef: true })(App);

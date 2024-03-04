import { CssBaseline } from '@mui/material';
import { createRoot } from 'react-dom/client';
import App from '../components/App/App';
import Provider from './Provider';
import React from 'react';

class ApplicationProvider implements Provider {
    async run(){
        const element = document.getElementById('root')!;
        const root = createRoot(element);
        root.render((
            <React.StrictMode>
                <CssBaseline />
                <App />
            </React.StrictMode>
        ));
    }
}

export default ApplicationProvider;

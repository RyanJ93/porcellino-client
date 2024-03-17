import Typography from '@mui/material/Typography';
import { AppBar, Toolbar } from '@mui/material';
import Button from '@mui/material/Button';
import styles from './HeaderBar.module.scss';
import React from 'react';

const HeaderBar = (props: any) => {
    return (
        <AppBar position="fixed" sx={{ maxHeight: '64px' }}>
            <Toolbar className={'d-flex w-100'}>
                <div className={'text-start flex-grow-1'}>
                    <Typography variant="h6" component="div">Porcellino</Typography>
                </div>
                <div className={'text-end'}>
                    <Button color="inherit">New portfolio</Button>
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default HeaderBar;

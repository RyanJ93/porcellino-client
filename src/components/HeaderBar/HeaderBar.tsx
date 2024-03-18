import PortfolioSelect from '../portfolio/PortfolioSelect/PortfolioSelect';
import Typography from '@mui/material/Typography';
import Portfolio from '../../entities/Portfolio';
import { AppBar, Toolbar } from '@mui/material';
import { withTranslation } from 'react-i18next';
import styles from './HeaderBar.module.scss';
import React from 'react';

const HeaderBar = (props: any) => {
    const handlePortfolioSelect = (portfolio: Portfolio): void => {
        console.log('PORTFOLIO SELECTED', portfolio.getId());
    };

    return (
        <AppBar position="fixed" sx={{ maxHeight: '64px' }}>
            <Toolbar className={'d-flex w-100'}>
                <div className={'text-start flex-grow-1'}>
                    <Typography variant="h6" component="div">Porcellino</Typography>
                </div>
                <div className={'text-end'}>
                    <PortfolioSelect onPortfolioSelect={handlePortfolioSelect} />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default withTranslation(undefined, { withRef: true })(HeaderBar);

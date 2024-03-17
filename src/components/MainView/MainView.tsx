import PortfolioSection from '../portfolio/PortfolioSection/PortfolioSection';
import LateralMenu from '../LateralMenu/LateralMenu';
import HeaderBar from '../HeaderBar/HeaderBar';
import styles from './MainView.module.scss';
import React, { useState } from 'react';
import Box from '@mui/material/Box';

const MainView = (props: any) => {
    const [sectionName, setSectionName] = useState<string>('portfolio');
    const handleMenuItemSelection = (target: string) => setSectionName(target);

    return (
        <Box className={'w-100 h-100'}>
            <HeaderBar />
            <LateralMenu onMenuItemSelection={handleMenuItemSelection} />
            <Box className={styles.mainContainer + ' w-100 h-100'}>
                { sectionName === 'portfolio' && <PortfolioSection /> }
            </Box>
        </Box>
    );
};

export default MainView;

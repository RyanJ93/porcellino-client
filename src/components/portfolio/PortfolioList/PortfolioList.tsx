import PortfolioCard from '../PortfolioCard/PortfolioCard';
import Portfolio from '../../../entities/Portfolio';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import styles from './PortfolioList.module.scss';
import { withTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PortfolioList = (props: any) => {
    const handleRequestDelete = (portfolio: Portfolio) => props.onRequestDelete(portfolio);
    const handleRequestEdit = (portfolio: Portfolio) => props.onRequestEdit(portfolio);
    const [showLoader, setShowLoader] = useState<boolean>(props.showLoader);
    const [error, setError] = useState<string | undefined>(props.error);

    useEffect(() => setShowLoader(props.showLoader), [props.showLoader]);
    useEffect(() => setError(props.error), [props.error]);

    const handleRetryClick = (): void => props.onRetry();

    const hasError: boolean = typeof error === 'string' && error !== '';
    return (
        <Box className={'d-flex hook__portfolio-list'}>
            { showLoader && !hasError && <Box className={'text-center w-100'}>
                <CircularProgress size={30} />
                <Typography variant={'caption'} component={'p'} className={'text-muted fst-italic'}>{props.t('portfolioList.loading.label')}</Typography>
            </Box>}
            { hasError && !showLoader && <Box className={'text-center w-100'}>
                <Typography variant={'caption'} component={'p'} className={'text-danger fst-italic'}>{error}</Typography>
                <Button onClick={handleRetryClick} variant={'contained'} size={'small'} className={'mt-2'}>{props.t('portfolioList.retry.label')}</Button>
            </Box> }
            { !hasError && !showLoader && props.portfolioList.map((portfolio: Portfolio, index: number) => {
                return <PortfolioCard key={index} portfolio={portfolio} className={'flex-fill m-2'} onRequestEdit={handleRequestEdit} onRequestDelete={handleRequestDelete} />;
            })}
        </Box>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioList);

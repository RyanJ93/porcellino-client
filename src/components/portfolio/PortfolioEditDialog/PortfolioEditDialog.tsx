import PortfolioEditForm from '../PortfolioEditForm/PortfolioEditForm';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './PortfolioEditDialog.module.scss';
import Portfolio from '../../../entities/Portfolio';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';

const PortfolioEditDialog = (props: any) => {
    const [portfolio, setPortfolio] = useState<Portfolio | undefined>(props.portfolio);

    useEffect(() => setPortfolio(props.portfolio), [props.portfolio]);

    const portfolioName: string = portfolio?.getName() ?? '';
    return (
        <Dialog open={props.open} fullWidth={true}>
            <DialogTitle className={'hook__dialog-title'}>{props.t('portfolioEditDialog.title')} <span className={'fw-bold fst-italic'}>{portfolioName}</span></DialogTitle>
            <DialogContent className={'pt-2 pb-4'}>
                <PortfolioEditForm onSubmit={props.onFormSubmit} onCancel={props.onFormCancel} errors={props.formErrors} showLoader={props.showFormLoader} portfolio={portfolio} />
            </DialogContent>
        </Dialog>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioEditDialog);

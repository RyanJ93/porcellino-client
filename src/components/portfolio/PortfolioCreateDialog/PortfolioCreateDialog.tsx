import PortfolioCreateForm from '../PortfolioCreateForm/PortfolioCreateForm';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import styles from './PortfolioCreateDialog.module.scss';
import { withTranslation } from 'react-i18next';
import React from 'react';

const PortfolioCreateDialog = (props: any) => {
    return (
        <Dialog open={props.open} fullWidth={true}>
            <DialogTitle className={'hook__dialog-title'}>{props.t('portfolioCreateDialog.title')}</DialogTitle>
            <DialogContent className={'pt-2 pb-4'}>
                <PortfolioCreateForm onSubmit={props.onFormSubmit} onCancel={props.onFormCancel} errors={props.formErrors} showLoader={props.showFormLoader} />
            </DialogContent>
        </Dialog>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioCreateDialog);

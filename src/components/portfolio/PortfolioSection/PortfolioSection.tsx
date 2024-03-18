import PortfolioCreateDialog from '../PortfolioCreateDialog/PortfolioCreateDialog';
import DeleteConfirmDialog from '../../DeleteConfirmDialog/DeleteConfirmDialog';
import InvalidInputException from '../../../exceptions/InvalidInputException';
import PortfolioEditDialog from '../PortfolioEditDialog/PortfolioEditDialog';
import PortfolioService from '../../../services/PortfolioService';
import ErrorMessageBag from '../../../DTOs/ErrorMessageBag';
import PortfolioList from '../PortfolioList/PortfolioList';
import ReplayIcon from '@mui/icons-material/Replay';
import Portfolio from '../../../entities/Portfolio';
import styles from './PortfolioSection.module.scss';
import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import { withTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';

const PortfolioSection = (props: any) => {
    const [portfolioStagedForDelete, setPortfolioStagedForDelete] = useState<Portfolio | undefined>(undefined);
    const [portfolioStagedForEdit, setPortfolioStagedForEdit] = useState<Portfolio | undefined>(undefined);
    const [createFormErrors, setCreateFormErrors] = useState<PortfolioCreateFormErrors>({});
    const [editFormErrors, setEditFormErrors] = useState<PortfolioEditFormErrors>({});
    const [showCreateFormLoader, setShowCreateFormLoader] = useState<boolean>(false);
    const [listingError, setListingError] = useState<string | undefined>(undefined);
    const [showEditFormLoader, setShowEditFormLoader] = useState<boolean>(false);
    const [showListingLoader, setShowListingLoader] = useState<boolean>(false);
    const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
    const [showDeleteLoader, setShowDeleteLoader] = useState<boolean>(false);
    const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);

    useEffect(() => refreshList(), []);

    const { enqueueSnackbar } = useSnackbar();

    const handleCreateFormSubmit = (fields: PortfolioCreateFormFields): void => {
        setShowCreateFormLoader(true);
        new PortfolioService().create(fields.name, fields.currencyId).then((): void => {
            refreshList(true, false);
        }).catch((ex: Error) => {
            if ( ex instanceof InvalidInputException && ex.hasErrorMessageBag() ){
                const errorMessageBag: ErrorMessageBag = ex.getErrorMessageBag()!;
                setCreateFormErrors(errorMessageBag.getPackedCollection() as PortfolioCreateFormErrors);
            }else{
                setCreateFormErrors({ globalError: props.t('portfolioSection.create.globalError') });
            }
        }).finally((): void => {
            setShowCreateFormLoader(false);
            setCreateDialogOpen(false);
        });
    };

    const handleEditFormSubmit = (fields: PortfolioEditFormFields): void => {
        setShowEditFormLoader(true);
        new PortfolioService(portfolioStagedForEdit).update(fields.name)
            .then((): void => {
                enqueueSnackbar(props.t('portfolioSection.edit.success'), { variant: 'success' });
                refreshList(true, false);
            }).catch((ex: Error): void => {
                if ( ex instanceof InvalidInputException && ex.hasErrorMessageBag() ){
                    const errorMessageBag: ErrorMessageBag = ex.getErrorMessageBag()!;
                    setEditFormErrors(errorMessageBag.getPackedCollection() as PortfolioEditFormErrors);
                }else{
                    setEditFormErrors({ globalError: props.t('portfolioSection.edit.globalError') });
                }
            }).finally((): void => {
                setPortfolioStagedForEdit(undefined);
                setShowEditFormLoader(false);
            });
    };

    const handlePortfolioDelete = (): void => {
        setShowDeleteLoader(true);
        new PortfolioService(portfolioStagedForDelete).delete()
            .then((): void => {
                enqueueSnackbar(props.t('portfolioSection.delete.success'), { variant: 'success' });
                refreshList(true, false);
            }).catch((ex: Error) => {
                enqueueSnackbar(props.t('portfolioSection.delete.error'), { variant: 'error' });
                console.error(ex);
            }).finally((): void => {
                setPortfolioStagedForDelete(undefined);
                setShowDeleteLoader(false);
            });
    };

    const refreshList = (refresh: boolean = false, showLoader: boolean = true): void => {
        setShowListingLoader(showLoader);
        setListingError(undefined);
        new PortfolioService().fetchList(refresh)
            .then((portfolioList: Portfolio[]): void => setPortfolioList(portfolioList))
            .catch((ex: Error): void => {
                setListingError(props.t('portfolioSection.list.error'));
                console.error(ex);
            }).finally((): void => setShowListingLoader(false));
    };

    const handleRequestDelete = (portfolio: Portfolio): void => setPortfolioStagedForDelete(portfolio);
    const handleRequestEdit = (portfolio: Portfolio): void => setPortfolioStagedForEdit(portfolio);
    const handleDeleteCancel = (): void => setPortfolioStagedForDelete(undefined);
    const handleEditFormCancel = (): void => setPortfolioStagedForEdit(undefined);
    const handleNewPortfolioButtonClick = (): void => setCreateDialogOpen(true);
    const handleCreateFormCancel = (): void => setCreateDialogOpen(false);
    const handleRefreshList = (): void => refreshList(true);

    const deleteDialogOpen: boolean = typeof portfolioStagedForDelete !== 'undefined';
    const editDialogOpen: boolean = typeof portfolioStagedForEdit !== 'undefined';
    const deletePortfolioName: string = portfolioStagedForDelete?.getName() ?? '';
    return (
        <Box className={'p-4'}>
            <Box className={'mb-4 d-flex'}>
                <div className={'flex-grow-1'}>
                    <Typography variant="h5" className={'hook__section-title'}>{props.t('portfolioSection.title')}</Typography>
                </div>
                <div>
                    <Tooltip title={props.t('portfolioSection.refresh.title')} arrow={true}>
                        <Button variant={'contained'} onClick={handleRefreshList} className={'me-2'}>
                            <ReplayIcon />
                        </Button>
                    </Tooltip>
                    <Button variant={'contained'} onClick={handleNewPortfolioButtonClick} className={'hook__portfolio-create-btn'}>{props.t('portfolioSection.create.label')}</Button>
                </div>
            </Box>
            <PortfolioList portfolioList={portfolioList} onRequestEdit={handleRequestEdit} onRequestDelete={handleRequestDelete} onRetry={handleRefreshList} error={listingError} showLoader={showListingLoader} />
            <PortfolioEditDialog open={editDialogOpen} onFormSubmit={handleEditFormSubmit} onFormCancel={handleEditFormCancel} formErrors={editFormErrors} showFormLoader={showEditFormLoader} portfolio={portfolioStagedForEdit} />
            <PortfolioCreateDialog open={createDialogOpen} onFormSubmit={handleCreateFormSubmit} onFormCancel={handleCreateFormCancel} formErrors={createFormErrors} showFormLoader={showCreateFormLoader} />
            <DeleteConfirmDialog open={deleteDialogOpen} title={props.t('portfolioSection.deleteConfirm.title')} showLoader={showDeleteLoader} onConfirm={handlePortfolioDelete} onCancel={handleDeleteCancel}>
                <Typography>{props.t('portfolioSection.deleteConfirm.text')} <span className={'fw-bold fst-italic'}>{deletePortfolioName}</span>?</Typography>
                <Typography>{props.t('portfolioSection.deleteConfirm.subtext')}</Typography>
            </DeleteConfirmDialog>
        </Box>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioSection);

import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styles from './DeleteConfirmDialog.module.scss';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const DeleteConfirmDialog = (props: any) => {
    const [showLoader, setShowLoader] = useState<boolean>(props.showLoader);
    const [open, setOpen] = useState<boolean>(false);

    useEffect((): void => setShowLoader(props.showLoader === true), [props.showLoader]);
    useEffect((): void => setOpen(props.open), [props.open]);

    const handleConfirm = (): void => props.onConfirm();
    const handleCancel = (): void => props.onCancel();

    return (
        <Dialog open={open}>
            <DialogTitle className={'hook__dialog-title'}>{props.title}</DialogTitle>
            <DialogContent>{props.children}</DialogContent>
            <DialogActions>
                <Box className={'mt-4 text-end'}>
                    <Button variant={'contained'} onClick={handleCancel} className={'hook__delete-confirm-dialog-cancel-btn'}>{props.t('deleteConfirmDialog.cancel.label')}</Button>
                    <Box sx={{ m: 1, position: 'relative' }} className={'ms-2 d-inline-block'}>
                        <Button variant={'contained'} color={'error'} disabled={showLoader} onClick={handleConfirm} className={'hook__delete-confirm-dialog-confirm-btn'}>{props.t('deleteConfirmDialog.delete.label')}</Button>
                        { showLoader && <CircularProgress size={24} className={styles.circularProgress} /> }
                    </Box>
                </Box>
            </DialogActions>
        </Dialog>
    );
};

export default withTranslation(undefined, { withRef: true })(DeleteConfirmDialog);

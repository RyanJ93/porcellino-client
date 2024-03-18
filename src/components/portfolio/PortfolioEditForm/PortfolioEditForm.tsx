import { CircularProgress, FormControl, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import EditForm from '../../../forms/portfolio/EditForm';
import styles from './PortfolioEditForm.module.scss';
import Portfolio from '../../../entities/Portfolio';
import { withTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PortfolioEditForm = (props: any) => {
    const [portfolio, setPortfolio] = useState<Portfolio | undefined>(props.portfolio);
    const [errors, setErrors] = useState<PortfolioEditFormErrors>(props.errors);
    const [showLoader, setShowLoader] = useState<boolean>(props.showLoader);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect((): void => setShowLoader(props.showLoader === true), [props.showLoader]);
    useEffect((): void => setPortfolio(props.portfolio), [props.portfolio]);
    useEffect((): void => setErrors(props.errors), [props.errors]);

    const getFormFields = (): PortfolioEditFormFields => {
        return { name: ( nameInputRef.current?.value ?? '' ) };
    };

    const isFormValid = (): boolean => {
        const editForm: EditForm = new EditForm();
        const isFormValid: boolean = editForm.isValid(getFormFields());
        setErrors(editForm.getErrors());
        return isFormValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        event.stopPropagation();
        if ( isFormValid() && typeof props.onSubmit === 'function' ){
            props.onSubmit(getFormFields());
        }
    };

    const handleReset = (): void => props.onCancel();

    const hasGlobalError: boolean = typeof errors.globalError === 'string';
    const isNameInvalid: boolean = typeof errors.name === 'string';
    const name: string = portfolio?.getName() ?? '';
    return (
        <form onSubmit={handleSubmit} onReset={handleReset} noValidate={true} autoComplete={'on'} className={'hook__portfolio-edit-form'}>
            <FormControl variant={'standard'} fullWidth={true} error={isNameInvalid}>
                <TextField name={'name'} type={'text'} label={props.t('portfolioEditForm.form.name.label')} variant="outlined" inputRef={nameInputRef} error={isNameInvalid} defaultValue={name} key={name} required fullWidth />
                { isNameInvalid && <FormHelperText data-target-field={'name'} className={'error-msg'} error={true}>{errors.name}</FormHelperText> }
            </FormControl>
            { hasGlobalError && <FormHelperText data-target-field={'global'} className={'error-msg'} error={true}>{errors.globalError}</FormHelperText> }
            <Box className={'mt-4 text-end'}>
                <Button variant={'contained'} type={'reset'} color={'error'}>{props.t('portfolioEditForm.form.cancel.label')}</Button>
                <Box sx={{ m: 1, position: 'relative' }} className={'ms-2 d-inline-block'}>
                    <Button variant={'contained'} type={'submit'} disabled={showLoader}>{props.t('portfolioEditForm.form.edit.label')}</Button>
                    { showLoader && <CircularProgress size={24} className={styles.circularProgress} /> }
                </Box>
            </Box>
        </form>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioEditForm);

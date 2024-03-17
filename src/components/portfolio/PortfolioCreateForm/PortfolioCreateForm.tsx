import { CircularProgress, FormControl, TextField } from '@mui/material';
import CurrencySelect from '../../CurrencySelect/CurrencySelect';
import CreateForm from '../../../forms/portfolio/CreateForm';
import React, { useEffect, useRef, useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import styles from './PortfolioCreateForm.module.scss';
import { withTranslation } from 'react-i18next';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const PortfolioCreateForm = (props: any) => {
    const [errors, setErrors] = useState<PortfolioCreateFormErrors>(props.errors);
    const [showLoader, setShowLoader] = useState<boolean>(props.showLoader);
    const currencyInputRef = useRef<HTMLSelectElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => setShowLoader(props.showLoader === true), [props.showLoader]);
    useEffect(() => setErrors(props.errors), [props.errors]);

    const getFormFields = (): PortfolioCreateFormFields => {
        const currencyId: string = currencyInputRef.current?.value ?? '';
        const name: string = nameInputRef.current?.value ?? '';
        return { name: name, currencyId: parseInt(currencyId) };
    };

    const isFormValid = (): boolean => {
        const createForm: CreateForm = new CreateForm();
        const isFormValid: boolean = createForm.isValid(getFormFields());
        setErrors(createForm.getErrors());
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
    const isCurrencyInvalid: boolean = typeof errors.currency === 'string';
    const isNameInvalid: boolean = typeof errors.name === 'string';
    return (
        <form onSubmit={handleSubmit} onReset={handleReset} noValidate={true} autoComplete={'on'} className={'hook__portfolio-create-form'}>
            <FormControl variant={'standard'} fullWidth={true} error={isNameInvalid}>
                <TextField name={'name'} type={'text'} label={props.t('portfolioCreateForm.form.name.label')} variant="outlined" inputRef={nameInputRef} error={isNameInvalid} required fullWidth/>
                { isNameInvalid && <FormHelperText data-target-field={'name'} className={'error-msg'} error={true}>{errors.name}</FormHelperText> }
            </FormControl>
            <FormControl variant={'standard'} fullWidth={true} error={isCurrencyInvalid} className={'mt-2'}>
                <CurrencySelect label={props.t('portfolioCreateForm.form.currency.label')} name={'currency'} required={true} fullWidth={true} inputRef={currencyInputRef} error={isCurrencyInvalid} />
                { isCurrencyInvalid && <FormHelperText data-target-field={'currency'} className={'error-msg'} error={true}>{errors.currency}</FormHelperText> }
            </FormControl>
            { hasGlobalError && <FormHelperText data-target-field={'global'} className={'error-msg'} error={true}>{errors.globalError}</FormHelperText> }
            <Box className={'mt-4 text-end'}>
                <Button variant={'contained'} type={'reset'} color={'error'}>{props.t('portfolioCreateForm.form.cancel.label')}</Button>
                <Box sx={{ m: 1, position: 'relative' }} className={'ms-2 d-inline-block'}>
                    <Button variant={'contained'} type={'submit'} disabled={showLoader}>{props.t('portfolioCreateForm.form.create.label')}</Button>
                    { showLoader && <CircularProgress size={24} className={styles.circularProgress} /> }
                </Box>
            </Box>
        </form>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioCreateForm);

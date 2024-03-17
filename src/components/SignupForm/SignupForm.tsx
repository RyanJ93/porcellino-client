import EMailAddressTakenException from '../../exceptions/EMailAddressTakenException';
import InvalidInputException from '../../exceptions/InvalidInputException';
import { CircularProgress, FormControl, TextField } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import ErrorMessageBag from '../../DTOs/ErrorMessageBag';
import UserService from '../../services/UserService';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import styles from './SignupForm.module.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const SignupForm = (props: any) => {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [errors, setErrors] = useState<SignupFormErrors>({});

    const passwordConfirmInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);

    const isFormValid = (): boolean => {
        const passwordConfirm: string = passwordConfirmInputRef.current?.value ?? '';
        const password: string = passwordInputRef.current?.value ?? '';
        const email: string = passwordInputRef.current?.value ?? '';
        const errors: SignupFormErrors = {};
        let isFormValid: boolean = true;
        if ( password !== passwordConfirm || password === '' || passwordConfirm === '' ){
            errors.passwordConfirm = props.t('signupForm.form.passwordConfirm.error');
            isFormValid = false;
        }
        if ( password === '' || password.length < 6 ){
            errors.password = props.t('signupForm.form.password.error');
            isFormValid = false;
        }
        if ( email === '' ){
            errors.email = props.t('signupForm.form.email.error');
            isFormValid = false;
        }
        setErrors(errors);
        return isFormValid;
    };

    const handleSubmitError = (ex: Error): void => {
        if ( ex instanceof EMailAddressTakenException ){
            setErrors({ globalError: props.t('signupForm.globalError.emailAddressTaken') });
        }else if ( ex instanceof InvalidInputException && ex.hasErrorMessageBag() ){
            const errorMessageBag: ErrorMessageBag = ex.getErrorMessageBag()!;
            setErrors(errorMessageBag.getPackedCollection() as SignupFormErrors);
        }else{
            setErrors({ globalError: props.t('signupForm.globalError.generalError') });
        }
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        if ( isFormValid() ){
            const password: string = passwordInputRef.current?.value ?? '';
            const email: string = emailInputRef.current?.value ?? '';
            setShowLoader(true);
            new UserService().signup(email, password)
                .then(() => props?.onAuthenticated())
                .catch((ex) => handleSubmitError(ex))
                .finally(() => setShowLoader(false));
        }
    };

    const isPasswordConfirmInvalid: boolean = typeof errors?.passwordConfirm !== 'undefined';
    const isPasswordInvalid: boolean = typeof errors?.password !== 'undefined';
    const hasGlobalError: boolean = typeof errors?.globalError === 'string';
    const isEmailInvalid: boolean = typeof errors?.email !== 'undefined';
    return (
        <Box className={'p-2 text-center ' + styles.signupForm}>
            <form onSubmit={handleSubmit} noValidate={true} autoComplete={'on'} data-action={'user.signup'}>
                <Typography variant="h5" gutterBottom className={'mb-2'}>{props.t('signupForm.form.title')}</Typography>
                <FormControl variant="standard" fullWidth={true} error={isEmailInvalid}>
                    <TextField name={'email'} type={'email'} label={props.t('signupForm.form.email.label')} variant="outlined" inputRef={emailInputRef} error={isEmailInvalid} required fullWidth />
                    { isEmailInvalid && <FormHelperText id="email-error-text" className={'error-msg'} error={isEmailInvalid}>{errors.email}</FormHelperText> }
                </FormControl>
                <FormControl variant="standard" fullWidth={true} error={isPasswordInvalid} className={'mt-2'}>
                    <TextField name={'password'} type={'password'} label={props.t('signupForm.form.password.label')} variant="outlined" inputRef={passwordInputRef} error={isPasswordInvalid} required fullWidth />
                    { isPasswordInvalid && <FormHelperText id="password-error-text" className={'error-msg'} error={isPasswordInvalid}>{errors.password}</FormHelperText> }
                </FormControl>
                <FormControl variant="standard" fullWidth={true} error={isPasswordConfirmInvalid} className={'mt-2'}>
                    <TextField name={'password-confirm'} type={'password'} label={props.t('signupForm.form.passwordConfirm.label')} variant="outlined" inputRef={passwordConfirmInputRef} error={isPasswordConfirmInvalid} required fullWidth />
                    { isPasswordConfirmInvalid && <FormHelperText id="password-confirm-error-text" className={'error-msg'} error={isPasswordConfirmInvalid}>{errors.passwordConfirm}</FormHelperText> }
                </FormControl>
                { hasGlobalError && <FormHelperText id="global-error-text" className={'error-msg'} error={true}>{errors.globalError}</FormHelperText> }
                <Box sx={{ m: 1, position: 'relative' }} className={'mt-4'}>
                    <Button variant="contained" type={'submit'} disabled={showLoader}>{props.t('signupForm.form.button')}</Button>
                    { showLoader && <CircularProgress size={24} className={styles.circularProgress} /> }
                </Box>
            </form>
        </Box>
    );
};

export default withTranslation(undefined, { withRef: true })(SignupForm);

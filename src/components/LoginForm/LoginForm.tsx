import { Checkbox, CircularProgress, FormControl, FormControlLabel, TextField } from '@mui/material';
import UnauthorizedException from '../../exceptions/UnauthorizedException';
import InvalidInputException from '../../exceptions/InvalidInputException';
import AuthenticationService from '../../services/AuthenticationService';
import NotFoundException from '../../exceptions/NotFoundException';
import FormHelperText from '@mui/material/FormHelperText';
import ErrorMessageBag from '../../DTOs/ErrorMessageBag';
import Typography from '@mui/material/Typography';
import React, { useRef, useState } from 'react';
import { withTranslation } from 'react-i18next';
import styles from './LoginForm.module.scss';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

type LoginFormErrors = {
    globalError?: string,
    password?: string,
    email?: string
};

const LoginForm = (props: any) => {
    const [showLoader, setShowLoader] = useState<boolean>(false);
    const [errors, setErrors] = useState<LoginFormErrors>({});

    const passwordInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const rememberMeRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const processErrorMessageBag = (errorMessageBag?: ErrorMessageBag): void => {
        if ( errorMessageBag instanceof ErrorMessageBag ){
            const errorMessages = errorMessageBag.getAll(), errors: any = {};
            for ( const fieldName in errorMessages ){
                errors[fieldName] = errorMessages[fieldName].join('\n');
            }
            setErrors(errors);
        }
    };

    const isFormValid = (): boolean => {
        const password = passwordInputRef.current?.value ?? '';
        const email = passwordInputRef.current?.value ?? '';
        const errors: LoginFormErrors = {};
        let isFormValid: boolean = true;
        if ( password === '' || password.length < 6 ){
            errors.password = props.t('loginForm.form.password.error');
            isFormValid = false;
        }
        if ( email === '' ){
            errors.email = props.t('loginForm.form.email.error');
            isFormValid = false;
        }
        setErrors(errors);
        return isFormValid;
    };

    const handleSubmit = (event: React.FormEvent): void => {
        event.preventDefault();
        event.stopPropagation();
        if ( isFormValid() ){
            const rememberMe = rememberMeRef.current?.checked ?? false;
            const password = passwordInputRef.current?.value ?? '';
            const email = emailInputRef.current?.value ?? '';
            setShowLoader(true);
            new AuthenticationService().authenticate(email, password, rememberMe).then(() => {
                if ( typeof props.onAuthenticated === 'function' ){
                    props.onAuthenticated();
                }
            }).catch((ex) => {
                if ( ex instanceof UnauthorizedException || ex instanceof NotFoundException ){
                    setErrors({ globalError: props.t('loginForm.globalError.invalidCredentials') });
                }else if ( ex instanceof InvalidInputException ){
                    processErrorMessageBag(ex.getErrorMessageBag());
                }else{
                    setErrors({ globalError: props.t('loginForm.globalError.generalError') });
                }
            }).finally(() => setShowLoader(false));
        }
    };

    const isPasswordInvalid: boolean = typeof errors?.password !== 'undefined';
    const hasGlobalError: boolean = typeof errors?.globalError === 'string';
    const isEmailInvalid: boolean = typeof errors?.email !== 'undefined';
    return (
        <Box className={'p-2 text-center ' + styles.loginForm}>
            <form onSubmit={handleSubmit} ref={formRef} noValidate={true} autoComplete={'on'}>
                <Typography variant="h5" gutterBottom className={'mb-2'}>{props.t('loginForm.form.title')}</Typography>
                <FormControl variant="standard" fullWidth={true} error={isEmailInvalid}>
                    <TextField id="email" type={'email'} label={props.t('loginForm.form.email.label')} variant="outlined" inputRef={emailInputRef} error={isEmailInvalid} required fullWidth />
                    { isEmailInvalid && <FormHelperText id="email-error-text" error={isEmailInvalid}>{errors.email}</FormHelperText> }
                </FormControl>
                <FormControl variant="standard" fullWidth={true} error={isPasswordInvalid} className={'mt-2'}>
                    <TextField id="password" type={'password'} label={props.t('loginForm.form.password.label')} variant="outlined" inputRef={passwordInputRef} error={isPasswordInvalid} required fullWidth />
                    { isPasswordInvalid && <FormHelperText id="password-error-text" error={isPasswordInvalid}>{errors.password}</FormHelperText> }
                </FormControl>
                <FormControl variant="standard" fullWidth={true} className={'mt-2'} size={'small'}>
                    <FormControlLabel control={<Checkbox inputRef={rememberMeRef} size={'small'} />} label="Remember me" />
                </FormControl>
                { hasGlobalError && <FormHelperText id="global-error-text" error={true}>{errors.globalError}</FormHelperText> }
                <Box sx={{ m: 1, position: 'relative' }} className={'mt-4'}>
                    <Button variant="contained" type={'submit'} disabled={showLoader}>{props.t('loginForm.form.button')}</Button>
                    { showLoader && <CircularProgress size={24} className={styles.circularProgress} /> }
                </Box>
            </form>
        </Box>
    );
};

export default withTranslation(undefined, { withRef: true })(LoginForm);

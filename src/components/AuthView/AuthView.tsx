import SignupForm from '../SignupForm/SignupForm';
import Typography from '@mui/material/Typography';
import { withTranslation } from 'react-i18next';
import LoginForm from '../LoginForm/LoginForm';
import styles from './AuthView.module.scss';
import React, {useState} from 'react';

const AuthView = (props: any) => {
    const [containerName, setContainerName] = useState<string>('login');

    const handleSignupAuthentication = () => props?.onAuthenticated(true);
    const handleLoginAuthentication = () => props?.onAuthenticated(false);
    const displaySignupForm = () => setContainerName('signup');
    const displayLoginForm = () => setContainerName('login');

    return (
        <div className={'w-100 h-100 d-flex'}>
            <section className={'m-auto'}>
                <img src={'/logo.png'} alt={'Logo'} width={128} className={'m-auto d-block'}/>
                <Typography variant="h3" gutterBottom className={'mt-2 text-center'}>{props.t('authView.title')}</Typography>
                <div className={'mt-4'}>
                    { containerName === 'signup' && <SignupForm onAuthenticated={handleSignupAuthentication} /> }
                    { containerName === 'login' && <LoginForm onAuthenticated={handleLoginAuthentication} /> }
                </div>
                <div className={'mt-2'}>
                    { containerName === 'signup' && <Typography variant="subtitle1" gutterBottom>
                        {props.t('authView.loginSwitch.question')} <a href={'#'} onClick={displayLoginForm}>{props.t('authView.loginSwitch.answer')}</a>
                    </Typography> }
                    { containerName === 'login' && <Typography variant="subtitle1" gutterBottom>
                        {props.t('authView.signupSwitch.question')} <a href={'#'} onClick={displaySignupForm}>{props.t('authView.signupSwitch.answer')}</a>
                    </Typography> }
                </div>
            </section>
        </div>
    );
};

export default withTranslation(undefined, {withRef: true})(AuthView);

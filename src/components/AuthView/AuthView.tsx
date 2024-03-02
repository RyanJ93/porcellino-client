import Typography from '@mui/material/Typography';
import { withTranslation } from 'react-i18next';
import LoginForm from '../LoginForm/LoginForm';
import styles from './AuthView.module.scss';
import React, {useState} from 'react';

const AuthView = (props: any) => {
    const [containerName, setContainerName] = useState<string>('login');

    return (
        <div className={'w-100 h-100 d-flex'}>
            <section className={'m-auto'}>
                <img src={'/logo.png'} alt={'Logo'} width={128} className={'m-auto d-block'}/>
                <Typography variant="h3" gutterBottom className={'mt-2 text-center'}>Porcellino</Typography>
                <div className={'mt-4'}>
                    { containerName === 'login' && <LoginForm /> }
                </div>
            </section>
        </div>
    );
};

export default withTranslation(undefined, {withRef: true})(AuthView);

import Typography from '@mui/material/Typography';
import { CircularProgress } from '@mui/material';
import styles from './Loader.module.scss';
import React from 'react';

type LoaderProps = {
    className?: string,
    label?: string
};

const Loader = (props: LoaderProps) => {
    return (
        <div className={props.className}>
            <CircularProgress className={'text-center'} />
            { typeof props.label === 'string' && <Typography variant="caption" className={'mt-2 d-block'}>{props.label}</Typography> }
        </div>
    );
};

export default Loader;

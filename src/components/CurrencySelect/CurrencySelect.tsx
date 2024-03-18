import CurrencyService from '../../services/CurrencyService';
import { InputLabel, MenuItem, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import styles from './CurrencySelect.module.scss';
import Currency from '../../entities/Currency';

const CurrencySelect = (props: any) => {
    const [currencyList, setCurrencyList] = useState<Currency[]>([]);

    useEffect(() => {
        new CurrencyService().fetchList().then((currencyList: Currency[]) => {
            setCurrencyList(currencyList);
        }).catch((ex: Error) => console.error(ex));
    }, []);

    return (
        <React.Fragment>
            <InputLabel>{props.label}</InputLabel>
            <Select {...props} data-name={props.name} data-input-equiv={'select'} displayEmpty>
                {currencyList.map((currency: Currency, index: number) => {
                    return <MenuItem key={index} value={currency.getId()}>{currency.getName()}</MenuItem>;
                })}
            </Select>
        </React.Fragment>
    );
};

export default CurrencySelect;

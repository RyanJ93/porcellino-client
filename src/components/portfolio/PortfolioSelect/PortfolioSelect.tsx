import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import PortfolioService from '../../../services/PortfolioService';
import React, { useEffect, useRef, useState } from 'react';
import Portfolio from '../../../entities/Portfolio';
import styles from './PortfolioSelect.module.scss';
import { withTranslation } from 'react-i18next';
import Event from '../../../facades/Event';

const PortfolioSelect = (props: any) => {
    const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | undefined>(undefined);
    const [portfolioList, setPortfolioList] = useState<Portfolio[]>([]);
    const selectRef = useRef<React.ReactElement>(null);

    const refreshPortfolioList = (): void => {
        new PortfolioService().fetchList().then((portfolioList) => {
            setPortfolioList(portfolioList);
            if ( !hasPortfolio(portfolioList) ){
                setSelectedPortfolio(undefined);
            }
        });

    };

    const hasPortfolio = (portfolioList: Portfolio[]): boolean => {
        let hasPortfolio: boolean = ( typeof selectedPortfolio === 'undefined' ), i: number = 0;
        while ( !hasPortfolio && i < portfolioList.length ){
            if ( portfolioList[i].getId() === selectedPortfolio?.getId() ){
                hasPortfolio = true;
            }
            i++;
        }
        return hasPortfolio;
    };

    const handleChange = (event: SelectChangeEvent): void => {
        if ( event.target.value !== '' ){
            const portfolioId: number = parseInt(event.target.value);
            const portfolio: Portfolio | undefined = new PortfolioService().getById(portfolioId);
            if ( typeof portfolio === 'undefined' ){
                setSelectedPortfolio(undefined);
            }else if ( typeof props.onPortfolioSelect === 'function' ){
                props.onPortfolioSelect(portfolio);
                setSelectedPortfolio(portfolio);
            }
        }
    };

    useEffect((): any => {
        Event.getBroker().on('portfolioCreate', () => refreshPortfolioList());
        Event.getBroker().on('portfolioUpdate', () => refreshPortfolioList());
        Event.getBroker().on('portfolioDelete', () => refreshPortfolioList());
        refreshPortfolioList();
    }, []);

    const value: string = ( selectedPortfolio?.getId() ?? '' ).toString();
    return (
        <Select className={styles.portfolioSelect + ' hook__portfolio-select'} size={'small'} autoWidth={true} displayEmpty={true} value={value} onChange={handleChange} ref={selectRef}>
            <MenuItem disabled={true} selected={true} value={''}><em>{props.t('portfolioSelect.select.placeholder')}</em></MenuItem>
            { portfolioList.map((portfolio: Portfolio, index: number) => {
                return <MenuItem value={portfolio.getId()} key={index}>{portfolio.getName()}</MenuItem>;
            }) }
        </Select>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioSelect);

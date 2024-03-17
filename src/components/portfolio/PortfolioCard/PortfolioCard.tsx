import { Card, CardActions, CardContent, IconButton, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import DateUtils from '../../../utils/DateUtils';
import styles from './PortfolioCard.module.scss';
import { withTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React from 'react';

const PortfolioCard = (props: any) => {
    const handleDeleteClick = (): void => props.onRequestDelete(props.portfolio);
    const handleEditClick = (): void => props.onRequestEdit(props.portfolio);

    const date: string = DateUtils.formatDate(props.portfolio.getCreatedAt());
    const currencyName: string = props.portfolio.getCurrency().getName();
    const name: string = props.portfolio.getName();
    return (
        <Card variant={'outlined'} className={styles.portfolioCard + ' ' + props.className + ' hook__portfolio-card'}>
            <CardContent className={'p-3'}>
                <Box className={'d-flex w-100'}>
                    <Box className={'flex-grow-1'}>
                        <Typography variant={'h5'} className={'hook__portfolio-card-title'}>{name}</Typography>
                        <Typography className={'text-muted'} variant={'caption'}>{date}</Typography>
                    </Box>
                    <Box>
                        <Tooltip title={props.t('portfolioCard.edit.title')} arrow={true}>
                            <IconButton onClick={handleEditClick} size={'small'} color={'primary'} className={'hook__portfolio-card-edit-btn'}>
                                <EditIcon fontSize={'inherit'} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={props.t('portfolioCard.delete.title')} arrow={true}>
                            <IconButton onClick={handleDeleteClick} size={'small'} color={'error'} className={'hook__portfolio-card-delete-btn'}>
                                <DeleteIcon fontSize={'inherit'} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
            </CardContent>
            <CardActions className={'p-3 pt-4'}>
                <Box className={'d-flex w-100'}>
                    <Button size={'small'} color={'primary'} variant={'contained'} startIcon={<DashboardIcon />}>{props.t('portfolioCard.dashboard.label')}</Button>
                    <Box className={'flex-grow-1 text-end'}>
                        <Typography variant={'overline'} component={'p'} className={'fw-bold lh-1'}>{props.t('portfolioCard.currency.label')}</Typography>
                        <Typography variant={'caption'} component={'p'} className={'fst-italic'}>{currencyName}</Typography>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    );
};

export default withTranslation(undefined, { withRef: true })(PortfolioCard);

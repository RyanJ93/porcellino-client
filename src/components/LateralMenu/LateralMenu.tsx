import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import ListIcon from '@mui/icons-material/List';
import styles from './LateralMenu.module.scss';
import React from 'react';

const LateralMenu = (props: any) => {
    const handleMenuItemSelection = (event: React.MouseEvent<HTMLElement>): void => {
        if ( typeof props.onMenuItemSelection === 'function' ){
            const container: HTMLElement = (event.target as HTMLElement).closest('*[data-target]')!;
            const target: string = container.getAttribute('data-target') ?? '';
            props.onMenuItemSelection(target);
        }
    };
    const handleLogout = (): void => props.onLogout();

    return (
        <Drawer variant={'permanent'} open={true} className={styles.lateralMenu}>
            <List className={'hook__lateral-menu-list'}>
                <ListItem key={0} disablePadding data-target={'portfolio'}>
                    <ListItemButton onClick={handleMenuItemSelection}>
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Portfolios'} />
                    </ListItemButton>
                </ListItem>
                <ListItem key={1} disablePadding data-target={'logout'}>
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default LateralMenu;

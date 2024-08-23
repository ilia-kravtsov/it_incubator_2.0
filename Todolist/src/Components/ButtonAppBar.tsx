import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuButton} from "./MenuButton";
import Switch from '@mui/material/Switch'

type Props = {
    themeMode: () => void
}

export const ButtonAppBar = ({themeMode}: Props) => {

    const fontFamily = {
        fontFamily: 'Montserrat'
    }

    return (
        <Box style={{width: '100%'}} >
            <AppBar position="static" style={{backgroundColor: 'transparent'}}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{fontFamily: 'Montserrat', color: 'silver'}}>
                        Todolists
                    </Typography>
                    <MenuButton style={fontFamily}>Login</MenuButton>
                    <MenuButton style={fontFamily}>Logout</MenuButton>
                    <MenuButton style={fontFamily}>Faq</MenuButton>
                    <Switch color={'default'} onChange={themeMode} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

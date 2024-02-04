import React from 'react'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import { useNavigate } from 'react-router-dom';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';




const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const CustomDrawer = styled(Drawer)({
    '& .MuiDrawer-paper': {
        background: 'transparent',
        backdropFilter: 'blur(20px)',
    },
});

const items = [
    {
        name: 'Home',
        icon: <HomeIcon sx={{ fontSize: 26, color: "white" }} />,
        link: '/'
    },
    {
        name: 'Top Rated',
        icon: <RocketLaunchIcon sx={{ fontSize: 26, color: "white" }} />,
        link: '/top-rated'
    },
    {
        name: 'Movies',
        icon: <LocalMoviesIcon sx={{ color: "white" }} />,
        link: "/movies"
    },
    {
        name: 'Tv Shows',
        icon: <LiveTvIcon sx={{ color: "white" }} />,
        link: 'tv-shows'
    },
]


const Menu = ({ toggleDrawer, show }) => {
    const navigate = useNavigate()


    return (
        <CustomDrawer
            open={show}
            onClose={toggleDrawer}
        >
            <Box
                sx={{
                    width: 250,
                    color: 'white'
                }}
                role="presentation"
            >
                <DrawerHeader>
                    <IconButton onClick={toggleDrawer} sx={{ mr: 1, padding: '3px' }}>
                        <ChevronLeftIcon style={{ fontSize: 34, color: 'white' }} />
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ backgroundColor: 'grey' }} />
                <List>
                    {items?.map((item, index) => (
                        <div key={index}>
                            <ListItem  disablePadding onClick={() => { navigate(item.link); toggleDrawer() }}>
                                <ListItemButton sx={{ paddingTop: '12px', paddingBottom: '12px' }}>
                                    <ListItemIcon sx={{ minWidth: '46px' }} >
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} />
                                </ListItemButton>
                            </ListItem>
                            <Divider sx={{ backgroundColor: 'grey' }} />
                        </div>
                    ))}
                </List>
            </Box>
        </CustomDrawer>
    )
}

export default Menu;
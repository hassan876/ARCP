import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { APP_NAME } from '../app preferences/app manifest';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AuthContext from '../context/auth/authcontext';
import CourseContext from '../context/course/courseContext';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Link } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    AppBar: {
        zIndex: theme.zIndex.modal + 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#f7f7f7'
    },
    user_avatar: {
        marginRight: '13px',
        marginLeft: '5px'
    },
    custom_button: {
        borderColor: '#f7f7f7',
        color: '#f7f7f7'
    },
    drawerIconContainer: {
        "&:hover": {
            backgroundColor: 'transparent'
        }
    }, drawerIcon: {
        color: '#fff'
    }, userName: {
        textTransform: 'capitalize',
        letterSpacing: '.5px'
    },
    customMenuList: {

        width: '200px',
        marginTop: '14px',
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'inline-block',
            minWidth: '20px',
            minHeight: '20px',
            backgroundColor: '#fff',
            position: 'absolute',
            top: '-8px',
            left: '136px',
            transform: 'rotate(45deg)'
        },
    },
    iconMarginLeft: {
        marginRight: '10px',
        fill: 'rgba(0, 0, 0, 0.54)'
    }
}));

export default function ButtonAppBar(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const { haveButton } = props;

    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    const courseContext = useContext(CourseContext)
    const { clearCourses } = courseContext;
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    const [openDrawer, setOpenDrawer] = useState(false);

    const { logOut } = authContext;

    const handleLogOut = () => {
        logOut();
        clearCourses();
    }
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleListKeyDown = event => {
        if (event.key === 'Tab') {
            event.preventDefault();
            // setOpen(false);
        }
    }
    useEffect(() => {
        authContext.loadUser();
        // getCourses();
        // eslint-disable-next-line
    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.AppBar}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        className={classes.title} >
                        {APP_NAME}
                    </Typography>
                    {haveButton ? (
                        matches ? (<Button component={Link} variant="outlined" className={classes.custom_button} to={props.buttonPath} >{props.buttonTxt}</Button>
                        ) : null
                    ) : null}

                    <IconButton aria-label="show 17 new notifications" color="inherit">
                        <Badge badgeContent={1} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                    {matches ? (

                        <Avatar alt="Remy Sharp"
                            className={classes.user_avatar} />

                    ) : null}
                    {
                        matches ? (
                            <div aria-controls="simple-menu"
                                aria-haspopup="true"
                                onClick={handleClick}
                                className={classes.userName}>
                                {user && user.name}
                            </div>
                        ) : null}
                    {
                        matches ? (<ExpandMoreIcon />) : null
                    }
                    {
                        !matches ? (
                            <>
                                <IconButton
                                    onClick={() => setOpenDrawer(!openDrawer)}
                                    disableRipple
                                    className={classes.drawerIconContainer}
                                >
                                    <MenuIcon className={classes.drawerIcon}
                                    />
                                </IconButton>
                                <SwipeableDrawer
                                    disableBackdropTransition={!iOS}
                                    disableDiscovery={iOS}
                                    open={openDrawer}
                                    onClose={() => setOpenDrawer(false)}
                                    onOpen={() => setOpenDrawer(true)}
                                    className={classes.drawer} >
                                    <List disablePadding>
                                        <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to='#'>
                                            <ListItemIcon>
                                                <PermIdentityIcon />
                                            </ListItemIcon>
                                            <ListItemText disableTypography>
                                                Profile
                                            </ListItemText>
                                        </ListItem>
                                        <ListItem onClick={() => setOpenDrawer(false)} divider button component={Link} to='#'>
                                            <ListItemIcon>
                                                <ExitToAppIcon />
                                            </ListItemIcon>
                                            <ListItemText disableTypography>
                                                Log Out
                                            </ListItemText>
                                        </ListItem>
                                    </List>
                                </SwipeableDrawer>
                            </>
                        ) : null
                    }
                    <Popper open={Boolean(anchorEl)} anchorEl={anchorEl} role={undefined} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper >
                                    <ClickAwayListener onClickAway={handleClose}>
                                        <MenuList classes={{
                                            root: classes.customMenuList
                                        }} id="simple-menu" onKeyDown={handleListKeyDown}  >
                                            <MenuItem onClick={handleClose}>   <PermIdentityIcon fontSize="small" className={classes.iconMarginLeft} /> {'  '} Profile</MenuItem>
                                            <Divider variant="middle" />
                                            <MenuItem onClick={() => {
                                                handleClose();
                                                handleLogOut();
                                            }}>

                                                <ExitToAppIcon fontSize="small" className={classes.iconMarginLeft} /> Log Out
                                            </MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>
                </Toolbar>
            </AppBar>
        </div >
    );
}

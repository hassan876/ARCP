import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authcontext'
import { makeStyles, fade } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { ReactComponent as GridIcon } from '../app assetrs/icons/grid view icon.svg';
import { ReactComponent as FilterIcon } from '../app assetrs/icons/filter icon filled.svg';
import { ReactComponent as ListIcon } from '../app assetrs/icons/list icon.svg';
import Tabf from '../components/Tabf';
import Courses from '../components/Courses';
import AppsIcon from '@material-ui/icons/Apps';
import ReorderSharpIcon from '@material-ui/icons/ReorderSharp';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
    container: {
        width: '90%',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',

        }
    },
    icons: {
        width: '15px',
        height: '15px',
        border: '2px solid #555',
        marginLeft: '8px',
        padding: '8px',
        borderRadius: '5px',
        fill: '#555'

    },
    rounded: {
        border: '1px solid #555',
        background: 'none'
    },
    search: {
        position: 'relative',
        backgroundColor: fade(theme.palette.common.white, 0.15),
        borderBottom: '2px solid #D8D8D8',
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'currentColor'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function Dashboard() {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(0);
    const [searchFilter, setSearchFilter] = useState('');
    const [courseView, setCourseView] = useState('grid_view');
    const currentIndex = (newValue) => {
        setTabIndex(newValue);
    };


    return (
        <div>
            <NavBar haveButton={true}
                buttonTxt="Create Course"
                buttonPath={`/course/`} />
            <Grid container >
                <Box
                    component={Grid}
                    item
                    xl={12}
                    display={{ xs: "none", sm: "block" }}
                >
                    <BreadCrumbs />
                </Box>
                <Grid item sm={false} xs={12}  >
                    <Grid container direction="row"
                        justify="space-between" className={classes.container} >
                        <Grid item >
                            <Tabf onchange={currentIndex} />
                        </Grid>
                        <Grid item >
                            <Grid direction='row' container>

                                <form>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                            <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            value={searchFilter}
                                            onChange={(event) => setSearchFilter(event.target.value)}
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </div>
                                </form>
                                <IconButton aria-label="delete" size="small" onClick={() => setCourseView('grid_view')}>
                                    <AppsIcon fontSize="inherit" />
                                </IconButton>
                                <IconButton aria-label="delete" size="small" onClick={() => setCourseView('list_view')}>
                                    <ReorderSharpIcon fontSize="inherit" />
                                </IconButton>

                            </Grid>
                        </Grid>
                        <Grid item sm={false} xs={12} >
                            <Courses publicationFilter={tabIndex} courseView={courseView} searchFilter={searchFilter} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>


        </div>
    )
}

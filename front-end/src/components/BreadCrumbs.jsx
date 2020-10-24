import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '20px'
    },

}));

const BreadCrumbs = (props) => {
    const classes = useStyles();
    const { history, location: { pathname } } = props;
    const pathnames = pathname.split('/').filter(x => x);
    return (

        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.root}>
            {
                pathnames.length > 0 ? (
                    <Link color="inherit" onClick={() => history.push('/')} >
                        Dashboard
                    </Link>
                ) : (
                        <Typography> Dashboard </Typography>
                    )
            }

            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                name = name.split('-').join(' ');
                return (
                    isLast ? (
                        <Typography color="textPrimary"
                            key={name} style={{ textTransform: 'capitalize' }}>
                            {name}
                        </Typography>
                    )
                        :
                        (
                            <Link color="inherit"
                                key={name}
                                onClick={() => history.push(routeTo)}
                                style={{ textTransform: 'capitalize' }} >
                                {name}
                            </Link>
                        )

                );
            })}
        </Breadcrumbs >
    );
}
export default withRouter(BreadCrumbs);
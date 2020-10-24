import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import getPublicationStatus from '../utils/getPublicationStatus';
import formatDate from '../utils/formatDate';
import defaultImage from '../app assetrs/Images/list placeholder.jpg'

const useStyles = makeStyles((theme) => ({
    title: {
        backgroundColor: 'white',
        width: '70vw', /* You can change the size however you like. */
        height: '130px',
        margin: '10px',
        overflow: 'hidden',
        borderRadius: '4px',
        boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.4)',
        position: 'relative'
    },
    titleImage: {
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'none',
        width: '15em',
        height: 'inherit',
        float: 'left'
    },
    titleInfo: {
        height: 'inherit',
        padding: '1em',
        marginLeft: '15em',
    },
    publicationStatusBadge: {
        display: 'inline-block',
        minWidth: '100px',
        // padding: '10px',
        textAlign: 'center',
        textTransform: 'capitalize',
        borderRadius: '4px',
        position: 'absolute',
        right: '0px',
        top: '0px',
    },
    publicationMetaBox: {
        display: 'flex',
        flexDirection: 'column',
        marginRight: '10px',
        marginBottom: '6px',
        position: 'absolute',
        right: '0px',
        bottom: '0px'
    },
    publishBadge: {
        background: '#2a77aa',
    },
    draftBadge: {
        background: '#ad3959',
    },
    archiveBadge: {
        backgroundColor: '#018377'
        // rgb(227, 116, 0)
    },

}));


export default function ListView(props) {
    const classes = useStyles();
    const { id, title, description, subTitle, date, publicationStatus, pageRoute, onDelete } = props;
    return (
        <div>
            <div className={classes.title}>
                <img className={classes.titleImage} style={{
                    backgroundImage: `url(${defaultImage})`
                }} />
                <div className={classes.publicationStatusBadge}

                >
                    {/* {getPublicationStatus(publicationStatus)} */}
                    <Typography
                        color={'inherit'}
                        variant={'subtitle2'}
                        className={
                            publicationStatus == '1'
                                ? (classes.publishBadge)
                                :
                                (publicationStatus == '2'
                                    ? classes.draftBadge
                                    : classes.archiveBadge)}
                    >
                        {getPublicationStatus(publicationStatus)}
                    </Typography>
                </div>
                <div className={classes.publicationMetaBox}>
                    <Typography variant={'caption'}>
                        {getPublicationStatus(publicationStatus)} {' '} {"at"}
                    </Typography>
                    <Typography variant={'caption'}>
                        <Link href="#" underline={'none'}>
                            {formatDate(date)}
                        </Link>
                    </Typography>
                    {/* <span>published on</span>
                    <span>12 june, 2000</span> */}
                </div>
                <div className={classes.titleInfo}>
                    <Typography
                        color={'inherit'}
                        variant={'h6'}
                    >
                        {title}
                    </Typography>
                    <Typography
                        color={'inherit'}
                        variant={'subtitle1'}
                    >
                        {subTitle}
                    </Typography>

                    {/* <h1>Title</h1>
                    <p>You can write anything you want here.</p> */}
                </div>
            </div>
        </div>
    )
}

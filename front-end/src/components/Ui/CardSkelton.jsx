import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography'
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
const useStyles = makeStyles((theme) => ({
    root: {
        color: '#fff'
    },
    card: {
        width: '300px'
    },
    cardImage: {
        height: '130px'
    },
    publicationBadge: {
        padding: '7px',
        display: 'inline-block',
        width: '200px',
        borderRadius: '2px',
        margin: '20px',
        textTransform: 'capitalize',

    },
    cardImage: {
        height: '130px'
    },
}));



export default function CardSkelton() {
    const classes = useStyles();
    return (
        <Card className={classes.card} elevation={6} >
            <CardActionArea >
                <CardMedia className={classes.cardImage}>
                    <Skeleton variant="rect" animation="wave" width={300} height={130} style={{
                        marginBottom: '20px'
                    }} />
                    <div  >
                        {/* <Typography
                            color={'inherit'}
                            variant={'subtitle2'}
                            style={{
                                padding: '7px',
                                display: 'inline-block',
                                borderRadius: '2px',
                                margin: '20px',
                                textTransform: 'capitalize'
                            }}
                        >
                            publiction status
                        </Typography> */}
                    </div>

                </CardMedia>
                <CardContent >
                    <Typography
                        variant={'h6'}
                    >
                        <Skeleton />
                    </Typography>
                    <Typography
                        variant={'subtitle1'}
                        gutterBottom
                    >
                        <Skeleton />
                    </Typography>

                </CardContent>
            </CardActionArea>
            <CardActions >
                {/* <Typography variant={'caption'}>
                        Created at:
                        <Link href="#" underline={'none'}>
                            March 8, 2016
          </Link>
                    </Typography> */}

                <div>
                    <Typography variant={'caption'}>
                        {/* {getPublicationStatus(publicationStatus)} {' '} {"at"} */}
                        <Skeleton width={70} />
                    </Typography>
                    <Typography variant={'caption'}>

                        <Skeleton width={70} />

                    </Typography>
                </div>

                <div className={classes.cta}>
                    <IconButton
                    >
                        <Skeleton variant="circle" width={40} height={40} />
                    </IconButton >
                    <IconButton
                    >
                        <Skeleton variant="circle" width={40} height={40} />
                    </IconButton>
                </div>
            </CardActions>
        </Card >
    )
}



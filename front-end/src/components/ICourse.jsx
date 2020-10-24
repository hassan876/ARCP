import React, { useContext, useState } from 'react'
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CardActionArea from '@material-ui/core/CardActionArea';
import { Link as RouterLink } from 'react-router-dom'
import collapseLargeString from '../utils/collapseLargeString';
import CourseContext from '../context/course/courseContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import getPublicationStatus from '../utils/getPublicationStatus';
import defaultImage from '../app assetrs/Images/g placeholder.jpg'
import CustomDialog from '../components/layouts/LoadingDialog';
import { LoadingSpinner } from './LoadinSpinner';
import SuccessSpinner from './Ui/successSpinner/successSpinner';
import formatDate from '../utils/formatDate';
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
    cardAction: {
        display: 'flex',
        alignItems: 'center',
    },
    publisheMetaData: {
        display: 'flex',
        flexDirection: 'column'
    }, cta: {
        textAlign: 'right',
    }
}));

export default function ICourse(props) {
    const { id, title, description, subTitle, date, publicationStatus, pageRoute, onDelete } = props;
    const courseContext = useContext(CourseContext);
    const { setCurrent, deleteCourse } = courseContext;
    const [deleteConformationModalOpen, setdeleteConformationModalOpen] = useState(false);
    const [loadingSpinnerModalOpen, setLoadingSpinnerModalOpen] = useState(false);
    const [actionSuccess, setActionSuccess] = useState(false);
    const handleEditCourse = () => {
        const Course = {
            id,
            title,
            subTitle,
            description,
            publicationStatus
        }
        setCurrent(Course)
    }
    const [isDeleteAble, setisDeleteAble] = useState(false);
    const [deleteThisCourse, setDeletethisCourse] = useState(null);
    const handleCourseDelte = (id) => {
        setdeleteConformationModalOpen(true);
        // deleteCourse(id);
        // console.log('deleted')
        setDeletethisCourse(id);
    };

    const handleClose = () => {
        setdeleteConformationModalOpen(false);
    };

    const verifyCourseDelete = (e) => {
        const { value } = e.target;
        if (value === title) {
            // deleteCourse(id);
            // remove disable button attribute
            setisDeleteAble(true);
        }
        else {
            setisDeleteAble(false)
        }
    }
    const courseConformed = () => {
        setTimeout(() => {
            deleteCourse(deleteThisCourse)
                .then((course) => {
                    setLoadingSpinnerModalOpen(false);

                    // setTimeout(() => {
                    //     setActionSuccess(false);
                    // }, 2000);
                })
                .catch((err) => {
                    console.log(err)
                });
        }, 2000)

        setLoadingSpinnerModalOpen(true)

    }

    const classes = useStyles();
    return (
        <div>
            <Card className={classes.card} elevation={6} >
                <CardActionArea component={RouterLink} to={pageRoute}>
                    <CardMedia
                        className={classes.cardImage}
                        image={
                            // 'https://images.unsplash.com/photo-1517147177326-b37599372b73?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2229&q=80'
                            defaultImage
                        }
                    >
                        <div  >
                            <Typography
                                color={'inherit'}
                                variant={'subtitle2'}
                                style={{
                                    padding: '7px',
                                    display: 'inline-block',
                                    borderRadius: '2px',
                                    margin: '20px',
                                    textTransform: 'capitalize'
                                }}
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

                    </CardMedia>
                    <CardContent >
                        <Typography
                            variant={'h6'}
                        >
                            {
                                collapseLargeString(title, 20)
                            }

                        </Typography>
                        <Typography
                            variant={'subtitle1'}
                            gutterBottom
                        >
                            {
                                collapseLargeString(
                                    subTitle, 25)
                            }
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
                    <div className={classes.cardAction}>
                        <div className={classes.publisheMetaData}>
                            <Typography variant={'caption'}>
                                {getPublicationStatus(publicationStatus)} {' '} {"at"}
                            </Typography>
                            <Typography variant={'caption'}>
                                <Link href="#" underline={'none'}>
                                    {formatDate(date)}
                                </Link>
                            </Typography>
                        </div>
                        <div className={classes.cta}>
                            <IconButton
                                component={RouterLink}
                                onClick={handleEditCourse}
                                to={`/course/${id}`}
                                aria-label="Edit Coures">
                                <EditIcon />
                            </IconButton >
                            <IconButton onClick={() => { handleCourseDelte(id); }}
                                aria-label="Delete"
                            >
                                <DeleteIcon />
                            </IconButton>
                            <Dialog open={deleteConformationModalOpen}
                                onClose={handleClose}
                                aria-labelledby="form-dialog-title">
                                <DialogTitle id="form-dialog-title">
                                    <ReportProblemOutlinedIcon
                                        style={{
                                            color: 'red',
                                            fontSize: 40,
                                            verticalAlign: 'bottom',
                                            paddingRight: '15px'
                                        }} />
                                        Delete Course
                                </DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Once the course is deleted, all couse content releated to this course will also be deleted.
                                        To delete course enter the course title <b>{title}</b> below.
                                </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Course Title"
                                        type="text"
                                        // error
                                        {...(!isDeleteAble && { error: true })}
                                        fullWidth
                                        onChange={verifyCourseDelete}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={courseConformed}
                                        variant="contained"
                                        color="secondary"
                                        disabled={!isDeleteAble}
                                    >

                                        Delete
                                    </Button>
                                    {/* {console.log(isDeleteAble)} */}
                                </DialogActions>
                            </Dialog>
                            <CustomDialog open={loadingSpinnerModalOpen}
                                aria-labelledby="Deleting Course Please Wait..."
                                disableBackdropClick={true} >
                                <LoadingSpinner style={{ width: '40px', marginRight: '20px' }} />
                                {''} Deleting Course...
                            </CustomDialog>
                            <CustomDialog open={actionSuccess}
                                aria-labelledby="Course deleted successfully."
                                disableBackdropClick={true} >
                                <SuccessSpinner style={{
                                    paddingRight: '20px'
                                }} />{' '} {'Course Deleted Successfully.'}
                            </CustomDialog>


                        </div>
                    </div>
                </CardActions>
            </Card>
        </div >
    )
}
function getPublicationBadge(publicationstatus) {
    switch (publicationstatus) {
        case 1:
            return 'classes.publishBadge';
        case 2:
            return 'classes.archiveBadge';
        default:
            return 'classes.draftBadge';
    }
}
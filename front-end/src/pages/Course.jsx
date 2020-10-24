import React, { useContext, useEffect, useState, } from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ImageUpload from '../components/DrapandDropFileUpload';
import Joi from 'joi-browser';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import AuthContext from '../context/auth/authcontext'
import CourseContext from '../context/course/courseContext';
import CustomDialog from '../components/layouts/LoadingDialog';
import { LoadingSpinner } from '../components/LoadinSpinner';
import SuccessSpinner from '../components/Ui/successSpinner/successSpinner';
import PublicationDialog from '../components/layouts/PublicationDialog';

const useStyles = makeStyles((theme) => ({
    formContainer: {
        width: '75%',
        margin: '0 auto',
        marginTop: '30px',
        background: 'yellow',
        marginBottom: '60px'
    },
    heading_primary: {
        padding: '25px'
    },
    form: {
        width: '90%', // Fix IE 11 issue.
        margin: '0 auto',
        marginTop: theme.spacing(1),


    },
    submit: {
        // margin: theme.spacing(5, 0, 5),
        margin: '0 auto',
        marginTop: '50px',
        marginBottom: '50px',
        [theme.breakpoints.down('sm')]: {
            marginTop: '10px',
            marginBottom: '25px'
        }
    },
    textareaWordConunterContainer: {
        textAlign: 'right',
        paddingRight: '8px',
        color: '#333'
    }
}));


export default function Course(props) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const courseContext = useContext(CourseContext);
    const { user } = authContext;
    const {
        addCourse,
        current,
        clearCurrent, error,
        clearCourseError,
        updateCourse } = courseContext;
    // const [image, setImage] = useState(null);
    const [actionSucessResponse, setActionSucessResponse] = useState(null);
    const { id } = props.match.params;
    useEffect(() => {
        authContext.loadUser();

        if (error === 'Server Error') {
            alert('Course failed to Create');
            clearCourseError();
        }
        // eslint-disable-next-line
        if (current !== null) {
            setCourse(current)
            setIsEdit(true)
        }
        else {
            setCourse({
                id: null,
                title: '',
                subTitle: '',
                description: '',
                publicationStatus: 1
            })
        }
        // return () => {
        //     // clean up
        //     clearCurrent();
        // };
    }, [courseContext, current]);
    useEffect(() => {
        return () => {
            // clean up
            clearCurrent();
        };
    }, [])
    const [course, setCourse] = useState({
        id: null,
        title: '',
        subTitle: '',
        description: '',
        publicationStatus: 1,
    });
    const { title, subTitle, description } = course;
    const [validationErrors, setvalidationErrors] = useState({
        id: null,
        title: '',
        subTitle: '',
        description: '',
        publicationStatus: 1
    });
    const [openCoursePublicationModal, setOpenCoursePublicationModal] = useState(false);
    const [openloadingModal, setOpenLoadingModal] = useState(false);
    const [openActionModal, setOpenActionModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const handleClose = () => {
        setOpenCoursePublicationModal(false);
    };
    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setCourse({
            ...course,
            [name]: value
        });
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (id === undefined) {
            const errors = formValidation();
            if (errors) {
                setvalidationErrors({
                    ...errors
                }
                );
                return;
            }
            else {
                const courseFormData = new FormData();
                courseFormData.append('title', course.title);
                courseFormData.append('subTitle', course.subTitle);
                courseFormData.append('description', course.description);
                // fd.append('ImagePlaceholder', image);

                setTimeout(() => {
                    addCourse(courseFormData).then(course => {
                        setOpenLoadingModal(false);
                        setActionSucessResponse(course.data._id)
                        setOpenCoursePublicationModal(true)
                    }).catch(err => {
                        console.log(err)
                    });
                }, 2000)
                setOpenLoadingModal(true);
                setCourse({
                    id: null,
                    title: '',
                    subTitle: '',
                    description: '',
                    publicationStatus: 1
                })
            }

        }
        else {
            setIsEdit(true);
            const errors = formValidation();
            if (errors) {
                setvalidationErrors({
                    ...errors
                }
                );
            }
            else {
                setTimeout(() => {
                    updateCourse(course)
                        .then((course) => {
                            // setOpenLoadingModal(false);
                            setOpenActionModal(true);
                            setTimeout(() => {
                                setOpenActionModal(false);
                                props.history.push('/')
                            }, 2000)
                        })
                        .catch(err => {
                            console.log(err)
                        });

                }, 2000)
                setOpenLoadingModal(true);
                clearCurrent()
                // props.history.push('/')
            }
        }
        // const errors = formValidation();
        // if (errors) {
        //     setvalidationErrors({
        //         ...errors
        //     }
        //     );
        // }
        // else {
        //     if (current !== null) {
        //         console.log('edit the cour')
        //     }
        //     else {
        //         console.log('onsubmit click')
        //     }

        //     if (props.match.params.id === undefined) {
        //         if (error === "Server Error") {
        //             alert('add alert that says course registeration falied...');
        //         }
        //         else {

        //  addCourse(course);
        //             const fd = new FormData();
        //             fd.append('title', course.title);
        //             fd.append('subTitle', course.subTitle);
        //             fd.append('description', course.description);
        //             fd.append('ImagePlaceholder', image);
        //             for (var data of fd.entries()) {
        //                 console.log(data[0] + ', ' + data[1]);
        //             }
        //             addCourse(fd)
        //             setTimeout(() => {
        //                 console.log('adding course');
        //                 console.log(courseadded)
        //             }, 3000)

        //             if (courseadded) {
        //                 setOpenModal(true);
        //             }
        //             else {
        //                 alert('add alert that says course registeration falied')
        //                 console.log('add alert that says course registeration falied')
        //             }


        //         }

        //         setCourse({
        //             title: '',
        //             subTitle: '',
        //             description: '',
        //         });
        //         setvalidationErrors({})
        //     }
        //     else {
        //         alert('course is updating')
        //         // setvalidationErrors({});
        //         // clearCurrent()
        //     }

        // }

    }
    var schema = {
        id: Joi.string().allow(null),
        title: Joi.string().required().label('Title'),
        subTitle: Joi.string().required().label('Sub Title'),
        description: Joi.string().max(300).required().label('Description'),
        publicationStatus: Joi.number()
    }
    const formValidation = () => {
        const result = Joi.validate(course, schema, { abortEarly: false });
        let errors = {};
        if (!result.error) return null;
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    console.log('cause rerender')
    return (

        <div>
            <NavBar
                haveButton={true
                } buttonTxt="Course Topic"
                buttonPath="/topic" />
            <Box
                component={Grid}
                item
                xl={12}
                display={{ xs: "none", sm: "block" }}
            >
                <BreadCrumbs />
            </Box>
            <Grid container
                direction="row"
                className={classes.formContainer}
                component={Paper} elevation={6}
            >
                <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    component={Paper}  >
                    <Typography
                        variant="h5"
                        className={classes.heading_primary}>
                        {!props.match.params.id ? ' Create New Course' : 'Edit Course'}
                    </Typography>
                </Grid>

                <Grid item
                    xs={12}
                    sm={12}
                    md={12}
                    component={Paper}
                    elevation={2} >
                    <form className={classes.form} noValidate onSubmit={handleOnSubmit} encType="multipart/form-data">
                        <Grid container
                            direction="row"
                            align="center" >
                            <Grid item xs={12} sm={12} md={6}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="Title"
                                            value={title || ""}
                                            name="title"
                                            label="Title"
                                            variant="filled"
                                            required
                                            autoFocus
                                            onChange={handleInputOnChange}
                                            {...(validationErrors.title
                                                && { error: true, helperText: validationErrors.title })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField margin="normal"
                                            fullWidth
                                            id="filled-basic"
                                            value={subTitle || ""}
                                            label="Sub Title"
                                            variant="filled"
                                            required
                                            name="subTitle"
                                            onChange={handleInputOnChange}
                                            {...(validationErrors.subTitle
                                                && { error: true, helperText: validationErrors.subTitle })}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <TextField
                                            margin="normal"
                                            fullWidth
                                            id="filled-basic"
                                            label="Description"
                                            variant="filled"
                                            name="description"
                                            value={description || ""}
                                            multiline
                                            rows={matches ? '5' : '10'}
                                            rowsMax={10}

                                            onChange={handleInputOnChange}
                                            {...(validationErrors.description
                                                && { error: true, helperText: validationErrors.description })}
                                        />
                                        <div className={classes.textareaWordConunterContainer}>
                                            <span>{description.length || 0}</span>/300
                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <ImageUpload state={course} onImageUpload={setCourse} />
                            </Grid>
                            <Button
                                {
                                ...(matches && { fullWidth: true })
                                }
                                variant="contained"
                                size="large"
                                type="submit"
                                className={classes.submit}
                                color="primary">
                                {isEdit ? 'Update Course' : 'Publish Course'}
                            </Button>
                        </Grid>
                    </form>

                    {/* Course Publication Dialog */}
                    <PublicationDialog
                        open={openCoursePublicationModal}
                        onClose={handleClose}
                        arialabelledby="form-dialog-title"
                        publishedCourse={actionSucessResponse}
                    />
                    {/* loading Dialog */}
                    <CustomDialog open={openloadingModal}
                        aria-labelledby={isEdit ? 'Editing Course Please Wait' : "Publishing Course Please Wait"}
                        disableBackdropClick={true} >
                        <LoadingSpinner style={{ width: '40px', marginRight: '20px' }} />
                        {''} {isEdit ? 'Updating Course...' : 'Publishing Course...'}
                    </CustomDialog>
                    <CustomDialog open={openActionModal}
                        aria-labelledby="Course Successfully Updated"
                        disableBackdropClick={true} >
                        <SuccessSpinner style={{
                            paddingRight: '20px'
                        }} />{' '} {'Course Edited Successfully.'}
                    </CustomDialog>
                </Grid>
            </Grid>
        </div >
    )
}

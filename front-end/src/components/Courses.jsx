import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/auth/authcontext'
import CourseContext from '../context/course/courseContext';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ICourse from './ICourse';
import CardSkelton from './Ui/CardSkelton';
import ListView from './ListView';
const useStyles = makeStyles((theme) => ({
    coursesContainer: {
        marginTop: '30px'
    },
    noCouresError: {
        marginBottom: '20px'
    }

}));

export default function Courses(props) {
    const { courseView, publicationFilter, searchFilter } = props;
    const authContext = useContext(AuthContext);
    const courseContext = useContext(CourseContext);
    const { courses, getCourses, loading } = courseContext;
    const [loadingCourse, setLoadingCourse] = useState(false);
    const classes = useStyles();
    useEffect(() => {
        authContext.loadUser();
        setTimeout(() => {
            const courseLoadingStatus = getCourses();
            courseLoadingStatus.then((data) => {
                setTimeout((data) => {
                    setLoadingCourse(false);
                }, 1000);
                setLoadingCourse(true)
            })
                .catch((err) => {
                    alert('add tost message that says error in get courses ')
                })
        }, 1000);
        return () => {
            return null
        }
        // eslint-disable-next-line
    }, []);
    const getCourseslist = (publicationFilterValue) => {
        switch (publicationFilterValue) {
            case 1:
                return courses.filter((course) => course.publication_Status === 1);
            case 2:
                return courses.filter((course) => course.publication_Status === 2);
            case 3:
                return courses.filter((course) => course.publication_Status === 3);
            default:
                return courses;
        }
    }

    let courseList = getCourseslist(publicationFilter);
    courseList = courseList.filter((course) => course.title.includes(searchFilter.toLowerCase()));
    return (
        <div>
            {

                courses !== null && courses.length === 0 && !loading ? (<div style={{
                    textAlign: 'center'
                }} className={classes.coursesContainer} >
                    <Typography variant="h6" className={classes.noCouresError}>
                        There is no Course.
                                    </Typography>

                    <Button variant="contained" color="primary">
                        Create Course
                    </Button>
                </div>) : (
                        <Grid container spacing={6} direction="row" justify='center' className={classes.coursesContainer} >
                            {
                                courseList.length === 0 && !loading ? (
                                    <h5>There is no Course</h5>
                                ) : (
                                        courseView === 'grid_view' ? (
                                            courseList.map((course) => {
                                                return loadingCourse ? (
                                                    <Grid item key={course._id}>
                                                        <CardSkelton />
                                                    </Grid>
                                                ) : (
                                                        <Grid item key={course._id}>
                                                            <ICourse
                                                                id={course._id}
                                                                title={course.title}
                                                                subTitle={course.subTitle}
                                                                description={course.description}
                                                                date={course.date}
                                                                publicationStatus={course.publication_Status}
                                                                pageRoute={`/${course.title.split(' ').join('-')}`}
                                                            />
                                                        </Grid>);
                                            }
                                            )
                                        ) : (
                                                courseList.map(course => {
                                                    return loadingCourse ? (
                                                        <Grid item key={course._id}>
                                                            <CardSkelton />
                                                        </Grid>
                                                    ) : (
                                                            <Grid item key={course._id} style={{ padding: '0px' }}>
                                                                <ListView
                                                                    id={course._id}
                                                                    title={course.title}
                                                                    subTitle={course.subTitle}
                                                                    description={course.description}
                                                                    date={course.date}
                                                                    publicationStatus={course.publication_Status}
                                                                    pageRoute={`/${course.title.split(' ').join('-')}`}
                                                                />
                                                            </Grid>
                                                        );
                                                })

                                            )
                                    )
                                // courseView === 'grid_view' ? (
                                //     courses.map((course) => {
                                //         return loadingCourse ? (
                                //             <Grid item key={course._id}>
                                //                 <CardSkelton />
                                //             </Grid>
                                //         ) : (
                                //                 <Grid item key={course._id}>
                                //                     <ICourse
                                //                         id={course._id}
                                //                         title={course.title}
                                //                         subTitle={course.subTitle}
                                //                         description={course.description}
                                //                         date={course.date}
                                //                         publicationStatus={course.publication_Status}
                                //                         pageRoute={`/${course.title.split(' ').join('-')}`}
                                //                     />
                                //                 </Grid>);
                                //     }
                                //     )
                                // ) : (
                                //         "list view here"
                                //     )
                            }
                        </Grid>
                    )
            }
        </div>
    )
}

import React from 'react'
import NavBar from '../components/NavBar'
import BreadCrumbs from '../components/BreadCrumbs'
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";
import Typography from '@material-ui/core/Typography';
// import CourseCard from '../components/CourseCard';
import Button from '@material-ui/core/Button';
export default function CourseDetail(props) {
    return (
        <div>
            <NavBar haveButton={true} buttonTxt="Course Topic" buttonPath="/topic" />
            <Box
                component={Grid}
                item
                xl={12}
                display={{ xs: "none", sm: "block" }}
            >
                <BreadCrumbs />
            </Box>
            <Typography variant="h4" align="center">
                Under construction
            </Typography>
            {/* {
                topics.length === 0 ? (<div style={{
                    textAlign: 'center'
                }}  >
                    <Typography variant="h6" >
                        There is no Course.
                                    </Typography>
                    <Button variant="contained" color="primary">
                        Create Course
                                        </Button>
                </div>) : (
                        <Grid container spacing={6} direction="row" justify='center'  >

                            {
                                topics.map((topic) => {
                                    return (<Grid item key={topic.id} >
                                        <CourseCard id={topic.id} title={topic.title} subTitle={topic.subTitle} publicationStatus={topic.publicationStatus} pageRoute={`/${topic.title}`} />
                                    </Grid>);
                                })
                            }
                        </Grid>
                    ) */}
            {/* } */}
        </div>
    )
}

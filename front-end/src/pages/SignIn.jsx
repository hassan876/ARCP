import { APP_NAME } from '../app preferences/app manifest';
import { useState, useContext, useEffect } from 'react';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import AuthContext from '../context/auth/authcontext';
import { Spinner } from '../components/Spinner'
import SliderImage from '../app assetrs/Images/image1.jpg'
import CarouselSlider from '../components/slider';
import Hidden from '@material-ui/core/Hidden';
import Joi from 'joi-browser'
function Copyright() {
    return (
        <Typography variant="body2"
            color="textSecondary"
            align="center">
            {'Copyright © '}
            <Link color="inherit"
                href="/">
                {APP_NAME}
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: '80vh',
        width: '70vw',
        margin: '8vh auto'
    },
    image: {
        backgroundImage: `url(${SliderImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {

    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const { logIn, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error !== null && error !== undefined && error.includes("Invalid Credentials")) {
            alert('invalid credintials');
            clearErrors();
            setValues({
                email: '',
                password: ''
            });
            setLoagging(false);
            setErrors({
                email: 'Invalid Credentials',
                password: 'Invalid Credentials'
            });


        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const [loagging, setLoagging] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleInputOnChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        let { email, password } = values;

        const eerrors = formValidation();

        if (eerrors) {
            setErrors({ ...eerrors });
        }
        else {
            setErrors({});
            setLoagging(true);
            logIn({
                email,
                password
            });
            clearErrors();
        }

    }
    var schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().label('Password')
    }
    const formValidation = () => {

        const result = Joi.validate(values, schema, { abortEarly: false });
        if (!result.error) return null;

        let errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
    }
    return (
        <Grid container component="main" className={classes.root}>

            <CssBaseline />
            <Grid item xs={false} sm={6} md={6} className={classes.image} >
                <CarouselSlider />
            </Grid>
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
          </Typography>

                    <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={values.email}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            {...(errors.email && { error: true, helperText: errors.email })}
                            autoComplete="email"
                            autoFocus
                            onChange={handleInputOnChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={values.password}
                            required
                            {...(errors.password && { error: true, helperText: errors.password })}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleInputOnChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            {...(loagging && { disabled: true })}
                        >
                            {loagging ? (<><Spinner /> </>) : 'Sign In'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                </Link>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/register_user" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid >
    );
}
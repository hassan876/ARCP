import { APP_NAME } from '../app preferences/app manifest';
import React, { useState, useContext, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Joi from 'joi-browser';
import { Spinner } from '../components/Spinner'
import SliderImage from '../app assetrs/Images/image1.jpg'


import AuthContext from '../context/auth/authcontext';




function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
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


export default function SignUp(props) {
    const classes = useStyles();

    const authContext = useContext(AuthContext);
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === "User Already Exist") {
            alert('show alert here? uesr already exist');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        conformPassword: '',
    });
    const [registering, setRegistering] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        conformPassword: ''
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
        const { name, email, password } = values;

        const eerrors = formValidation();

        if (eerrors) {
            setErrors({ ...eerrors });
        }
        else {
            setErrors({});
            setRegistering(true);
            // alert('registeration method is disabled')
            register({
                name,
                email,
                password
            });
        }
    }


    const formValidation = () => {
        const result = Joi.validate(values, schema, { abortEarly: false });
        if (!result.error) return null;

        let errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }
        if (values.conformPassword.length < 4) {
            errors.conformPassword = "Conform password must be atleast 4 characters long"
        }
        return errors;
    }
    var schema = {
        name: Joi.string().required().min(3).max(30).label('Name'),
        email: Joi.string().required().email().max(30).label('Email'),
        password: Joi.string().required().min(4).max(30).label('Password'),
        conformPassword: Joi.string().min(4).max(30).required().label('Conform Password').valid(Joi.ref('password')).options({ language: { any: { allowOnly: 'must match with password' } } })
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={6} className={classes.image} />
            <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
          </Typography>
                    <form className={classes.form} noValidate onSubmit={handleOnSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={values.name}
                            id="name"
                            label="name"
                            name="name"
                            autoComplete="name"
                            {...(errors.name && { error: true, helperText: errors.name })}
                            autoFocus
                            onChange={handleInputOnChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            value={values.email}
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            {...(errors.email && { error: true, helperText: errors.email })}
                            onChange={handleInputOnChange}

                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={values.password}
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            {...(errors.password && { error: true, helperText: errors.password })}
                            onChange={handleInputOnChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={values.conformPassword}
                            name="conformPassword"
                            label="conform Password"
                            type="password"
                            id="conformPassword"
                            {...(errors.conformPassword && { error: true, helperText: errors.conformPassword })}
                            autoComplete="current-password"
                            onChange={handleInputOnChange}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            {...(registering && { disabled: true })}
                        >
                            {registering ? (<Spinner />) : 'Create Account'}
                        </Button>
                        <Grid container>
                            <Grid item xs>
                            </Grid>
                            <Grid item>
                                <Link component={RouterLink} to="/login" variant="body2">
                                    {"I've an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
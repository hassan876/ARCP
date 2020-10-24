import React, { useRef, useState } from 'react'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import QRCode from "react-qr-code";
import InputAdornment from '@material-ui/core/InputAdornment';
import { ReactComponent as FireCracker } from '../../app assetrs/icons/congratulation.svg';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import IconButton from '@material-ui/core/IconButton';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';
import DownloadButton from '../../app assetrs/Images/download button.png'

const useStyles = makeStyles((theme) => ({
    orderedList: {
        counterReset: 'item',
        '& li': {
            display: 'block',
            marginBottom: '.5em',
            marginLeft: '-25px',
            '&::before': {
                display: 'inline-block',
                content: 'counter(item) "."',
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                fontSize: '20px',
                counterIncrement: 'item',
                width: '1.5em',
            }
        }

    }, courseUriFieldHelperText: {
        paddingTop: '10px',
        textAlign: 'left'
    },


}));


function PublicationDialog(props) {
    const { open, onClose, arialabelledby, publishedCourse } = props;
    const classes = useStyles();
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
        setTimeout(() => {
            setCopySuccess('');
        }, 4000)
    };
    return (
        <div>
            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby={arialabelledby}
                maxWidth={'md'}
            >
                <DialogTitle id="form-dialog-title" disableTypography={true}>
                    <Typography variant='h5'>
                        Congratulations {' '} <FireCracker style={{
                            width: '30px',
                            height: '30px',
                        }} />
                    </Typography>
                    <Typography variant="subtitle1">
                        Share your content with your learners.
                            </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container direction="row" className={classes.modalContainer}>
                        <Grid item xs={12} sm={12} md={6} >
                            <DialogContentText>
                                Once the course is deleted, all couse content releated to this course will also be deleted.
                                        </DialogContentText>
                            <ol className={classes.orderedList}>
                                <li>
                                    Download the application from Playstore.
                                                <a href="#" target="_blank" rel="noopner noreffer">
                                        <img src={DownloadButton} style={
                                            {
                                                width: '140px',
                                                height: '140px',
                                                marginTop: '-28px',
                                                marginBottom: '-28px',
                                                display: 'block',
                                                marginLeft: 'auto',
                                                marginRight: 'auto'
                                            }
                                        } />
                                    </a>

                                </li>
                                <li>
                                    Register free account in the application.
                                            </li>
                                <li>
                                    Scan the QR on the mobile to register course.
                                            </li>
                                <li>
                                    Have fun, Learn with Agumented Reality.
                                            </li>
                            </ol>

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} align="center">
                            <QRCode value={publishedCourse || ''} />
                            <div>

                                <form >
                                    <FormControl style={{
                                        marginTop: '20px'
                                    }}>
                                        {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel> */}
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type='text'
                                            value={publishedCourse || ''}
                                            inputRef={textAreaRef}
                                            notched={false}
                                            readOnly
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        // onClick={handleClickShowPassword}
                                                        // onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                        onClick={copyToClipboard}
                                                    >
                                                        <FileCopyOutlinedIcon />
                                                        {/* {values.showPassword ? <Visibility /> : <VisibilityOff />} */}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            labelWidth={80}
                                        />
                                        <div className={classes.courseUriFieldHelperText} >
                                            {copySuccess || ''}
                                        </div>
                                    </FormControl>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </DialogContent>
                <div style={{
                    height: '30px'
                }}>

                </div>
            </Dialog>{/* Course Publication Dialog */}
        </div>
    )
}

export default PublicationDialog

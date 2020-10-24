import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { ReactComponent as FileUploadIcon } from '../app assetrs/icons/upload.svg';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => (
    {
        container: {
            flex: 1,
        },
        dropzoon: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '200px',
            borderColor: 'grey',
            borderStyle: 'dashed',
            backgroundColor: '#f5fcff',
            borderWidth: '2px',
            borderRadius: '2px',
            color: '#272727',
            outline: 'none',
            transition: 'border .24s ease-in-out',
            margin: '50px',
            padding: '20px',
            [theme.breakpoints.down('sm')]: {
                margin: '10px'
            }
        },
        icon: {
            width: '200px',
            height: '200px',
            marginBottom: '20px'
        }
    }));

export default function ImageUpload(props) {
    console.log(props);
    const classes = useStyles();

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    const onDrop = useCallback(acceptedFiles => {
        // props.onImageUpload(acceptedFiles);
        props.onImageUpload({
            ...props.state,
            image: acceptedFiles
        })

    }, [])

    const { getRootProps,
        getInputProps,
        open,
        acceptedFiles,
        isDragActive,
        isDragAccept,
        isDragReject,
    } = useDropzone({

        onDrop,
        noClick: true,
        noKeyboard: true,
        multiple: false,
        maxSize: 1000000,
        accept: 'image/jpeg, image/png'
    });



    const files = acceptedFiles.map(file => (
        <p key={file.path}>
            {file.path} - {file.size} bytes
            <IconButton onClick={() => handleDeleteSelectedFile(file.path)}>
                <DeleteIcon />
            </IconButton>
        </p>
    ));
    const handleDeleteSelectedFile = (filepath) => {
        // const filess = files.filter(file => file.key !== filepath)
        // console.log(filess)
        // files = null;

    }

    return (
        <>
            <div className={classes.container}>
                <div {...getRootProps({
                    className: classes.dropzoon,

                })}>
                    <FileUploadIcon className={classes.icon} />
                    <input {...getInputProps()} />
                    <Button variant="contained" color="primary" onClick={open}>
                        Upload Image
                    </Button>
                    {isDragReject && (<p>Image should be JPEG / PNG </p>)}
                    {
                        matches ? (<div>

                            {isDragActive ? (<p>Drop Image here</p>) : (<>
                                <p>Drag 'n' drop Image here</p>
                                <em>(Only *.jpeg and *.png images will be accepted)</em>
                            </>)}


                        </div>) : ''
                    }
                </div>
            </div>
            <aside>
                {
                    files.length !== 0 ? (<div>
                        <h4>Image</h4>
                        <div>{files}</div>
                    </div>) : null
                }
            </aside>
        </>
    );
}
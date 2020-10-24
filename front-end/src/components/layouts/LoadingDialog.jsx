import React from 'react'
import Zoom from '@material-ui/core/Zoom';
import { LoadingSpinner } from '../LoadinSpinner';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';


function LoadingDialog(props) {
    const { open, arialabelledby, disableBackdropClick } = props;
    return (
        <div>
            <Dialog
                open={open}
                aria-labelledby={arialabelledby}
                disableBackdropClick={disableBackdropClick}
            >
                <Zoom in={true}>
                    <DialogTitle id="updating-state-loader" disableTypography={true}>
                        <Typography variant='subtitle2' style={
                            {
                                display: 'flex',
                                alignItems: 'center'
                            }
                        }>
                            {props.children}
                            {/* <LoadingSpinner style={{ width: '40px', marginRight: '20px' }} /> {''} Publishing Course... */}
                        </Typography>
                    </DialogTitle>
                </Zoom>
            </Dialog>
        </div>
    )
}

export default LoadingDialog

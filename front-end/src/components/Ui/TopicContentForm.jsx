import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function TopicContentForm() {
    return (
        <div>
            <form action="">
                <TextField
                    autoFocus
                    variant="outlined"
                    margin="dense"
                    id="name"
                    label="Course Title"
                    type="text"
                    // error
                    fullWidth

                />
            </form>
        </div>
    )
}

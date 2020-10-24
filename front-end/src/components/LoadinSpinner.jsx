import React, { Fragment } from 'react'
import spinner from '../app assetrs/loadinspinner.gif'
export const LoadingSpinner = (props) => <Fragment>
    <img src={spinner} alt="loading spinner" style={
        props.style
        // width: `${props.width}`,
        // margin: 'auto',
        // display: 'block'
    } />
</Fragment>



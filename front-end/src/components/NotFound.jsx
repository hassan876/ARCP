import React from 'react'
import { ReactComponent as Logo } from '../app assetrs/Images/nfp.svg';
export default function NotFound() {
    return (
        <div style={{
            textAlign: 'center',
            color: '#272727'
        }}>
            <h3>Page Not Found</h3>
            <Logo style={{
                width: '50vw',
                height: '50vh'
            }} />
        </div>
    )
}

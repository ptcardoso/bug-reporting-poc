import React from 'react'
import './styles.css'

export function CenteredContent({children, ...props}) {
    return (
        <div className={'centered'} {...props}>
            {children}
        </div>
    )
}

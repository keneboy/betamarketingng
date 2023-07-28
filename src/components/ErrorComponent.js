import React from 'react'

export default function ErrorComponent({ errors, name }) {
    return (
        <div>
            {errors[name] && (
                <span
                    className="error-red"
                >
                    {errors[name].message}
                </span>
            )}
        </div>
        
    )
}

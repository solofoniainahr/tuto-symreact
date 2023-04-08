import React from 'react'

const Field = ({label, 
                type="text", 
                placeholder="", 
                name, 
                onChange, 
                value, 
                error=""}) => {
    return ( 
        <div className='form-group'>
            <label htmlFor={name}>{label}</label>
            <input
                value={value}
                onChange={onChange} 
                className={'form-control' +(error && ' is-invalid')} 
                id={name} type={type} name={name}
                placeholder={placeholder || label} />
            {  error && <p className='invalid-feedback'>
                {error}
            </p>
            }
        </div>
     );
}
 
export default Field;
import React, { useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const PasswordInput = ({passValue, handleChange}) => {
    const [passVisible, setPassVisible] = useState(false)

  return (
    <div className='flex items-center'>
        <input 
              name='password'
              value={passValue}
              type={passVisible ? 'text' : 'password'} 
              onChange={handleChange}
              className='w-[238px] lowercase py-1 border border-zinc-400
              px-2 text-base rounded-tl-sm rounded-bl-sm outline-none ' />
        <div className='flex items-center justify-center border border-zinc-400 py-1 lg:py-0 lg:h-full px-1 cursor-pointer rounded-tr-sm rounded-br-sm'
        onClick={() => setPassVisible(!passVisible)}>
            <RemoveRedEyeIcon />
        </div>        
    </div>
  )
}

export default PasswordInput
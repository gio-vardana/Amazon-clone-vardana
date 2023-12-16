import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { handleInputChange, handleLogin } from '../Redux/userSlice';
import { updateUserData } from '../services/user/updateUserData';
import PasswordInput from '../Components/PasswordInput';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
const Account = () => {

  const {email, unique_name, nameid} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [passInput, setPassInput] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    if(name === 'password') {
      setPassInput(value)
    } else {
      dispatch(handleInputChange({ name, value })) 
    } 
  }

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    if(passInput.length < 6 || passInput === "" || unique_name === "" || email === "") {   
      alert('All input fields are required, Password minimum 6 symbols')        
    } else {
      const {data} = await updateUserData({userName: unique_name, id: nameid, email, newPassword: passInput});
        if(data.jwt) {
          localStorage.removeItem("token");
          localStorage.setItem("token", data.jwt);
          const decoded = jwtDecode(data.jwt);
          dispatch(handleLogin(decoded));
          setSuccessMessage('Updated Successfully ')
        }           
    }
   
  }

  return (
    <form className='w-full'>
      <div className=' w-[100%] lg:w-[550px] bg-gray-100 py-10 px-[75px]  flex flex-col gap-4 justify-center items-center mx-auto shadow-textShadow'>
        <PermIdentityIcon sx={{ width: 70, height: 70 }} />
        <p className='text-[25px] font-semibold mb-[30px] text-black'>Manage your Account</p>
        <div className='flex w-full gap-4'>
          <div className='w-[30%] flex justify-start'>
            <p className='text-md font-semibold'>Name:</p>
          </div>
          <div className='w-[70%] flex justify-start'>
            <input 
            name='unique_name'
            value={unique_name}
            type='name' 
            onChange={handleChangeInput}
            className='w-[270px] lowercase py-1 border border-zinc-400
            px-2 text-base rounded-sm outline-none' />
          </div>          
        </div>
        <div className='flex gap-4 w-full'>
          <div className='w-[30%] flex justify-start'>
            <p className='text-md font-semibold'>Email:</p>
          </div>
          <div className='w-[70%] flex justify-start'>
            <input 
            name='email'
            value={email}
            type='email' 
            onChange={handleChangeInput}
            className='w-[270px] lowercase py-1 border border-zinc-400
            px-2 text-base rounded-sm outline-none' />
          </div>          
          
        </div>
        <div className='flex gap-4 w-full'>
          <div className='w-[30%] flex justify-start'>
            <p className='text-md font-semibold'>New Password:</p>
          </div>
          <div className='w-[70%] flex justify-start'>
            <PasswordInput passValue={passInput} handleChange={handleChangeInput} />
          </div>          
          
        </div>

        <p className='text-green-600 text-md font-semibold'>{successMessage}</p>

        <button 
        className="center-element w-[150px] py-1.5 rounded-md mt-3 font-titleFont font-sm text-base bg-[#fca103] "
        onClick={(e) => handleSaveChanges(e)}>
          Save Changes
        </button>
      </div>
    </form>
  )
}

export default Account
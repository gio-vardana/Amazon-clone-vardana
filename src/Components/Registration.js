import React, { useState } from 'react'
import amazonLogoDark from './../assets/amazonLogoDark.svg'
import { ArrowRightOutlined } from '@mui/icons-material'
import { Link, useNavigate } from 'react-router-dom'
import { baseAPI } from '../services/baseApi'

export const Registration = () => {

    const navigate = useNavigate();

    const [formState, setFormState] = useState({
        userName: '',
        email: '',
        password: '',
        cPassword: '',
        errUserName: '',
        errEmail: '',
        errPassword: '',
        errCPassword: '',
    });

    const [successMessage, setSuccessMessage] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
            [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: '',
        }));
    };

    const emailValidation = (email) =>
        String(email).toLocaleLowerCase().match(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);

    const handleRegistration = async (e) => {
        e.preventDefault();
        const { userName, email, password, cPassword } = formState;

        const validateFields = () => {
            const errors = {};

            if (!userName) errors.errUserName = 'Enter your name';
            if (!email) errors.errEmail = 'Enter your email';
            else if (!emailValidation(email)) errors.errEmail = 'Enter a valid email';
            if (!password) errors.errPassword = 'Enter your password';
            else if (password.length < 6) errors.errPassword = 'Password must be at least 6 characters';
            if (!cPassword) errors.errCPassword = 'Confirm your password';
            else if (cPassword !== password) errors.errCPassword = "Password doesn't match";

            return errors;
        };

        const errors = validateFields();

        if (Object.keys(errors).length === 0) {
            try {
                await baseAPI.post('/api/user/registerUser', {
                    userName,
                    password,
                    email,
                });
                setSuccessMessage(true);
                setFormState({
                    userName: '',
                    email: '',
                    password: '',
                    cPassword: '',
                    errUserName: '',
                    errEmail: '',
                    errPassword: '',
                    errCPassword: '',
                });
                navigate('/Login'); 
            } catch (err) {
                console.log(err);
            }
        } else {
            setFormState((prevState) => ({ ...prevState, ...errors }));
        }
    };

  return (
    <div className='w-full'>
        <div className='w-full bg-gray-100 pt-[15px]'>
            <form className='w-[350px] mx-auto flex flex-col items-center'>
                <Link to='/'>
                    <img src={amazonLogoDark} alt='amazonLogoImg' className='w-[123px] mt-0' />
                </Link>
                <div className='w-full border border-zinc-200 p-[10px] rounded-[8px]'>
                    <h2 className=' text-[30px]  mb-[25px]'>
                        Create Account
                    </h2>
                    <div className='flex flex-col gap-[12px]'>
                        <div className='flex flex-col gap-[8px]'>
                            <p className='text-sm font-medium'>Your name</p>
                            <input 
                            name='userName'
                            value={formState.userName}
                            onChange={handleInputChange}                           
                            type='text' className='w-full py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none '  />
                            {
                                formState.errUserName && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errUserName}
                                    </p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>Enter your email</p>
                            <input 
                            name='email'
                            value={formState.email}
                            onChange={handleInputChange}                            
                            type='email' className='w-full lowercase py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none '  />
                            {
                                formState.errEmail && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errEmail}
                                    </p>
                                )
                            }
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>Password</p>
                            <input 
                            name='password'
                            value={formState.password}
                            onChange={handleInputChange}                            
                            type='password' className='w-full py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none '  />
                            {
                                formState.errPassword && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errPassword}
                                    </p>
                                )
                            }
                        </div>
                        {
                            !formState.errPassword && (
                                <p className='text-xs text-gray-700 -mt-2'>Passwords must be at least 6 characters.</p>
                            )
                        }                        
                        <div className='flex flex-col gap-2'>
                            <p className='text-sm font-medium'>Re-enter password</p>
                            <input 
                            name='cPassword'
                            value={formState.cPassword}
                            onChange={handleInputChange}                            
                            type='password' className='w-full py-1 border border-zinc-400
                            px-2 text-base rounded-sm outline-none'  />
                            {
                                formState.errCPassword && (
                                    <p className='text-red-600 text-xs font-semibold
                                    tracking-wide flex items-center gap-2 -mt-1.5'>
                                      <span className='italic font-titleFont font-extrabold text-base'>!</span>  {formState.errCPassword}
                                    </p>
                                )
                            }
                        </div>
                        <button className='w-full py-1.5 text-sm rounded-sm bg-[#fca103] '
                        onClick={handleRegistration}> 
                            Create Account
                        </button>

                        {
                            successMessage && (
                                <div className='flex gap-4'>
                                    <p className='text-green-600 text-md font-semibold'>Account created</p>
                                    <Link to='/Login'><span className='text-sm text-[#1E88E5]'>Sign in</span></Link>
                                </div>
                            )
                        }

                        <p className='text-xs text-black leading-4 mt-4'>By creating, you agree to Amazon's
                        <span className='text-[#1E88E5]'> Conditions of Use </span>
                        and<span className='text-[#1E88E5]'> Privacy Notice.</span></p>

                        <span className='w-[70%] mx-auto h-[1px] bg-zinc-300 inline-flex mt-2'></span>

                        <div>
                            <p className='text-xs'>Already have an account? 
                                <Link to="/Login"><span className='text-[#1E88E5] hover:text-red-500 hover:underline
                                    underline-offset-1 cursor-pointer transition-100'> Sign in <ArrowRightOutlined className='-ml-2 ' /></span>
                                </Link>
                            </p>
                            <p className='text-xs'>Buying for work? <span className='text-[#1E88E5] hover:text-red-500 hover:underline
                            underline-offset-1 cursor-pointer transition-100'>Create a free business account <ArrowRightOutlined className='-ml-2 ' /></span></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
        
    </div>
  )
}

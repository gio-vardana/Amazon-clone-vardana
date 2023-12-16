import React, { useState } from 'react';
import amazonLogoDark from './../assets/amazonLogoDark.svg';
import { ArrowRightOutlined } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userSignIn } from '../services/user/userSignIn';
import { handleLogin } from '../Redux/userSlice';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    errEmail: '',
    errPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      [`err${name.charAt(0).toUpperCase() + name.slice(1)}`]: '',
    }));
  };

  const logIn = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    if (!email) return setFormData((prevData) => ({ ...prevData, errEmail: 'Enter your email' }));
    if (!password) return setFormData((prevData) => ({ ...prevData, errPassword: 'Enter your password' }));

    try {
      const user = await userSignIn({ email, password });
      if (user.data.jwt) {
        localStorage.setItem('token', user.data.jwt);
        const decoded = jwtDecode(user.data.jwt);
        dispatch(handleLogin(decoded));
        setFormData({ email: '', password: '', errEmail: '', errPassword: '' });
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Wrong password, try again');
      }
    }
  };


  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 pb-10">
        <form className="w-[350px] mx-auto flex flex-col items-center">
          <Link to="/">
            <img src={amazonLogoDark} alt="amazonLogoImg" className="w-32" />
          </Link>
          <div className="w-full border border-zinc-300 p-6">
            <h2 className="font-titleFont text-3xl font-medium mb-4">Sign in</h2>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Email</p>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none "
                />
                {formData.errEmail && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">!</span> {formData.errEmail}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Password</p>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type="password"
                  className="w-full lowercase py-1 border border-zinc-400 px-2 text-base rounded-sm outline-none"
                />
                {formData.errPassword && (
                  <p className="text-red-600 text-xs font-semibold tracking-wide flex items-center gap-2 -mt-1.5">
                    <span className="italic font-titleFont font-extrabold text-base">!</span> {formData.errPassword}
                  </p>
                )}
              </div>
              <button
                className="w-full py-1.5 text-sm rounded-sm bg-[#fca103] "
                onClick={(e) => logIn(e)}
              >
                Continue
              </button>
              {formData.errPassword && (
                <p className="text-red-600 text-xs font-semibold mt-[8px]">
                </p>
              )}
            </div>
            <p className="text-xs text-black leading-4 mt-[17px]">
              By Continuing, you agree to Amazon's
              <span className="text-[#1E88E5]"> Conditions of Use </span>
              and<span className="text-[#1E88E5]"> Privacy Notice.</span>
            </p>
            <p className="text-xs flex items-center -ml-2 text-gray-600 mt-4 cursor-pointer group">
              <ArrowRightOutlined />
              <span className="text-blue-60 group-hover:text-red-500 group-hover:underline">Need help?</span>
            </p>
          </div>
          <div className="w-full text-xs text-gray-600 mt-[16px] flex items-center">
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
            <span className="w-1/3 text-center">New on Amazon?</span>
            <span className="w-1/3 h-[1px] bg-zinc-400 inline-flex"></span>
          </div>
          <Link to="/registration" className="w-full">
            <button className="w-full py-1 text-sm mt-4 font-normal rounded-lg bg-gradient-to-t from-slate-200 to-slate-100 hover:bg-gradient-to-b border border-zinc-400 active:border-yellow-800 active:shadow-amazonInput">
              Create your Amazon account
            </button>
          </Link>
        </form>
      </div>
      
     
    </div>
  );
};

export default Login;

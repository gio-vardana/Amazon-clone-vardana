import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  const year = new Date().getFullYear();
  

  return (
    <footer className="bg-gray-900 text-white lg:py-[5px] lg:pt-[15px] pt-[8px] ">
      <div className="container mx-auto flex flex-wrap justify-around">
        <div className="mb-[4px] lg:ml-[30px]">
          <h1 className="text-[9px] lg:text-[16px] font-semibold mb-[10px]">Get to Know Us</h1>
          <div className="text-[7px] lg:text-[12px] flex flex-col lg:gap-[7px] gap-[5px]">
            <Link>Careers</Link>
            <Link>Blog</Link>
            <Link>About Amazon</Link>
            <Link>Investor Relations</Link>
            <Link>Amazon Device</Link>
          </div>
        </div>
        <div className=" mb-[4px]">
          <h1 className="lg:text-[16px] text-[9px] font-semibold mb-[10px]">Connect with Us</h1>
          <div className="text-[7px] lg:text-[12px] flex flex-col lg:gap-[7px] gap-[5px] ">
            <a href="https://www.facebook.com/giorgi.vardanashvili.3" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://www.linkedin.com/in/giorgivardanashvili/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://www.instagram.com/giorgivardanashvili/" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
        <div className="mb-[4px]">
          <h1 className="lg:text-[16px] text-[9px] font-semibold mb-[10px]">Make Money with Us</h1>
          <div className="lg:text-[12px] text-[7px] flex flex-col lg:gap-[7px] gap-[5px]">
            <Link>Sell products on Amazon</Link>
            <Link>Sell on Amazon Business</Link>
            <Link>Become an Affiliate</Link>
            <Link>Advertise Your Products</Link>
          </div>
        </div>
        <div className="mb-[4px]">
          <h1 className="lg:text-[16px] text-[9px] font-semibold mb-[10px]">Let Us Help You</h1>
          <div className="lg:text-[12px] text-[7px] flex flex-col gap-[5px] lg:gap-[7px]">
            <Link to={"/account"}>Your Account</Link>
            <Link>Your Orders</Link>
            <Link>Shipping Rates & Policies</Link>
            <Link>Returns & Replacements</Link>
            
          </div>
        </div>
      </div>
      
      <div className="container mx-auto text-center mt-[20px] pb-[3px] lg:mt-[45px]"> 
        <p className="text-[6px] lg:text-[12px]">
          Conditions of Use & Sale &nbsp; &nbsp;&nbsp; Privacy Notice &nbsp; &nbsp;&nbsp; Interest-Based Ads &nbsp; &nbsp;&nbsp; © 1996-{year}, Amazon.com, Inc. or its affiliates
          <p className='float-right text-[#fff] pr-[10px] text-[8px]'>Made By Vardana</p>
        </p>
      </div>
      
    </footer>
  );
}

export default Footer;

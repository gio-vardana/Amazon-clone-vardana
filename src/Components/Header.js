import React, { useEffect, useRef, useState } from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useProductFilter } from './ProductFilterContext';
import { handleLogout } from '../Redux/userSlice';
import { Avatar } from '@mui/material';



  const Header = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const totalItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const { filterState, setFilterState, handleFilter } = useProductFilter();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const ref = useRef();
  const [showAccount, setShowAccount] = useState(false);


  useEffect(() => {
  document.body.addEventListener('click', (e) => {
      if(e.target.contains(ref.current)) {
          setShowAccount(false);
      }
  })
 }, [ref, showAccount])
  
 const signOut = () => {
    dispatch(handleLogout())
 };

  return (
    <>
      <div className="md:h-[65px] flex items-center bg-black h-[35px] lg:pl-[10px] lg:h-[65px] ">
        <Link to={'/'}>
          <img className="w-[45px] object-contain m-0 md:w-[80px] lg:w-[90px] lg:ml-[8px] ml-[5px] lg:mt-[19px] mt-[12px] mr-[4px] md:mr-5 pb-[5px]" src="/amazon_PNG11.png" alt="Amazon" />
        </Link>
        <Link>
          <div className="header-hover-effect pb-[4px]  flex justify-center mr-[3px]">
            <FmdGoodOutlinedIcon sx={{ fontSize: { xs: 13, lg: 27 } }} className="text-[#fff] font-bold lg:text-[25px] mt-[5px] lg:mr-[5px] mr-[2px]" />
            <p className="text-gray-200 font-light flex flex-col lg:text-[12px] text-[5px] ">
              Deliver to
              <span className="font-bold text-white lg:text-sm text-[6px] lg:-m-[2px]  ">
                Georgia
              </span>
            </p>
          </div>
        </Link>
        <div className="flex flex-1 items-center border-none">
          <select
            className="text-[#000] lg:p-[10px] bg-[#f5f1eb] lg:w-[15%] lg:text-[14px] border-none lg:ml-[20px] md:text-[13px] md:p-[4.5px] p-[4.8px] text-[6px] w-[25%]"
            value={filterState.selectedCategory}
            onChange={(e) => setFilterState({ ...filterState, selectedCategory: e.target.value })}
          >
            <option value="">All</option>
            {filterState.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            className="lg:h-[16px] lg:p-[20px] lg:border-hidden lg:w-[90%] lg:text-[14px] md:p-[14px] md:w-[80%]  md:text-[11px] p-[3px] text-[8px]"
            type="text"
            placeholder="Search Amazon"
            value={filterState.brandName}
            onChange={(e) => setFilterState({ ...filterState, brandName: e.target.value })}
          />
          <div className="text-[#000] bg-[#fca103] lg:p-[3.8px] cursor-pointer text-center lg:text-[20px] p-[2.5px] text-[8px]">
            <Link to={`/filtered/by?categoryId=${filterState.selectedCategory}`}>
              <SearchIcon onClick={handleFilter} disabled={filterState.loading} sx={{ fontSize: { xs: 13, md: 28, lg: 28 } }} />
            </Link>
          </div>
        </div>
        <div className="flex justify-evenly lg:pl-[16px] relative">
          
          <div ref={ref} className="flex flex-col lg:ml-[10px] lg:mr-[10px] text-center ml-[3px] mr-[3px] text-white relative"
          onMouseEnter={() => setShowAccount(true)} onMouseLeave={() => setShowAccount(false)}>
            
            <span className="lg:text-[12px] cursor-pointer md:text-[10px] text-[4px]"><Link to={"/Login"}>Hello,</Link> <span className='text-bold'>{user.isLoggedIn ? user.unique_name : 'sign in'}</span></span>
            <span className="lg:text-[14px] font-semibold md:text-[12px] text-[6px]">Account & Lists</span>
            {
                    showAccount && (
                        <div  className='top-layer-div w-full h-full text-black fixed top-[60px] right-0 z-50 '>
                            <div className='relative  w-full h-full'>
                                <div className='relative -top-[13px] xs:left-[30%] sm:left-[25%] sml:left-[20%] md:left-[20%] 
                                mdl:left-[30%] lg:left-[28%] lgl:left-[70%] xl:left-[82%] 
                                top-layer-div w-[170px] bg-white border-[1px] text-black border-amazon_blue p-1 z-3 duration-200'
                                onMouseLeave={() => setShowAccount(false)} >
                                    <div className='flex flex-col justify-center items-center'>
                                                                            
                                    <Avatar sx={{ width: 50, height: 50 }}><p className='text-[#000] text-[25px]'>{user.unique_name ? user.unique_name.charAt(0) : ''} </p></Avatar>

                                       <p className='font-semibold mb-[10px]'></p>
                                        {
                                            user.isLoggedIn ?  
                                            
                                            <button onClick={signOut}
                                            className='px-[10px] rounded-md mt-[12px] mb-[10px] font-sm text-base bg-[#fca105]'>
                                                Sign out
                                            </button> 
                                            : 
                                             <Link to='/Login'
                                             className='px-2.5 rounded-md mt-3 bg-[#fca105] font-titleFont font-sm text-base'>
                                                 Log In
                                             </Link>
                                        }
                                       {!user.isLoggedIn && (
                                            <p className='text-xs mt-3'>New Costumer?
                                                <Link to='/Registration'>
                                                    <span className='text-blue-500 '> Start Here</span>
                                                </Link>
                                            </p>
                                       )}  

                                       {user.isLoggedIn && (                                            
                                            <Link to='/account'>
                                                <span className='text-blue-600 text-md pb-[10px]'>Account</span>
                                            </Link>                                            
                                       )}                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }           
          </div>
          <div className="flex flex-col text-center lg:ml-[10px] lg:mr-[10px] ml-[3px] mr-[3px] text-white">
            <span className="lg:text-[12px] cursor-pointer md:text-[10px] text-[4px]">Return</span>
            <span className="lg:text-[14px] font-semibold md:text-[12px] text-[6px]">& Orders</span>
          </div>
          
          <div className="lg:flex items-center text-white lg:text-[16px] text-[10px]">
            <Link to="/Cart">
              <LocalGroceryStoreIcon sx={{ fontSize: { xs: 13, sm: 18, md: 25, lg: 30 } }} />
            </Link>
            <span className="flex justify-center items-center lg:ml-[10px] text-black lg:text-[14px] font-semibold relative lg:top-[-13px] lg:left-[-20px] bg-[#eb7d34] rounded-[11px] lg:px-[7px] md:text-[14px] text-[6px] ml-[3px] pl-[4px] pr-[4px] top-[-16px] left-[2px]">
              {totalItemCount}
            </span>
          </div>
        </div>
      </div>
      <>
     
    </>
      
    </>
  );
}
 export default Header;
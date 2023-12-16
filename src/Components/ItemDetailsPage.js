import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../Redux/cartSlice';
import DoneIcon from '@mui/icons-material/Done';
import { Rating } from '@mui/material';
import { baseAPI } from '../services/baseApi';




const ItemDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [showAlert, setShowAlert] = useState(false); 
  const dispatch = useDispatch();

  useEffect(() => {
    baseAPI
      .get(`api/product/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItemToCart(product));
      setShowAlert(true); 
      setTimeout(() => {
        setShowAlert(false); 
      }, 3000); 
    }
  };

  if (!product) {
    return <div className='text-[20px] text-[red] text-center'></div>;
  }

  return (
    <div className="flex flex-col items-center justify-center  bg-gray-100">
      <div className="flex lg:m-[10px] lg:p-[20px] border border-gray-300 rounded-md shadow-md bg-white">
        <img
          className="lg:h-[315px] h-[108px] lg:w-auto ml-[1px] mr-[5px] lg:mr-20 lg:ml-10 hover:scale-105"
          src={product.images[1]}
          alt={product.name}
        />
        <div className="flex flex-col">
          <p className="md:text-[18px] text-[8px] lg:font-semibold lg:mb-[10px]">{product.model}</p>
          <p className='lg:text-[14px] text-[9px] font-titleFont'>by: <span className='text-blue-500'><Link className='lg:text-[14px] text-[9px]'>{product.brand}</Link></span></p>
          <div className='lg:pt-[15px] lg:pb-[15px]  flex gap-2'>
                    <Rating sx={{ fontSize: { xs: 13, md: 28, lg: 28 } }} name=" half-rating-read" defaultValue={4} readOnly />
                    <p className='lg:text-[14px] text-[8px]'>198 Ratings</p>
                     </div>
          <p className="md:text-[18px] text-[10px] font-bold lg:mb-[4px] mb-[3px]">${product.price}</p>
          <h1>
            <p className="font-bold lg:text-[16px] text-[10px]">About This Item :</p>
            <p className="md:text-[13px] text-[4.5px] lg:my-[5px] md:pr-[45px]">
              {product.description.length > 850
                ? product.description.slice(0, 850) + '....'
                : product.description}
            </p>
          </h1>
        </div>
        <div>
          <div className="flex flex-col items-center bg-white border border-gray-300 rounded-md  lg:p-[3px] lg:ml-[10px] border-box lg:h-full lg:w-[300px] w-[85px] ml-[3px]  ">
            <div className="lg:mt-[10px] font-bold lg:text-[14px] text-[12px]">${product.price}</div>
             
            <button
              className="bg-yellow-400 text-gray-700 border-none lg:px-[42px] lg:py-[6px] p-[3px] mb-[10px] mt-[10px] text-[6px] cursor-pointer lg:mt-[20px] lg:text-sm rounded-full lg:mb-5 transition-all duration-300 md:px-22 md:text-base sm:px-12 sm:text-xs sm:mt-10 hover:bg-yellow-500"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
            <Link to={"https://payment.b2pay.io/pay.php?invoice=150e7d30-6c17-11ee-91bf-bae3ba88c9f5"}>
              <button
              className="bg-[#f0c14b] text-gray-700 border-none text-[8px] lg:px-[42px] p-[3px] lg:py-[6px] cursor-pointer lg:mt-[20px] lg:text-sm rounded-full lg:mb-5 transition-all duration-300 md:px-22 md:text-base  hover:bg-yellow-500"
             >
              Buy Now
              </button>
            
            </Link>
            
            <div className="flex flex-col lg:pt-[60px] lg:pb-[25px] lg:gap-[5px] mt-[15px]">
              <p className="lg:text-[12px] text-[5px]">
                Payment <Link className="text-blue-500 lg:text-[12px] text-[5px] lg:ml-[25px]">Secure transaction</Link>
              </p>
              <p className="lg:text-[12px] text-[5px]">
                Ships From <Link className="lg:ml-[14px]">Amazon.com</Link>
              </p>
              <p className="lg:text-[12px] text-[5px]">
                Sold By <Link className="lg:ml-[33px]">Amazon.com</Link>
              </p>
              <p className="lg:text-[12px] text-[5px]">
                Returns <Link className="text-blue-500 lg:text-[12px] text-[6px] lg:ml-[32px]">Eligible to returns</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {showAlert && (
        <div className=" bg-[green] fixed lg:top-[12%] top-[10%] lg:text-[14px] text-[4px] lg:left-[88%] left-[50%] transform -translate-x-1/2 -translate-y-1/2  text-[#fff] px-[8px] py-[2px] rounded-[8px] transition-opacity duration-300 opacity-100">
          <DoneIcon className=' font-bold ' /> Added to Cart
        </div>
      )}
    </div>
  );
};

export default ItemDetailsPage;

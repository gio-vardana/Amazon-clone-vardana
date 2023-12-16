import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { baseAPI } from '../../services/baseApi';



export const LatestProducts = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    baseAPI.get('api/product/latestproducts')
      .then(response => {
        setItems(response.data);
      })
  }, []);
  
  
  const settings = {
    dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
           
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
           
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            
          }
        }
      ]
    };
         
    
  return (
    <div className="bg-white border-[1px] m-[24px]  mt-[0px]">
    <h1 className="text-[16px] lg:text-[24px] font-semibold mb-[20px] ml-[10px]">Latest Products</h1>

    <Slider {...settings}>
      {items.map(item => (
        <div key={item.id} className="flex justify-between ml-[15px]">
          <Link to={`/product/${item.id}`}>
            <img
              src={item.images[3]}
              alt={item.description}
              className="lg:h-[255px] h-[230px] bg-cover mb-[10px] ml-[18px]  cursor-pointer"
            />
          </Link>
          <p className="text-black font-semibold text-[12px] lg:text-[16px] ">
            {item.model.length > 30 ? item.model.slice(0, 30) + '...' : item.model}
          </p>
          <p className="text-gray-500 lg:text-[13px] text-[10px] mt-[2px] mr-[20px]">
            {item.description.length > 160 ? item.description.slice(0, 160) + '...' : item.description}
          </p>
          <div>
          <div className='pt-[15px]   flex gap-2'>
                    <Rating name="half-rating-read" defaultValue={4} readOnly />
                    <p className='text-md'>198 Ratings</p>
                     </div>
            </div>
          <p className="font-bold pt-[10px] pb-[10px] lg:text-[14px] text-[12px]">${item.price}</p>
        </div>
      ))}
    </Slider>
  </div>
  );
}

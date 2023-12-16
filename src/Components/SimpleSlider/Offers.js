import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { baseAPI } from '../../services/baseApi';

export const Offers = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    baseAPI.get('api/product/offers')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4.99,
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
    <div className="bg-white border-[1px] m-[24px] mt-[0px]">
      <h1 className="lg:text-[24px] text-[16px] font-semibold mb-[20px] lg:ml-[10px]">Offers</h1>

      <Slider {...settings}>
        {items.map(item => (
          <div key={item.id} className="flex justify-between ml-[15px]">
            <Link to={`/product/Filter-by?ItemsId=${item.id}`}>
              <img
                src={item.image}
                alt={item.description}
                className="lg:h-[255px] h-[230px] bg-cover mb-[10px] ml-[18px]  cursor-pointer"
              />
            </Link>
            <p className="text-black font-bold lg:text-[13px] text-[11px] mb-[5px]">
              {item.name.length > 30 ? item.name.slice(0, 40) + '...' : item.name}
            </p>
            <p className="lg:text-[12px] text-[10px] line-clamp-3 overflow-hidden text-gray-500 lg:ml-[5px]">
            {item.description.length > 130 ? item.description.slice(0, 130) + '...' : item.description}
            </p>
            <p className="text-bold lg:text-[15px] text-[12px] pt-[2px]">${item.newPrice}</p>
            <div>
            <div className='pt-[15px] pb-[15px]  flex gap-2'>
                    <Rating name="half-rating-read" defaultValue={3} readOnly />
                    <p className='text-md'>128 Ratings</p>
                     </div>
            </div>
            <p className="text-red-500 font-bold line-through pb-[10px] lg:text-[15px] text-[12px]">${item.oldPrice}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
}



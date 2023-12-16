import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import { useProductFilter } from './ProductFilterContext';

const ProductFilterPage = () => {
  const { filterState, setFilterState, handleFilter } = useProductFilter();
  const { priceFrom, priceTo, filteredProducts, loading, categories } = filterState;
  const [activeCategory, setActiveCategory] = useState();

  

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setFilterState({ ...filterState, selectedCategory: categoryId });
  };

  return (
    <div className="container p-[10px] bg-[#fff]">
      <div className="grid grid-cols-12 gap-[10px]">
        <div className="col-span-2">
          <div className="flex flex-col">
          <ul className="flex flex-col items-start gap-[5px] pointer">
              {categories.map((category) => (
                <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex flex-col  items-start ${activeCategory === category.id ? 'bg-[#fff] text-[#000]' : 'bg-white text-[#000]'} p-[2px] rounded-lg`}
              >
                <p className={`lg:text-[14px] text-[7px] flex flex-col items-start ${activeCategory === category.id ? 'text-[#5273b9]' : 'text-[#000]'}`}>
                  {category.name}
                </p>
              </button>
              
              ))}
            </ul>

            <div className="flex mb-4 text-[13px] rounded-[5px] mt-[15px] mr-[15px]">
              <input
                type="text"
                placeholder="From $"
                className="border p-2 lg:w-[65px] w-[32px]"
                value={priceFrom}
                onChange={(e) => setFilterState({ ...filterState, priceFrom: e.target.value })}
              />
              <div className="lg:text-[13px] text-[6px] font-bold lg:mt-[6px]">-</div>
              <div>
                <input
                  type="text"
                  placeholder="To $"
                  className="border p-2 w-[65px]"
                  value={priceTo}
                  onChange={(e) => setFilterState({ ...filterState, priceTo: e.target.value })}
                />
              </div>

              <button
                className="text-[grey] lg:text-[12px] text-[6px]border  lg:p-[8px] p-[2px] lg:ml-[5px]  rounded-[25px]"
                onClick={handleFilter}
                disabled={loading}
              >
                {loading ? 'Filtering...' : 'Go'}
              </button>
            </div>
            <div className="gap-[8px] cursor-pointer">
              <p className="font-semibold lg:text-[14px] text-[10px]">Customer Reviews</p>
              <div className='pt-[5px] pb-[5px]  flex '>
                <Rating sx={{ fontSize: { xs: 7, md: 28, lg: 28 } }} className='lg:text-[14px] text-[7px]' name=" half-rating-read" defaultValue={5} readOnly />
                <p className="lg:text-[14px] text-[4px] ml-[10px]">& up</p>
              </div>

              <div className="flex text-[14px]">
                <div className='pt-[5px] pb-[5px]  flex '>
                  <Rating sx={{ fontSize: { xs: 7, md: 28, lg: 28 } }} name=" half-rating-read" defaultValue={4} readOnly />
                  <p className="lg:text-[14px] text-[4px] ml-[10px]">& up</p>
                </div>
              </div>

              <div className="flex text-[14px]">
                <div className='pt-[5px] pb-[5px]  flex '>
                  <Rating sx={{ fontSize: { xs: 7, md: 28, lg: 28 } }} name=" half-rating-read" defaultValue={3} readOnly />
                  <p className="lg:text-[14px] text-[4px] lg:ml-[10px]">& up</p>
                </div>
              </div>

              <div className="flex lg:text-[14px] text-[8px]">
                <div className='pt-[5px] pb-[5px]  flex '>
                  <Rating sx={{ fontSize: { xs: 7, md: 28, lg: 28 } }} name=" half-rating-read" defaultValue={2} readOnly />
                  <p className="lg:text-[14px] text-[4px] ml-[10px]">& up</p>
                </div>
              </div>
              <div className="flex lg:text-[14px] text-[8px]">
                <div className='pt-[5px] pb-[5px]  flex '>
                  <Rating sx={{ fontSize: { xs: 7, md: 28, lg: 28 } }} name=" half-rating-read" defaultValue={1} readOnly />
                  <p className="lg:text-[14px] text-[4px] ml-[10px]">& up</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-9">
          <div className="grid lg:grid-cols-4 grid-cols-2 place-items-stretch items-center ml-6 lg:gap-[8px] gap-[6px] m-0">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="border lg:p-4  rounded-lg">
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.images[0]}
                      alt={product.name}
                      className="lg:h-[225px] h-[108px] lg:w-auto w-[102px]  bg-cover lg:mt-2 lg:mb-2 hover:scale-105 items-center"
                    />
                    <p className="md:text-[14px] text-[8px] lg:font-bold lg:mb-[10px]">
                      {product.model.length > 25
                        ? product.model.slice(0, 25) + '....'
                        : product.model}
                    </p>
                    <p className="md:text-[13px] text-[5px] lg:my-[5px] my-[2px] md:pr-[45px]">
                      {product.description.length > 170
                        ? product.description.slice(0, 170) + '....'
                        : product.description}
                    </p>
                    <p className="md:text-[14px] text-[10px] font-bold lg:mb-[4px] mb-[1px]">
                      ${product.price}
                    </p>
                  </Link>

                  <div>
                    <div className='lg:pt-[15px] lg:pb-[15px]  flex gap-2'>
                      <Rating sx={{ fontSize: { xs: 9, md: 28, lg: 28 } }} name="half-rating-read" defaultValue={4} readOnly />
                      <p className='lg:text-[14px] text-[7px]'>198 Ratings</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No products match</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterPage;

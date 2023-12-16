import React from 'react';
import { LatestProducts } from './SimpleSlider/LatestProducts';
import { Offers } from './SimpleSlider/Offers';
import { MostDemandProducts } from './SimpleSlider/MostDemandProducts';






const HomePage = () => {

  return (
    <div className='bg-[#dbe2e2]'>
      
        <LatestProducts />
        <Offers />
        <MostDemandProducts />
        
        
    </div>
      
    
  );
};

export default HomePage;

import React, { useState, useEffect, useContext } from 'react';
import { baseAPI } from '../services/baseApi';

const ProductFilterContext = React.createContext();

export function useProductFilter() {
  return useContext(ProductFilterContext);
}

export const ProductFilterProvider = ({ children }) => {
  const [filterState, setFilterState] = useState({
    selectedCategory: '',
    priceFrom: '',
    priceTo: '',
    brandName: '',
    filteredProducts: [],
    loading: false,
    categories: [],
  });

  const handleFilter = async () => {
    setFilterState((prevState) => ({ ...prevState, loading: true }));
  
    try {
      const filterCriteria = {
        BrandName: filterState.brandName,
        PriceFrom: filterState.priceFrom,
        PriceTo: filterState.priceTo,
      };
  
      const response = await baseAPI.get('api/product/products', {
        params: filterCriteria,
      });
  
      const products = response.data;
  
      let filteredItems = products.filter((product) => {
        const price = parseFloat(product.price);
  
        const priceFromCondition =
          !filterState.priceFrom || price >= parseFloat(filterState.priceFrom);
  
        const priceToCondition =
          !filterState.priceTo || price <= parseFloat(filterState.priceTo);
  
        const brandCondition =
          !filterState.brandName ||
          product.name.toLowerCase().includes(filterState.brandName.toLowerCase());
  
        return priceFromCondition && priceToCondition && brandCondition;
      });
  
      if (filterState.selectedCategory) {
        filteredItems = filteredItems.filter((product) => {
          return product.categoryId.toString() === filterState.selectedCategory;
        });
      }
  
      setFilterState((prevState) => ({
        ...prevState,
        filteredProducts: filteredItems,
        selectedCategory: '',
        priceFrom: '',
        priceTo: '',
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setFilterState((prevState) => ({ ...prevState, loading: false }));
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await baseAPI.get(
          'api/product/categories'
        );
        setFilterState((prevState) => ({ ...prevState, categories: response.data }));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <ProductFilterContext.Provider value={{ filterState, setFilterState, handleFilter }}>
      {children}
    </ProductFilterContext.Provider>
  );
}

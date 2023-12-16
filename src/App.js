import React, { useMemo } from "react";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router";
import HomePage from "./Components/HomePage";
import CartPage from "./Components/CartPage";
import ItemDetailsPage from "./Components/ItemDetailsPage";
import ProductFilterPage from "./Components/ProductFilterPage";
import { ProductFilterProvider } from "./Components/ProductFilterContext";
import { Registration } from "./Components/Registration";
import Login from "./Components/Login";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { handleLogin } from './Redux/userSlice';
import Account from "./Components/Account";




const App = () => {
  const dispatch = useDispatch();

  useMemo(() => {
		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decoded = jwtDecode(token);
				if (decoded.exp * 1000 < Date.now()) {
					return false;
				}

				dispatch(handleLogin(decoded));
				return true;
			} catch (e) {
				return false;
			}
		}
		return false;
	}, [dispatch]);

  
  return (
    <div>
      <ProductFilterProvider>
      <Header />
      <Routes>
      
           <Route path="/">
            <Route index element={<HomePage />} />
            <Route path="product/:id" element={<ItemDetailsPage />}/>
            <Route path="filtered/:id" element={<ProductFilterPage />}/>
            <Route path="Cart" element={<CartPage />}/>
            <Route path="Login" element={<Login />} />
            <Route path="registration" element={<Registration />}/>
            <Route path="account" element={<Account />}/>
           </Route>
            
            
      </Routes>
      <Footer />

      </ProductFilterProvider>
     
    </div>
  );
}

export default App;

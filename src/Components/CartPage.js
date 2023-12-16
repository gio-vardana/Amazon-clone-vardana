import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import { updateCartItemQuantity , removeItemFromCart } from '../Redux/cartSlice';
import { Link } from 'react-router-dom';



const Container = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;

    
  @media (max-width: 480px) {
   margin:5px;
   padding:3px;
  }
`;


const CartItems = styled.div`
  margin: 20px 0;
  background-color:#fff;
  width:1102px;
  
  @media (max-width: 768px) {
    width:450px;
    margin: 10px 0
    
  }

  @media (max-width: 480px) {
    width:225px;
    height:auto;
    margin:0px;
  }
`;

const Product = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  @media (max-width: 768px) {
    
  }

  @media (max-width: 480px) {
    padding: 5px 0;
  }
`;

const ProductImage = styled.img`
  height: 225px;
  object-fit: cover;
  margin-right: 20px;
  margin-left:10px;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    
    
  }

  @media (max-width: 480px) {
    height: 95px;
    width:85px;
    
    
  }
`;

const ProductInfo = styled.div`
display:flex;
flex-direction:column;
align-items:flex-start;
margin-bottom:75px;

`;

const ProductTitle = styled.h2`
  font-size: 14px;
  margin: 0;
  margin-bottom:7px;
  padding-top:20px;
  

  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    font-size: 6px;
  }
`;

const ProductPrice = styled.p`
  font-size: 18px;
  font-weight:700;
  margin: 0;
  margin-bottom:32px;
  margin-top:15px;
  padding-left:8px;
  @media (max-width: 768px) {
    font-size: 12px;
  }

  @media (max-width: 480px) {
    margin-top:2px;
    font-size:9px;
  }
  
`;

const QuantitySelector = styled.select`
  margin-right: 20px;
  padding: 6px;
  font-size: 13px;
  background-color:#f0f2f2;
  border-radius:8px;
  box-shadow: 0 2px 5px 0 rgba(213,217,217,.5);

  @media (max-width: 768px) {
    font-size: 10px;
  }

  @media (max-width: 480px) {
    margin-right: 5px;
    padding: 1px;
    font-size: 6px;
  }
`;

const RemoveButton = styled.button`
  color: #0066c0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 12px;
  @media (max-width: 768px) {
    font-size: 10px;
    
  }

  @media (max-width: 480px) {
    font-size: 6px;
  }
`;

const Subtotal = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  @media (max-width: 768px) {
    
  }

  @media (max-width: 480px) {
    padding-top: 4px;
    font-size:10px;
    font-weight:700;
  }
`;

const SubtotalText = styled.span`
  font-size: 16px;
  margin-right: 20px;
  @media (max-width: 768px) {
    font-size: 13px;
    margin-right: 5px;
    
  }

  @media (max-width: 480px) {
    font-size: 6px;
    
  }
`;

const CheckoutButton = styled.button`
  background-color: #f0c14b;
  color: #111;
  border: none;
  padding: 7px 36px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 14px;
  border-radius: 7px;
  margin-bottom:5px;
  @media (max-width: 768px) {
    padding: 6px 22px;
    font-size: 12px;
  }

  @media (max-width: 480px) {
    padding: 4px 12px;
    font-size: 6px;
    margin-top: 10px;
  }
`;
 const CartBox = styled.div`
  display:flex;
  justify-content:baseline;
  background-color:#f0f2f2;
  gap:20px;
  @media (max-width: 768px) {
    gap:5px;
    
  }

  @media (max-width: 480px) {
    gap:1px;
  }
 `;
 const TotalCheckout = styled.div`
 display:flex;
 flex-direction:column;
 align-items:center;
 background-color:#fff;
 border: 1px solid #ddd;
 margin-top:38px;
 height:135px;
 width:295px;
 @media (max-width: 768px) {
  width:220px;
  margin-top:52px;
  }

  @media (max-width: 480px) {
    width:130px;
    margin-top:6px;
    margin-right:5px;
    height:65px;
    
  }
  
 `;
 
     const CartPage = () => {
      const cartItems = useSelector((state) => state.cart.cartItems);
      const dispatch = useDispatch();
    
      const calculateSubtotal = () => {
        return cartItems.reduce((subtotal, item) => {
          const itemPrice = parseFloat(item.price);
          const itemQuantity = parseInt(item.quantity);
    
          if (!isNaN(itemPrice) && !isNaN(itemQuantity)) {
            return subtotal + itemPrice * itemQuantity;
          }
    
          return subtotal;
        }, 0);
      };
    
      const handleQuantityChange = (itemId, newQuantity) => {
        dispatch(updateCartItemQuantity({ itemId, newQuantity }));
      };
    
      const handleRemoveItem = (itemId) => {
        dispatch(removeItemFromCart(itemId));
      };
    
      const totalItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);
    
      return (
        <CartBox>
      <Container>
        <CartItems>
          <h1 className='md:text-[25px] font-semibold mb-[15px] ml-[10px]'>Shopping Cart</h1>
          <div className="h-[1px] bg-[#d5d9d9] md:mr-[25px]"></div>
          {cartItems.length === 0 ? (
            <div className='h-[460px]'>
                 <p className='flex justify-center items-center text-[#ce3b3b] text-[25px]'>Your cart is empty :(</p>
            </div>
            
          ) : (
            cartItems.map((item, index) => (
              <Product key={index}>
                <ProductImage src={item.images[3]} alt={item.name} />
                <ProductInfo>
                  <ProductTitle>{item.name}</ProductTitle>
                  <p className='lg:text-sm text-[7px] font-titleFont font-bold'>by: <span className='text-blue-600'><Link>{item.brand}</Link></span></p>
                  <ProductPrice>${item.price}</ProductPrice>
                  <div className='flex'>
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value, 10);
                        handleQuantityChange(item.id, newQuantity);
                      }}
                    >
                      {[1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>
                          Qty: {quantity}
                        </option>
                      ))}
                    </QuantitySelector>
                    <RemoveButton onClick={() => handleRemoveItem(item.id)}>
                      Remove
                    </RemoveButton>
                  </div>
                </ProductInfo>
              </Product>
            ))
          )}
        </CartItems>
        {cartItems.length > 0 && (
          <div className="float-right text-[#000]">
            <SubtotalText>Subtotal (<span className='font-bold'>{totalItemCount}</span> items):</SubtotalText>
            <span className='lg:text-[16px] font-bold md:text-[14px] text-[7px] m-0'>${calculateSubtotal().toFixed(2)}</span>
          </div>
        )}
      </Container>

      {cartItems.length > 0 && (
        <TotalCheckout>
          <Subtotal>
            <SubtotalText>Subtotal (<span className='font-bold'>{totalItemCount}</span> items):</SubtotalText>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </Subtotal>
          <Link to={"https://payment.b2pay.io/pay.php?invoice=150e7d30-6c17-11ee-91bf-bae3ba88c9f5"}>
            <CheckoutButton>Proceed to Checkout</CheckoutButton>
          </Link>
        </TotalCheckout>
      )}
    </CartBox>
      );
    };

export default CartPage;

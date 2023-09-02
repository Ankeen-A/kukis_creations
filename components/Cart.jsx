import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
//component that fixes hydration/SSR issue -- "Warning: Prop `style` did not match..."
import NoSsr from './NoSsr';

import toast from 'react-hot-toast';

import { useStateContext } from '../context/StateContext';
import { urlFor } from '../lib/client';
import getStripe from '../lib/getStripe';

const Cart = () => {
  const cartRef = useRef();
  const inputRef = useRef();
  // state context
  const { totalPrice, totalQuantities, cartItems, setShowCart, onRemove, onAdd, handleQuantityChange, localQuantities, setLocalQuantities } = useStateContext();

  // function sends product data from cart to stripe
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id })
  }

  const calculateTotal = (price, quantity) => {
    const total = price * quantity;
    return isNaN(total) ? 0 : total;
  }

  const safeToFixed = (value) => {
    const numberValue = Number(value);
    return isNaN(numberValue) ? "0.00" : numberValue.toFixed(2);
  }

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className='outside-cart-container' onClick={() => setShowCart(false)}></div>
      <div className="cart-container">
        <button type="button" className="cart-heading" onClick={() => setShowCart(false)}>
          <NoSsr>
            <AiOutlineLeft />
          </NoSsr>
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {/* run if cart is empty */}
        {cartItems.length < 1 && (
          <div className="empty-cart">
            <NoSsr>
              <AiOutlineShopping size={150} />
            </NoSsr>
            <h3>Nothing in cart</h3>
            <button type="button" onClick={() => setShowCart(false)} className="btn cart-btn">
              Continue Shopping
            </button>
          </div>
        )}

        <div className="product-container">
          {cartItems.length >= 1 && cartItems.map((item, index) => (
            <div className="product cart-product" key={item._id}>
              <img src={urlFor(item?.images[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item.name}</h5>
                </div>
                <div className="flex bottom">
                  <div className="quantity">
                    <div className="quantity-desc cart-quantity-btn">
                      <button title="Click to remove item" type="button" className="remove-item" onClick={() => onRemove(item)}>
                        <NoSsr>
                          <TiDeleteOutline />
                        </NoSsr>
                      </button>
                      <input
                        // ref={inputRef}
                        type="number"
                        className="input"
                        value={localQuantities[item._id] !== undefined ? localQuantities[item._id] : item.quantity}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          let newQuantity;

                          if (inputValue === '') {
                            newQuantity = ''; // Allow empty string
                          } else {
                            newQuantity = parseInt(inputValue, 10) || 1; // If NaN, default to 1
                          }

                          setLocalQuantities(prevState => ({
                            ...prevState,
                            [item._id]: newQuantity
                          }));
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleQuantityChange(localQuantities[item._id] || item.quantity, item);
                          }
                        }}
                        min="1"
                      />
                      <button className="plus" onClick={() => { onAdd(item); }}><NoSsr><AiOutlinePlus /></NoSsr></button>
                    </div>
                  </div>
                  <h4>
                    ${calculateTotal(item.price, item.quantity).toFixed(2)}
                  </h4>

                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className='btn-container'>
              <div className='subtotal-container'>
                <span className='total-first-letter'>Y</span><span className="total">our subtotal is</span>
                <span className="total"> ${safeToFixed(totalPrice)}</span><em className="tax_and_shipping"> (plus shipping & tax)</em>
              </div>
              <button type="button" className='btn-container btn' onClick={handleCheckout}>
                Pay now with Stripe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
import React, { useContext, useState } from 'react'
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import AddressForm from './AddressForm';
import classes from './Cart.module.css'
import CartItem from './CartItem';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false)

    const cartCtx=useContext(CartContext);
    const hasItems = cartCtx.items.length > 0;
    const totalAmount=`Rs.${cartCtx.totalAmount.toFixed(2)}`;
    const cartItemAddHandler=(item)=>{
      cartCtx.addItem({...item,amount:1})
    }
    const cartItemRemoveHandler=(id)=>{
      cartCtx.removeItem(id);
    }
    const orderHandler=()=>{
      setIsCheckout(true);
    }

    const submitOrderHandler=async (userData)=>{
      setIsSubmitting(true);

      await fetch('https://react-37b1e-default-rtdb.firebaseio.com/orders.json',{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items,
      })
    })
    setIsSubmitting(false);
    setDidSubmit(false);
    cartCtx.clearCart();
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
          {cartCtx.items.map((item) => (
            <CartItem 
              key={item.id}
              name={item.name}
              amount={item.amount}
              price={item.price}
              onAdd={cartItemAddHandler.bind(null,item)}
              onRemove={cartItemRemoveHandler.bind(null,item.id)}
            />
          ))}
        </ul>
      );
    
    const modalActions =(
     
      <div className={classes.actions} >
          <button className={classes['button--alt']} onClick={props.onClose} >close</button>
          {hasItems && (<button className={classes.button} onClick={orderHandler} >Order</button>)}
      </div>
      
    )
    const cartModalContent = (
      <>
      {
        cartItems
      }
      <div className={classes.total} >
          <span>Total Amount</span>
          <span>{totalAmount}</span>
      </div>
      {isCheckout && (<AddressForm onCancel={props.onClose} onConfirm={submitOrderHandler} />)}
      {!isCheckout && modalActions}
      
    </>
    )

    const isSubmittingModalContent = <p>Sending your order Details...</p>;
    const didSubmitModalContent = (
      <>
        <p>Successfully Sent your Order!!</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
        </div>
      </>
    )

    return (
    <>
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
    </>
  )
}

export default Cart
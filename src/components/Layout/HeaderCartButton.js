import React from 'react'
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context';
import { useContext } from 'react';
import { useState,useEffect } from 'react';

const HeaderCartButton = (props) => {
  const [btnHighlight, setbtnHighlight] = useState(false);
  const CartCtx = useContext(CartContext);
  const {items}=CartCtx;

  const btnClasses = `${classes.button} ${btnHighlight ? classes.bump : ''}`;



  useEffect(() => {
    if(items.length === 0){
      return;
    }
    setbtnHighlight(true);
    const timer=setTimeout(()=>{
      setbtnHighlight(false);
    },300)
    return () => {
      clearTimeout(timer);
    }
  }, [items])
  
  const itemCount= items.reduce((curNum,item)=>{
    return curNum+item.amount
  },0)
  return (
    <>
        <button className={btnClasses} onClick={props.onClick} >
            <span className={classes.icon}><CartIcon /> </span>
            <span>View Cart</span>
            <span className={classes.badge}>{itemCount}</span>
        </button>
    </>
  )
}

export default HeaderCartButton
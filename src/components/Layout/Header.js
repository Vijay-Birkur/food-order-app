import React from 'react'
import classes from '../Layout/Header.module.css'
import mealsImage from '../../assets/meals.jpg'
import HeaderCartButton from './HeaderCartButton'

const Header = () => {
  return (
    <>
        <header className={classes.header}>
            <h1>Choose your favourite Food </h1>
            <HeaderCartButton />
        </header>
        <div className={classes['main-image']}>
            <img src={mealsImage} alt="all meals"/>
        </div>
    </>
  )
}

export default Header
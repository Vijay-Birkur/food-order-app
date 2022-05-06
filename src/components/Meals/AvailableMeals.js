import React, { useEffect, useState } from 'react'
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [httpError, sethttpError] = useState();

    useEffect(()=>{
        const fetchMeals= async ()=>{
            const response = await fetch('https://react-37b1e-default-rtdb.firebaseio.com/meals.json')
           
        if(!response.ok){
            throw new Error('Something went wrong!!');
        }
        const responseData= await response.json();
        console.log(responseData);
        const loadedMeals=[];
        for(const key in  responseData){
            loadedMeals.push({
                id: key,
                name: responseData[key].name,
                description: responseData[key].description,
                price: responseData[key].price
            });
        }
        setMeals(loadedMeals);
        setisLoading(false);
    };

    fetchMeals().catch((error)=>{
        setisLoading(false);
        sethttpError(error.message);
    });
    },[]);

    if (isLoading) {
        return (
          <section className={classes.MealsLoading}>
            <p>Loading...</p>
          </section>
        );
      }
    
      if (httpError) {
        return (
          <section className={classes.MealsError}>
            <p>{httpError}</p>
          </section>
        );
      }
    const mealsList= meals.map((e) => {
        return (
            <MealItem 
            key={e.id} 
            id={e.id} 
            name={e.name} 
            description={e.description} 
            price={e.price} 
            />
        );
    })
    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
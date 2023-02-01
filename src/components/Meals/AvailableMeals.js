import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch('https://react-http-83f9a-default-rtdb.firebaseio.com/meals.json');

      if (!res.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await res.json();
      
      const loadedMeals = [];

      for(const key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price,
        });
      }
      
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch(error => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
    <section className={classes.MealsLoading}>
      <p>Loading...</p>
    </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;

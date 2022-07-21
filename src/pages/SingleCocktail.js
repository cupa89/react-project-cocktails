import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { Link, useParams } from 'react-router-dom';

const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [cocktails, setCocktails] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchDrinks = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();

        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strGlass: glass,
            strCategory: category,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];
          const ingredients = [strIngredient1, strIngredient2, strIngredient3, strIngredient4, strIngredient5];
          const newCocktail = {
            name,
            image,
            info,
            glass,
            category,
            instructions,
            ingredients,
          };
          setCocktails(newCocktail);
        } else {
          setCocktails(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchDrinks();
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (!cocktails) {
    return <h2 className='section-title'>no cocktails to display</h2>;
  }

  const { name, image, category, info, glass, instructions, ingredients } = cocktails;

  return (
    <section className='section cocktail-section'>
      <Link to='/' className='btn btn-primary'>
        back home
      </Link>
      <h2 className='section-title'>{name}</h2>
      <div className='drink'>
        <img src={image} alt={name} />
        <div className='drink-info'>
          <p>
            <span className='drink-data'>name: </span>
            {name}
          </p>
          <p>
            <span className='drink-data'>category: </span>
            {category}
          </p>
          <p>
            <span className='drink-data'>info: </span>
            {info}
          </p>
          <p>
            <span className='drink-data'>glass: </span>
            {glass}
          </p>
          <p>
            <span className='drink-data'>instructions: </span>
            {instructions}
          </p>
          <p>
            <span className='drink-data'>ingredients: </span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;

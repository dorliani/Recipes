import React, { useEffect, useState} from 'react';
import './App.css';
import Recipe from './Recipes';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {

  

  const APP_ID = "286e2867";
  const APP_KEY = "17dc2b65995660dd4fb7cdb459612134";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('pasta');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = (e) => {
    setSearch(e.target.value);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" value={search} type="text" onChange={updateSearch}/>
        <Button className="search-button" type="submit">Search</Button>
      </form>

      <div className="recipes">
        {
          recipes.map(recipe => (
            <Recipe
              key={recipe.recipe.label}
              title={recipe.recipe.label} 
              calories={recipe.recipe.calories}
              image={recipe.recipe.image}
              ingredients={recipe.recipe.ingredients}
            />
          ))
        }
      </div>
    </div>
  );
};

export default App;

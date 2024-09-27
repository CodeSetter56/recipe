import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";

import { useGetid } from '../hooks/useGetId';

function Create() {
  const getid = useGetid()
  const navigate = useNavigate()
  const [cookies,_] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imgURL: "",
    cookingtime: 0,
    chef: getid
  });

  const handleInput = (e) => {
    const { id, value } = e.target;
    setRecipe({ ...recipe, [id]: value });
  };

  const addIngredient = () => {
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, ""]
    }));
  };

  const handleIngredientChange = (e, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = e.target.value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const formSubmit = async (e) =>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/recipe",recipe,
        {headers:{authorization : cookies.access_token}}
      )
      alert("Recipe created")
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="container py-5">
      <form onSubmit={formSubmit}>
        <div className="input-group p-3">
          <span className="input-group-text" id="name">name</span>
          <input type="text" className="form-control" placeholder="Recipe name" id="name" onChange={handleInput} />
        </div>

        <div className="input-group p-3">
          <button type="button" className="btn btn-dark" onClick={addIngredient}>Add Ingredients</button>
        </div>

        <div className="container">
          <div className="row">
            {recipe.ingredients.map((val, index) => (
              <div className="col-3 py-2" key={index}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingredient name"
                  value={val}
                  onChange={(e) => handleIngredientChange(e, index)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="input-group p-3">
          <span className="input-group-text">instructions</span>
          <textarea className="form-control" id="instructions" onChange={handleInput}></textarea>
        </div>

        <div className="input-group p-3">
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">imgURL</span>
            <input type="text" className="form-control" id="imgURL" onChange={handleInput} />
          </div>
        </div>

        <div className="input-group p-3">
          <span className="input-group-text">cooking time</span>
          <input type="text" className="form-control" id='cookingtime' onChange={handleInput} />
          <span className="input-group-text">mins</span>
        </div>

      <button type="submit" className="btn btn-success">Create</button>
      </form>
    </div>
  );
}

export default Create;
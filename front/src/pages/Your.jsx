import React, { useEffect } from 'react';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useGetid } from '../hooks/useGetId';
import { renderurl } from '../renderurl';

function Home() {

  const [recipe, setRecipe] = useState([]);
  const userID = useGetid();
  const navigate = useNavigate()

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${renderurl}/recipe`);
        setRecipe(res.data);
        setRecipe((prevRecipes) => prevRecipes.filter((recipe) => recipe.chef === userID)); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipe();
  }, []);

  const editRecipe = (recipeID) => {
    navigate(`/edit/${recipeID}`);
  }

  const deleteRecipe = (recipeID) =>{

  }

  return (
    <div>
      <h1 className='p-4'>Recipes</h1>
      <ul className="d-flex flex-wrap list-unstyled p-0">
        {recipe.map((r) => (
          <li className='p-5' key={r._id}>
            <div className="card p-3" style={{ width: "20rem", height: "28rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <img src={r.imgURL} className="card-img-top" alt={r.name} style={{ height: "12rem", objectFit: "cover" }} />
              <div className="card-body d-flex flex-column justify-content-between">
                <h5 className="card-title">{r.name}</h5>
                <div className="ingredients-container " style={{ height: "2.5rem", overflowY: "hidden", textOverflow: "ellipsis" }}>
                  <ul className="d-flex flex-wrap list-unstyled" style={{ maxHeight: "2.5rem", overflowY: "auto", marginBottom: "1rem" }}>
                    {r.ingredients.map((i, idx) => (
                      <li key={idx} className='m-1 p-1 text-center' style={{ background: "lightgrey", color: "grey", width: "5vw", borderRadius: "10px" }}>{i}</li>
                    ))}
                  </ul>
                </div>
                <p className="card-text" style={{ height: "4rem", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                  {r.instructions}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <button type='button' className={`btn btn-danger`} onClick={() => deleteRecipe(r._id)} style={{ width: "45%" }}>
                    Delete
                  </button>
                  {r.chef === userID && (
                    <button type='button' className='btn btn-warning' style={{ width: "45%" }} onClick={() => editRecipe(r._id)}>
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
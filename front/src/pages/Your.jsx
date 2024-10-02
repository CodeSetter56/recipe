import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetid } from '../hooks/useGetId';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { renderurl } from '../renderurl';

function Your() {
  const [yourrecipes, setYourrecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetid();
  const navigate = useNavigate();

  const fetchYourrecipe = async () => {
    if (!cookies.access_token) {
      navigate("/auth");
      return;
    }
    try {
      const res = await axios.get(`${renderurl}/recipe`, {
        headers: { authorization: cookies.access_token }
      });
      const userRecipes = res.data.filter(recipe => recipe.chef === userID); 
      setYourrecipes(userRecipes);
    } catch (error) {
      console.error(error);
      setYourrecipes([]); 
    }
  };
  
  const deleteRecipe = async (recipeID) => {
    try {
      const response = await axios.delete(`${renderurl}/recipe/delete/${recipeID}`, {
        headers: { authorization: cookies.access_token }
      });
      alert("Recipe deleted");
      fetchYourrecipe();
    } catch (error) {
      console.error(error);
      navigate("/"); 
    }
  };

  useEffect(() => {
    fetchYourrecipe();
  }, [userID, cookies.access_token, navigate]);

  const editRecipe = (recipeID) => {
    navigate(`/edit/${recipeID}`);
  }

  return (
    <div>
      <h1 className='p-4'>Your Recipes</h1>
      {yourrecipes.length === 0 ? (
        <p>No recipes found.</p>
      ) : (
        <ul className="d-flex flex-wrap list-unstyled p-0">
          {yourrecipes?.map((r) => (  
            <li className='p-5' key={r._id}>
              <div className="card p-3" style={{ width: "20rem", height: "30rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <img src={r.imgURL} className="card-img-top" alt={r.name} style={{ height: "12rem", objectFit: "cover" }} />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">{r.name}</h5>
                  <div className="ingredients-container" style={{ height: "3rem", overflowY: "hidden", textOverflow: "ellipsis" }}>
                    <ul className="d-flex flex-wrap list-unstyled" style={{ maxHeight: "3rem", overflowY: "auto", marginBottom: "1rem" }}>
                      {r.ingredients.map((i, idx) => (
                        <li key={idx} className='m-1 p-1 text-center' style={{ background: "lightgrey", color: "grey", width: "5vw", borderRadius: "10px" }}>{i}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="card-text" style={{ height: "4rem", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    {r.instructions}
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <button type='button' className="btn btn-danger" onClick={() => deleteRecipe(r._id)} style={{width:"45%"}}>
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
      )}
    </div>
  );
}

export default Your;
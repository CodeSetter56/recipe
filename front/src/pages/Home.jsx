import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useGetid } from '../hooks/useGetId';

function Home() {

  const [recipe, setRecipe] = useState([])
  const [savedrecipes, setSavedrecipes] = useState([])
  const userID = useGetid()

  useEffect(()=>{
    const fetchRecipe = async () =>{
      try {
        const res = await axios.get("http://localhost:3000/recipe")
        setRecipe(res.data)
      } catch (error) {
        console.error(error);
      }
    }
    const fetchSavedrecipe = async () =>{
      try {
        const res = await axios.get(`http://localhost:3000/recipe/saved/ids/${userID}`)
        setSavedrecipes(res.data.saved)
      } catch (error) {
        console.error(error);
      }
    }
    fetchRecipe()
    fetchSavedrecipe()
  },[])

  const saveRecipe = async(recipeID)=>{
    try {
      const res = await axios.put("http://localhost:3000/recipe",{recipeID,userID})
      alert("Recipe")
      setSavedrecipes(res.data.saved);
    } catch (error) {
      console.error(error);
    }
  }

  const isSaved = (id) => savedrecipes.includes(id)

  return (
    <div>
      <h1 className='p-4'>Recipes</h1>
      <ul className="d-flex flex-wrap list-unstyled p-0">
        {recipe.map((r)=>(
          <li className='p-5' key={r._id}>
            <div className="card p-3" style={{ width: "20rem", height: "30rem" }}>
            <img src={r.imgURL} className="card-img-top" alt={r.name} style={{ height: "15rem" }}/>
              <div className="card-body">
              <h5 className="card-title">{r.name}</h5>
              <p className="card-text" style={{ height: "5rem" }}>{r.instructions}</p>
              <button type='button' className="btn btn-primary" onClick={()=>saveRecipe(r._id)} disabled={isSaved(r._id)}>
                {isSaved(r._id)?"Saved":"Save"}
              </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
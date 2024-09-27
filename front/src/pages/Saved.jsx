import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useGetid } from '../hooks/useGetId';

function Saved() {

  const [savedrecipes, setSavedrecipes] = useState([])
  const userID = useGetid()

  useEffect(()=>{
    const fetchSavedrecipe = async () =>{
      try {
        const res = await axios.get(`http://localhost:3000/recipe/saved/${userID}`)
        setSavedrecipes(res.data.saved)
      } catch (error) {
        console.error(error);
      }
    }
    fetchSavedrecipe()
  },[])

  return (
    <div>
      <h1 className='p-4'>Saved recipes</h1>
      <ul className="d-flex flex-wrap list-unstyled p-0">
        {savedrecipes.map((r)=>(
          <li className='p-5' key={r._id}>
            <div className="card p-3" style={{ width: "20rem", height: "30rem" }}>
            <img src={r.imgURL} className="card-img-top" alt={r.name} style={{ height: "15rem" }}/>
              <div className="card-body">
              <h5 className="card-title">{r.name}</h5>
              <p className="card-text" style={{ height: "5rem" }}>{r.instructions}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Saved
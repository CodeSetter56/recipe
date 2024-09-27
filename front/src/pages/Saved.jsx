import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGetid } from '../hooks/useGetId';

function Saved() {
  const [savedrecipes, setSavedrecipes] = useState([]);
  const userID = useGetid();

  useEffect(() => {
    const fetchSavedrecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/recipe/saved/${userID}`);
        setSavedrecipes(res.data.saved);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSavedrecipe();
  }, [userID]);

  return (
    <div>
      <h1 className='p-4'>Saved Recipes</h1>
      <ul className="d-flex flex-wrap list-unstyled p-0">
        {savedrecipes.map((r) => (
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
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Saved;
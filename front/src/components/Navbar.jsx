import React from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [cookie, setCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () =>{
    setCookie("access_token","")
    window.localStorage.removeItem("userId")
    navigate("/auth")
  }

  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <Link class="nav-link" to={"/"}>Home</Link>
        <Link class="nav-link" to={"/create"}>Create recipes</Link>
        <Link class="nav-link" to={"/saved"}>Saved recipes</Link>
      </div>
    </div>
    {!cookie.access_token?
    (<Link className="btn btn-success" to={"/auth"}>Login</Link>):
    (<button className="btn btn-success" onClick={logout}>Logout</button>)}
  </div>
</nav>
  )
}

export default Navbar
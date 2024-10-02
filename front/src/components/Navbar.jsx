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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Recipe viewer</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <Link className="nav-link" to={"/"}>Home</Link>
        {(cookie.access_token) && <Link className="nav-link" to={"/create"}>Create recipes</Link>}
        {(cookie.access_token) && <Link className="nav-link" to={"/saved"}>Saved recipes</Link>}
        {(cookie.access_token) && <Link className="nav-link" to={"/your"}>Your recipes</Link>}
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
import { NavLink } from "react-router-dom";

function NavBar(){
    return <nav className="navBar">
        <NavLink to="/">Home </NavLink>
        <NavLink to="/mymeasurements">My Measurements</NavLink>
    </nav>
}

export default NavBar;
import { NavLink } from "react-router-dom";

function NavBar(){
    return <nav>
        <NavLink to="/">Home </NavLink>
        <NavLink to="/mymeasurements">My Measurements</NavLink>
    </nav>
}

export default NavBar;
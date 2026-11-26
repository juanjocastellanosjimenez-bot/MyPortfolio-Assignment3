import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo.jsx";
import { useAuth } from "../auth.jsx";

// Main navigation: logo on the left, one link per page on the right, plus sign in / sign out.
const links = [["/", "Home"], ["/about", "About"], ["/projects", "Projects"], ["/education", "Education"], ["/services", "Services"], ["/contact", "Contact"]];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => { await signOut(); navigate("/"); };

  return (
    <header className="navbar">
      <NavLink to="/" className="brand"><Logo /><span>Juan</span></NavLink>
      <nav aria-label="Main">
        {links.map(([path, label]) => <NavLink key={path} to={path} end={path === "/"}>{label}</NavLink>)}
        {user ? (
          <>
            <NavLink to="/messages">Messages</NavLink>
            <span className="who">{user.name} ({user.role})</span>
            <button className="linklike" onClick={handleSignOut}>Sign out</button>
          </>
        ) : (
          <>
            <NavLink to="/signin">Sign in</NavLink>
            <NavLink to="/signup">Sign up</NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

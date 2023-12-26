import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import { User } from "../../utils/types";

type Props = {
  formLogin: boolean;
  setFormLogin: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  userLogout: () => void;
};

const DesktopNav = ({ formLogin, setFormLogin, user, userLogout }: Props) => {
  return (
    <nav className="desktop-nav">
      <div className="desktop-nav-center">
        <Link
          to="/"
          className="desktop-nav-links"
          onClick={() => setFormLogin(false)}
        >
          <h3>home</h3>
        </Link>
        <Link to={user ? "/userplay" : "/play"} className="desktop-nav-links">
          <h3>play</h3>
        </Link>
        <Link to={user ? "/lobby" : "/scores"} className="desktop-nav-links">
          <h3>{user ? "my page" : "scores"}</h3>
        </Link>
        {user ? (
          <Link to="/" className="desktop-nav-links" onClick={userLogout}>
            <h3>logout</h3>
          </Link>
        ) : formLogin ? (
          <Link
            to="/login"
            className="desktop-nav-links"
            onClick={() => setFormLogin(false)}
          >
            <h3>register</h3>
          </Link>
        ) : (
          <Link
            to="/login"
            className="desktop-nav-links"
            onClick={() => setFormLogin(true)}
          >
            <h3>login</h3>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;

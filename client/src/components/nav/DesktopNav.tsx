import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type Props = {
  formLogin: boolean;
  setFormLogin: Dispatch<SetStateAction<boolean>>;
};

const DesktopNav = ({ formLogin, setFormLogin }: Props) => {
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
        <Link to="/play" className="desktop-nav-links">
          <h3>play</h3>
        </Link>
        <Link to="/scores" className="desktop-nav-links">
          <h3>scores</h3>
        </Link>
        {formLogin ? (
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

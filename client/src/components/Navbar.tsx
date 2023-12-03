import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type Props = {
  formLogin: boolean;
  setFormLogin: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ formLogin, setFormLogin }: Props) => {
  return (
    <nav>
      <div className="nav-center">
        <Link to="/" className="nav-links" onClick={() => setFormLogin(false)}>
          <h3>home</h3>
        </Link>
        <Link to="/play" className="nav-links">
          <h3>play</h3>
        </Link>
        {formLogin ? (
          <Link
            to="/login"
            className="nav-links"
            onClick={() => setFormLogin(false)}
          >
            <h3>register</h3>
          </Link>
        ) : (
          <Link
            to="/login"
            className="nav-links"
            onClick={() => setFormLogin(true)}
          >
            <h3>login</h3>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

import { Link } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ isLogin, setIsLogin }: Props) => {
  return (
    <nav>
      <div className="nav-center">
        <Link to="/" className="nav-links">
          <h3>home</h3>
        </Link>
        <Link to="/play" className="nav-links">
          <h3>play</h3>
        </Link>
        {isLogin ? (
          <Link
            to="/login"
            className="nav-links"
            onClick={() => setIsLogin(false)}
          >
            <h3>register</h3>
          </Link>
        ) : (
          <Link
            to="/login"
            className="nav-links"
            onClick={() => setIsLogin(true)}
          >
            <h3>login</h3>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

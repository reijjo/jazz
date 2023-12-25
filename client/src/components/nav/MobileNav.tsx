import { useState, Dispatch, SetStateAction } from "react";
import { Link } from "react-router-dom";
import menuico from "../../assets/images/icons/icons8-menu-96.png";
import closeico from "../../assets/images/icons/icons8-cancel-96.png";
import homeico from "../../assets/images/icons/icons8-home-48.png";
import scoreico from "../../assets/images/icons/icons8-scoreboard-90.png";
import playico from "../../assets/images/icons/icons8-play-64.png";
import loginico from "../../assets/images/icons/icons8-login-100.png";

type Props = {
  formLogin: boolean;
  setFormLogin: Dispatch<SetStateAction<boolean>>;
};

const MobileNav = ({ formLogin, setFormLogin }: Props) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    console.log("menu clicked");
    setMenuOpen(!menuOpen);
  };

  // useEffect(() => {
  //   const closeMenu = () => {
  //     setMenuOpen(false);
  //   };

  //   document.addEventListener("click", closeMenu);

  //   return () => {
  //     document.removeEventListener("click", closeMenu);
  //   };
  // }, []);

  console.log("menu", menuOpen);

  return (
    <nav className="mobile-nav">
      <button className="menu-button" onClick={handleMenu}>
        <img
          src={menuOpen ? closeico : menuico}
          alt={menuOpen ? "close menu" : "open menu"}
          width="90%"
          height="90%"
          title={menuOpen ? "close menu" : "open menu"}
        />
      </button>
      <div className={`menu-open ${menuOpen ? "active" : ""}`}>
        <div className="mobile-nav-links-div">
          <Link
            to="/"
            className="mobile-nav-links home"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={homeico}
              alt="home"
              title="Home"
              height="24px"
              width="24px"
            />

            <h3>home</h3>
          </Link>
          <Link
            to="/play"
            className="mobile-nav-links"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={playico}
              alt="play"
              title="Play"
              height="24px"
              width="24px"
            />
            <h3>play</h3>
          </Link>
          <Link
            to="/scores"
            className="mobile-nav-links scores"
            onClick={() => setMenuOpen(false)}
          >
            <img
              src={scoreico}
              alt="score"
              title="Score"
              height="24px"
              width="24px"
            />
            <h3>scores</h3>
          </Link>
          {formLogin ? (
            <Link
              to="/login"
              className="mobile-nav-links"
              onClick={() => {
                setMenuOpen(false);
                setFormLogin(false);
              }}
            >
              <img
                src={loginico}
                alt="register"
                title="register"
                height="24px"
                width="24px"
              />
              <h3>register</h3>
            </Link>
          ) : (
            <Link
              to="/login"
              className="mobile-nav-links"
              onClick={() => {
                setMenuOpen(false);
                setFormLogin(true);
              }}
            >
              <img
                src={loginico}
                alt="login"
                title="Login"
                height="24px"
                width="24px"
              />
              <h3>login</h3>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;

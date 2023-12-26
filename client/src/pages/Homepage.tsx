import MyButton from "../components/MyButton";

import yatzy from "../assets/images/template.png";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <section id="homepage">
      <div className="home-image">
        <img src={yatzy} alt="yatzy" width="90%" />
      </div>
      <div className="home-text">
        <div className="home-text-div">
          <h1>Have a game of Yatzy!</h1>
          <h2>Roll the dice x 5.</h2>
          <MyButton
            className="my-btn my-btn-filled full-width"
            type="button"
            children="Play now!"
            style={{ marginTop: "24px", width: "33%", height: "8vh" }}
            onClick={() => navigate("/play")}
          />
          <p style={{ paddingTop: "24px" }}>
            Or{" "}
            <MyButton
              className="my-btn my-btn-text"
              children="log in"
              onClick={() => navigate("/login")}
            />{" "}
            to save your scores!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Homepage;

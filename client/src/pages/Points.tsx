import { useNavigate } from "react-router-dom";

const Points = () => {
  const navigate = useNavigate();

  return (
    <section id="points">
      <div className="the-game">
        <div className="points">
          <h1>Wohoo!</h1>
          <div className="how-many">
            <h2>You got 23902 Points!!</h2>
            <div className="points-section">
              <div className="top-scores">
                <div>
                  <h3>All time top 5</h3>
                  <h4>1. 311 points</h4>
                  <h4>2.</h4>
                  <h4>3.</h4>
                  <h4>4.</h4>
                  <h4>5.</h4>
                </div>
              </div>
              <div className="scores-over">
                <div>
                  <h3>Total games played 232</h3>
                </div>
                <div>
                  <h4>300+ points 4 times.</h4>
                </div>
                <div>
                  <h4>250+ points 6 times.</h4>
                </div>
                <div>
                  <h4>200+ points 9 times.</h4>
                </div>
                <div>
                  <h4>Under 200 points 33 times.</h4>
                </div>
                <div>
                  <h4>Under 150 points 33 times.</h4>
                </div>
                <div>
                  <h4>Under 100 points 3 times.</h4>
                </div>
              </div>
            </div>
            <div className="play-again">
              <button
                className="my-btn my-btn-filled"
                onClick={() => navigate("/play")}
              >
                Play again?
              </button>
              <button
                className="my-btn my-btn-outline"
                onClick={() => navigate("/")}
              >
                Back to homepage
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Points;

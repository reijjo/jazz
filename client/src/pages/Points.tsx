import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pointsApi from "../api/pointsApi";
import { Points } from "../utils/types";

const Points = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState<Points[]>([]);

  const navigate = useNavigate();
  // const latestPoints = localStorage.getItem("latestPoints");

  // Get scores from database
  useEffect(() => {
    const points = async () => {
      try {
        const points = await pointsApi.getAllPoints();
        const withDates: Points[] = points.map((point: Points) => ({
          ...point,
          createdAt: new Date(point.createdAt),
        }));

        setPoints(withDates);
      } catch (error: unknown) {
        console.log("error", error);
      }
    };
    points();
  }, []);

  // Set loading false
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (!isLoading) {
      localStorage.removeItem("latestPoints");
    }
  }, [isLoading, navigate]);

  // Lots of sorting
  const latest = [...points].sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );
  const topScores = [...points].sort((a, b) => b.points - a.points).slice(0, 5);
  const over300 = [...points].filter((p) => p.points >= 300).length;
  const over250 = [...points].filter(
    (p) => p.points >= 250 && p.points < 300
  ).length;
  const over200 = [...points].filter(
    (p) => p.points >= 200 && p.points < 250
  ).length;
  const under200 = [...points].filter(
    (p) => p.points < 200 && p.points >= 150
  ).length;
  const under150 = [...points].filter(
    (p) => p.points < 150 && p.points >= 100
  ).length;
  const under100 = [...points].filter((p) => p.points < 100).length;

  if (isLoading) {
    return (
      <section
        id="points"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>Loading...</div>
      </section>
    );
  }

  console.log("points", points);
  console.log("topscores", topScores);
  console.log("lasgame", latest[0].points);

  return (
    <section id="points">
      <div className="the-game">
        <div className="points">
          {latest ? <h1>Wohoo!</h1> : null}
          <div className="how-many">
            {latest ? (
              // <h2>You got {latest[0].points} Points!!</h2>
              <h2>You got {localStorage.getItem("latestPoints")} Points!!</h2>
            ) : null}
            <div className="points-section">
              <div className="top-scores">
                <h3>All time top 5</h3>
                {topScores.map((points, index) => (
                  <h4
                    key={points.id}
                    className={
                      latest.length > 0 && points.id === latest[0].id
                        ? "top-scores-latest"
                        : ""
                    }
                  >
                    <span
                      style={{
                        // border: "1px solid black",
                        display: "inline-block",
                        width: "24px",
                      }}
                    >
                      {index + 1}.
                    </span>{" "}
                    {points.points || 0} points by {points.username}
                  </h4>
                ))}
              </div>
              <div className="scores-over">
                <div>
                  <h3>Total games played {points.length}</h3>
                </div>
                <div>
                  <h4>300+ points {over300 | 0} times.</h4>
                </div>
                <div>
                  <h4>250+ points {over250 | 0} times.</h4>
                </div>
                <div>
                  <h4>200+ points {over200 | 0} times.</h4>
                </div>
                <div>
                  <h4>Under 200 points {under200 | 0} times.</h4>
                </div>
                <div>
                  <h4>Under 150 points {under150 | 0} times.</h4>
                </div>
                <div>
                  <h4>Under 100 points {under100 | 0} times.</h4>
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

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import pointsApi from "../api/pointsApi";
import Points from "./Points";
import {
  over200,
  over250,
  over300,
  topScores,
  under100,
  under150,
  under200,
} from "../utils/helpers";

const Scores = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState<Points[]>([]);

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

  return (
    <section id="scores">
      <div className="scores-grid">
        <div className="scores-top5">
          <h3>All time top 5</h3>
          {topScores(points).map((points, index) => (
            <h4 key={points.id}>
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
        <div className="scores-games">
          <h3>Total games played {points.length}</h3>

          <div>
            <h4>
              300+ points{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  textAlign: "center",
                }}
              >
                {over300(points) | 0}{" "}
              </span>{" "}
              times.
            </h4>
          </div>
          <div>
            <h4>
              250+ points{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  textAlign: "center",
                }}
              >
                {over250(points) | 0}{" "}
              </span>{" "}
              times.
            </h4>
          </div>
          <div>
            <h4>
              200+ points{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  textAlign: "center",
                }}
              >
                {over200(points) | 0}{" "}
              </span>{" "}
              times.
            </h4>
          </div>
          <div>
            <h4>
              Under 200 points{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  textAlign: "center",
                }}
              >
                {under200(points) | 0}
              </span>{" "}
              times.
            </h4>
          </div>
          <div>
            <h4>
              Under 150 points{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  textAlign: "center",
                }}
              >
                {under150(points) | 0}
              </span>{" "}
              times.
            </h4>
          </div>
          <div>
            <h4>
              Under 100 points{" "}
              <span
                style={{
                  display: "inline-block",
                  width: "24px",
                  textAlign: "center",
                }}
              >
                {under100(points) | 0}
              </span>{" "}
              times.
            </h4>
          </div>
        </div>
      </div>
      <div className="scores-buttons">
        <button
          className="my-btn my-btn-filled"
          onClick={() => navigate("/play")}
        >
          Play?
        </button>
        <button className="my-btn my-btn-outline" onClick={() => navigate("/")}>
          Back to homepage
        </button>
      </div>
    </section>
  );
};

export default Scores;

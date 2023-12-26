import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { User, Points } from "../utils/types";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";
import {
  over200,
  over250,
  over300,
  topScores,
  under100,
  under150,
  under200,
} from "../utils/helpers";
import pointsApi from "../api/pointsApi";
import theimg from "../assets/images/template.png";
import MyButton from "../components/MyButton";

type Props = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const Lobby = ({ user, setUser }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState<Points[]>([]);
  const [myPoints, setMyPoints] = useState<Points[]>([]);
  const [regpoints, setRegPoints] = useState<Points[]>([]);

  const navigate = useNavigate();

  // See if user is logged in
  useEffect(() => {
    const checkToken = async () => {
      // Get token from localstorage
      const token = localStorage.getItem("yatzy");

      if (!token) {
        console.log("No token found.");
        setUser(null);
        localStorage.removeItem("how");
        navigate("/");
      }

      try {
        if (token) {
          const res = await authApi.authorization(token);

          const validUser = res.user;

          if (validUser) {
            setUser(validUser);
          } else {
            setUser(null);
            localStorage.clear();
            navigate("/");
          }
        }
      } catch (error: unknown) {
        localStorage.clear();
        setUser(null);
        navigate("/");

        if (isAxiosError(error)) {
          console.log(error.response?.data);
        } else {
          console.error("Error checking token", error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkToken();
  }, [setUser, navigate]);

  // Get points from database
  useEffect(() => {
    const getPoints = async () => {
      try {
        const points = await pointsApi.getAllPoints();
        const withDates: Points[] = points.map((point: Points) => ({
          ...point,
          createdAt: new Date(point.createdAt),
        }));

        setPoints(withDates);

        if (points && user) {
          setMyPoints(
            points.filter((p: Points) => p.username === user.username)
          );

          setRegPoints(
            points.filter((p: Points) => p.username !== "Testiukko")
          );
        }
      } catch (error: unknown) {
        console.log("error", error);
      }
    };
    getPoints();
  }, [user]);

  if (isLoading) {
    return (
      <section id="lobby">
        <h1>Loading...</h1>
        <h1>Loading...</h1>
        <h1>Loading...</h1>
      </section>
    );
  }

  console.log("user", user);

  return (
    <section id="lobby">
      <div className="lobby-grid">
        <div className="lobby-play">
          <div className="lobby-img">
            <img
              src={theimg}
              alt="the img"
              title="the image"
              height="100%"
              width="100%"
            />
          </div>
          <div className="lobby-button">
            <MyButton
              className="my-btn my-btn-filled"
              style={{ width: "100%" }}
              children="Play!"
              onClick={() => navigate("/userplay")}
            />
          </div>
        </div>
        <div className="personal-top">
          <h3>Top 5 by {user?.username}</h3>
          {topScores(myPoints).map((points, index) => (
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
              {points.points || 0} points by {user?.username}
            </h4>
          ))}
          <div className="persontal-stats">
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <h3>My total games played {myPoints.length}</h3>
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
                    {over300(myPoints) | 0}{" "}
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
                    {over250(myPoints) | 0}{" "}
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
                    {over200(myPoints) | 0}{" "}
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
                    {under200(myPoints) | 0}
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
                    {under150(myPoints) | 0}
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
                    {under100(myPoints) | 0}
                  </span>{" "}
                  times.
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="all-top">
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
        <div className="all-games">
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
        <div className="registered-top">
          <h3>Registered users top 5</h3>
          {topScores(regpoints).map((points, index) => (
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
        <div className="registered-games">
          <h3>Registered users </h3>
          <h3>total games played {regpoints.length}</h3>
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
                {over300(regpoints) | 0}{" "}
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
                {over250(regpoints) | 0}{" "}
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
                {over200(regpoints) | 0}{" "}
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
                {under200(regpoints) | 0}
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
                {under150(regpoints) | 0}
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
                {under100(regpoints) | 0}
              </span>{" "}
              times.
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lobby;

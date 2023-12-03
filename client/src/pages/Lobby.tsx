import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { User } from "../utils/types";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

type Props = {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const Lobby = ({ user, setUser }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // See if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const valid = await authApi.authorization();

        if (valid && valid.user) {
          setUser(valid.user);

          console.log("WHAT IS VALID?", valid);
        } else {
          localStorage.removeItem("yatzy");
          console.log("localStorage cleared.");
          setUser(null);
          console.log("not valid", valid);
        }
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          console.log(error.response?.data.message);
        } else {
          console.log("err", error);
        }

        // navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [setUser, navigate]);

  if (isLoading) {
    return (
      <section id="lobby">
        <h1>Loading...</h1>
        <h1>Loading...</h1>
        <h1>Loading...</h1>
      </section>
    );
  }

  return (
    <section id="lobby">
      <h1>LOBBYYY</h1>
      <h2>Welcome {user?.username}</h2>
    </section>
  );
};

export default Lobby;

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

import { RegisterInfo, LoginInfo } from "../utils/types";

import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";

type Props = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Sign = ({ isLogin, setIsLogin }: Props) => {
  const [regInput, setRegInput] = useState<RegisterInfo>({
    username: "",
    email: "",
    passwd: "",
    passwd2: "",
  });

  const [loginInput, setLoginInput] = useState<LoginInfo>({
    user: "",
    passwd: "",
  });

  // Register Input
  const handleRegInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRegInput((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Login Input
  const handleLoginInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInput((data) => ({
      ...data,
      [name]: value,
    }));
  };

  console.log("Register Input", regInput);

  return (
    <section id="sign">
      {isLogin ? (
        <div className="login">
          <h2>Login</h2>
          <form className="form-login">
            <div className="login-inputs">
              {/* Username / Email input */}
              <MyInput
                className="my-input"
                htmlFor="log-input-username"
                labelText="Username / Email"
                type="text"
                id="log-input-username"
                placeholder="Username / Email"
                value={loginInput.user}
                onChange={handleLoginInput}
              />

              {/* Password input */}
              <MyInput
                className="my-input"
                htmlFor="log-input-passwd"
                labelText="Password"
                type="password"
                id="log-input-passwd"
                placeholder="Password"
                autoComplete="off"
                value={loginInput.passwd}
                onChange={handleLoginInput}
              />
            </div>
            <div className="my-input-button">
              <MyButton
                className="my-btn my-btn-filled"
                children="Login"
                type="submit"
              />
            </div>
          </form>
          <p>Don't have an account?</p>{" "}
          <p>
            {" "}
            Click{" "}
            <MyButton
              className="my-btn my-btn-text"
              children="here"
              onClick={() => setIsLogin(false)}
            />{" "}
            to register.
          </p>
        </div>
      ) : (
        <div className="register">
          <h2>Register</h2>
          <form className="form-register">
            <div className="register-inputs">
              {/* Username input */}
              <MyInput
                className="my-input"
                htmlFor="reg-input-username"
                labelText="Username"
                type="text"
                id="reg-input-username"
                name="username"
                placeholder="Username..."
                value={regInput.username}
                onChange={handleRegInput}
              />

              {/* Email input */}
              <MyInput
                className="my-input"
                htmlFor="reg-input-email"
                labelText="Email"
                type="text"
                id="reg-input-email"
                name="email"
                placeholder="Email..."
                onChange={handleRegInput}
              />

              {/* Password input */}
              <MyInput
                className="my-input"
                htmlFor="reg-input-passwd"
                labelText="Password"
                type="password"
                id="reg-input-passwd"
                name="passwd"
                placeholder="Password..."
                autoComplete="off"
                onChange={handleRegInput}
              />

              {/* Confirm Password input */}
              <MyInput
                className="my-input"
                htmlFor="reg-input-passwd2"
                labelText="Confirm Password"
                type="password"
                id="reg-input-passwd2"
                name="passwd2"
                placeholder="Password again..."
                autoComplete="off"
                onChange={handleRegInput}
              />
            </div>

            <div className="my-input-button">
              <MyButton
                className="my-btn my-btn-filled"
                children="Register"
                type="submit"
              />
            </div>
          </form>
          <p>
            Already have an account?{" "}
            <MyButton
              className="my-btn my-btn-text"
              children="Log in"
              onClick={() => setIsLogin(true)}
            />{" "}
            here!
          </p>
        </div>
      )}
    </section>
  );
};

export default Sign;

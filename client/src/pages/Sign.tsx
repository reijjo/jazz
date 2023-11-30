import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import { Dispatch, SetStateAction } from "react";

type Props = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
};

const Sign = ({ isLogin, setIsLogin }: Props) => {
  return (
    <section id="sign">
      {isLogin ? (
        <div className="login">
          <h2>Login</h2>
          <form className="form-login">
            <div className="login-inputs">
              <MyInput
                className="my-input"
                htmlFor="log-input-username"
                labelText="Username"
                type="text"
                id="log-input-username"
                placeholder="Username..."
              />

              {/* Password input */}
              <MyInput
                className="my-input"
                htmlFor="log-input-passwd"
                labelText="Password"
                type="password"
                id="log-input-passwd"
                placeholder="Password..."
                autoComplete="off"
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
                placeholder="Username..."
              />

              {/* Password input */}
              <MyInput
                className="my-input"
                htmlFor="reg-input-passwd"
                labelText="Password"
                type="password"
                id="reg-input-passwd"
                placeholder="Password..."
                autoComplete="off"
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

import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";

import {
  RegisterInfo,
  LoginInfo,
  InfoMsg,
  RegisterFocus,
  FormErrors,
  User,
} from "../utils/types";

import MyInput from "../components/MyInput";
import MyButton from "../components/MyButton";
import InfoMessage from "../components/InfoMessage";
import usersApi from "../api/userApi";
import { errorMsgFunc, infoMsgFunc } from "../utils/helpers";
import authApi from "../api/authApi";
import { useNavigate } from "react-router-dom";

type Props = {
  isLogin: boolean;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  // user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
};

const Sign = ({ isLogin, setIsLogin, /* user, */ setUser }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const [infoMessage, setInfoMessage] = useState<InfoMsg>({
    message: "",
    style: "",
  });

  const [registerFocus, setRegisterFocus] = useState<RegisterFocus>({
    username: false,
    email: false,
    passwd: false,
    passwd2: false,
  });

  // Register Input
  const handleRegInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setRegInput((data) => ({
      ...data,
      [name]: value,
    }));

    // Checks if input is valid
    // Username check
    if (name === "username") {
      const usernameValidMsg = !/^[A-Za-z0-9-_.]+$/.test(value)
        ? "Only letters, numbers and -_. allowed"
        : null;
      const usernameLenMsg =
        value.length < 3 || value.length > 20 ? "3-20 characters." : null;

      setNotValid((prevErrors) => ({
        ...prevErrors,
        username: { len: usernameLenMsg, valid: usernameValidMsg },
      }));
    }

    // Email check
    else if (name === "email") {
      const emailRegex = /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      const emailLenMsg =
        value.length > 60 ? "Max 60 characters on email." : null;
      const emailValidMsg = !emailRegex.test(value)
        ? "That is not a legit email."
        : null;

      setNotValid((prevErrors) => ({
        ...prevErrors,
        email: { len: emailLenMsg, valid: emailValidMsg },
      }));
    }

    // Password check
    else if (name === "passwd") {
      const pwLenMsg =
        value.length < 8 || value.length > 30 ? "8-30 characters." : null;
      const pwNumMsg = !/\d/.test(value) ? "At least one number." : null;
      const pwCapitalMsg = !/[A-Z]/.test(value)
        ? "At least one Uppercase letter."
        : null;
      const pwSpecialMsg = !/[!._\-@#*$]/.test(value)
        ? "At least one special character !._-@#*$"
        : null;

      setNotValid((prevErrors) => ({
        ...prevErrors,
        passwd: {
          len: pwLenMsg,
          num: pwNumMsg,
          capital: pwCapitalMsg,
          special: pwSpecialMsg,
        },
      }));
    }

    // Confirm Password check
    else if (name === "passwd2") {
      const pw2Msg =
        value !== regInput.passwd ? "Passwords doesn't match." : null;

      setNotValid((prevErrors) => ({
        ...prevErrors,
        passwd2: {
          match: pw2Msg,
        },
      }));
    }
  };

  // Login Input
  const handleLoginInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInput((data) => ({
      ...data,
      [name]: value,
    }));
  };

  // Handle register input focus / blur
  const handleFocusReg = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setRegisterFocus((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlurReg = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setRegisterFocus((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const [notValid, setNotValid] = useState<FormErrors>({
    username: {
      len: null,
      valid: null,
    },
    email: {
      len: null,
      valid: null,
    },
    passwd: {
      len: null,
      special: null,
      capital: null,
      num: null,
    },
    passwd2: {
      match: null,
    },
  });

  const navigate = useNavigate();

  // Register user
  const registerUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser: RegisterInfo = {
        username: regInput.username,
        email: regInput.email,
        passwd: regInput.passwd,
        passwd2: regInput.passwd2,
      };

      const res = await usersApi.createUser(newUser);
      infoMsgFunc(res, setInfoMessage);
      setRegInput({
        username: "",
        email: "",
        passwd: "",
        passwd2: "",
      });
      console.log("res", res);
    } catch (error: unknown) {
      errorMsgFunc(error, setInfoMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const user: LoginInfo = {
        user: loginInput.user,
        passwd: loginInput.passwd,
      };

      const res = await authApi.login(user);
      console.log("res", res);

      // Store the token in localStorage for now
      if (res.token) {
        localStorage.setItem("yatzy", res.token);
      }

      if (res.loginUser) {
        setUser(res.loginUser);
      }

      infoMsgFunc(res, setInfoMessage);
      setLoginInput({
        user: "",
        passwd: "",
      });
      // setTimeout(() => {
      //   setIsLoading(false);
      //   navigate("/lobby");
      // }, 5000);
    } catch (error: unknown) {
      errorMsgFunc(error, setInfoMessage, "error");
    } finally {
      setIsLoading(false);
      navigate("/lobby");
    }
  };

  // Return
  return (
    <section id="sign">
      {isLogin ? (
        <div className="login">
          <h2>Login</h2>
          <form className="form-login" onSubmit={loginUser}>
            <div className="login-inputs">
              {/* Username / Email input */}
              <MyInput
                className="my-input"
                htmlFor="log-input-user"
                labelText="Username / Email"
                type="text"
                id="log-input-user"
                name="user"
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
                name="passwd"
                placeholder="Password"
                autoComplete="off"
                value={loginInput.passwd}
                onChange={handleLoginInput}
              />
            </div>

            <InfoMessage
              message={infoMessage.message}
              style={infoMessage.style}
            />

            <div className="my-input-button">
              <MyButton
                className="my-btn my-btn-filled"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                children={
                  isLoading ? (
                    <div
                      className="loading-spinner"
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignSelf: "center",
                        justifySelf: "center",
                      }}
                    ></div>
                  ) : (
                    "Login"
                  )
                }
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
          <form className="form-register" onSubmit={registerUser}>
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
                autoComplete="off"
                value={regInput.username}
                onChange={handleRegInput}
                onFocus={handleFocusReg}
                onBlur={handleBlurReg}
              />
              {registerFocus.username &&
                (notValid.username.len || notValid.username.valid) && (
                  <ul>
                    {notValid.username.len && <li>{notValid.username.len}</li>}
                    {notValid.username.valid && (
                      <li>{notValid.username.valid}</li>
                    )}
                  </ul>
                )}

              {/* Email input */}
              <MyInput
                className="my-input"
                htmlFor="reg-input-email"
                labelText="Email"
                type="text"
                id="reg-input-email"
                name="email"
                placeholder="Email..."
                autoComplete="off"
                value={regInput.email}
                onChange={handleRegInput}
                onFocus={handleFocusReg}
                onBlur={handleBlurReg}
              />
              {registerFocus.email &&
                (notValid.email.len || notValid.email.valid) && (
                  <ul>
                    {notValid.email.len && <li>{notValid.email.len}</li>}
                    {notValid.email.valid && <li>{notValid.email.valid}</li>}
                  </ul>
                )}

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
                value={regInput.passwd}
                onChange={handleRegInput}
                onFocus={handleFocusReg}
                onBlur={handleBlurReg}
              />
              {registerFocus.passwd &&
                (notValid.passwd.capital ||
                  notValid.passwd.len ||
                  notValid.passwd.num ||
                  notValid.passwd.special) && (
                  <ul>
                    {notValid.passwd.capital && (
                      <li>{notValid.passwd.capital}</li>
                    )}
                    {notValid.passwd.len && <li>{notValid.passwd.len}</li>}
                    {notValid.passwd.num && <li>{notValid.passwd.num}</li>}
                    {notValid.passwd.special && (
                      <li>{notValid.passwd.special}</li>
                    )}
                  </ul>
                )}

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
                value={regInput.passwd2}
                onChange={handleRegInput}
                onFocus={handleFocusReg}
                onBlur={handleBlurReg}
              />
              {registerFocus.passwd2 && notValid.passwd2.match && (
                <ul>
                  {notValid.passwd2.match && <li>{notValid.passwd2.match}</li>}
                </ul>
              )}
            </div>

            <InfoMessage
              message={infoMessage.message}
              style={infoMessage.style}
            />

            <div className="my-input-button">
              <MyButton
                className="my-btn my-btn-filled"
                children={
                  isLoading ? (
                    <div
                      className="loading-spinner"
                      style={{
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignSelf: "center",
                        justifySelf: "center",
                      }}
                    ></div>
                  ) : (
                    "Register"
                  )
                }
                type="submit"
              />
            </div>
          </form>
          <p>Already have an account? </p>
          <p>
            Then just click to{" "}
            <MyButton
              className="my-btn my-btn-text"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              children="Log in"
              onClick={() => setIsLogin(true)}
            />
          </p>
        </div>
      )}
    </section>
  );
};

export default Sign;

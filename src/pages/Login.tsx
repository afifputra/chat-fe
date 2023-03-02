import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
      return alert("Please enter your email and password");
    }

    try {
      const response = await axios.post("http://localhost:7001/login", {
        email,
        password,
      });

      const { token, userId } = response.data;

      login(token, userId);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" ref={emailRef} />
        <br />
        <br />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" ref={passwordRef} />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={() => navigate("/register")}>Register</button>
    </>
  );
};

export default Login;

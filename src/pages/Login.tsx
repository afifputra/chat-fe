import { useRef } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Login: React.FC = () => {
  const navigate = useNavigate();
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

      const { token } = response.data;

      localStorage.setItem("token", token);

      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" ref={emailRef} />
      <br />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" ref={passwordRef} />
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;

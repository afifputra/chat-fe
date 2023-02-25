import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstName = firstNameRef.current?.value;
    const lastName = lastNameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstName || !lastName || !email || !password) {
      return alert("Please enter all fields");
    }

    try {
      await axios.post("http://localhost:7001/users", {
        firstName,
        lastName,
        type: "consumer",
        email,
        password,
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section>
      <h1>Register</h1>
      <br />
      <form onSubmit={onSubmitHandler}>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input type="text" name="firstName" id="firstName" ref={firstNameRef} />
        </div>
        <br />
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name="lastName" id="lastName" ref={lastNameRef} />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" ref={emailRef} />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" ref={passwordRef} />
        </div>
        <br />
        <button type="submit">Register</button>
      </form>
      <button>
        <Link to="/login">Have an account? Login</Link>
      </button>
    </section>
  );
};

export default Register;

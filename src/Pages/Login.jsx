import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/OlxLogo';
import '../Components/Login/Login.css';
import { toast } from 'react-toastify';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors,setErrors] = useState({})
  const navigate = useNavigate()

  const { auth } = useContext(FirebaseContext);

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if(!validateForm()) return;
    if (email.trim() === '') {
      return
    }

    if (password.trim() === '') {
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      navigate('/')
    } catch (error) {
      toast.error(error.code.split('/')[1].split('-').join(' '))
      console.log(error)
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <Logo />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <p className="error" style={{ color: "red" }}>{errors.email}</p>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {errors.password && <p className="error" style={{ color: "red" }}>{errors.password}</p>}
          <br />
          <br />
          <button>Login</button>
        </form>
        <a href='/signup'>Signup</a>
      </div>
    </div>
  );
}

export default Login;
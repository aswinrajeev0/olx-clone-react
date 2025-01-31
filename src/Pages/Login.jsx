import React, { useState, useContext } from 'react';
import { FirebaseContext } from '../store/Context';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/OlxLogo';
import '../Components/Login/Login.css';

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const {auth} = useContext(FirebaseContext);

  async function handleSubmit(e){
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth,email,password)
      alert("Logged in")
      navigate('/')
    } catch (error) {
      alert(error.message)
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
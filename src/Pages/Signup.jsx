import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import Logo from '../assets/OlxLogo';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { FirebaseContext } from '../store/Context';

export default function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const { auth, db } = useContext(FirebaseContext)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      await setDoc(doc(db, 'users', user.uid), {
        id: user.uid,
        username: username,
        email: email,
        phone: phone,
      });

      console.log('User signed up & stored in Firestore:', user);
      navigate('/login')

    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  }

  return (
    <div>
      <div className="signupParentDiv">
        {/* <img width="200px" height="200px" src={Logo}></img> */}
        <Logo />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="username"
            name="name"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
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
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            name="phone"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
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
          <button>Signup</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}
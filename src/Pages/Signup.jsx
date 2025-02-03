import React, { useState, useContext } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import Logo from '../assets/OlxLogo';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { FirebaseContext } from '../store/Context';
import { toast } from "react-toastify";

export default function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({});

  const { auth, db } = useContext(FirebaseContext)
  const navigate = useNavigate()

  function validateForm() {
    let isValid = true;
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits";
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
    if (!validateForm()) return;
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
      toast.error(error.code.split('/')[1].split('-').join(' '))
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
          {errors.username && <p className="error" style={{color:"red"}}>{errors.username}</p>}
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
          {errors.email && <p className="error" style={{color:"red"}}>{errors.email}</p>}
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
          {errors.phone && <p className="error" style={{color:"red"}}>{errors.phone}</p>}
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
          {errors.password && <p className="error" style={{color:"red"}}>{errors.password}</p>}

          {errors.firebase && <p className="error" style={{color:"red"}}>{errors.firebase}</p>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href='/login'>Login</a>
      </div>
    </div>
  );
}
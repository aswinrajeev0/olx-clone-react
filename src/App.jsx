import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import Home from "./Pages/home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Viewpost from "./Pages/Viewpost"
import Create from "./Pages/Create"
import Post from "./store/PostContext"

import { FirebaseContext, AuthContext } from "./store/Context"

function App() {

  const { setUser } = useContext(AuthContext);
  const { firebase, auth } = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  })

  return (
    <>
      <Router>
        <Post>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<Viewpost />} />
          </Routes>
        </Post>
      </Router>
    </>
  )
}

export default App

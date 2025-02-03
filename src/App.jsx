import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import Home from "./Pages/home"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import Viewpost from "./Pages/Viewpost"
import Create from "./Pages/Create"
import Post from "./store/PostContext"

import { FirebaseContext, AuthContext } from "./store/Context"
import { ToastContainer } from "react-toastify"

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}

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
    <ToastContainer />
      <Router>
        <Post>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} />
            <Route path="/view" element={<ProtectedRoute><Viewpost /></ProtectedRoute>} />
          </Routes>
        </Post>
      </Router>
    </>
  )
}

export default App

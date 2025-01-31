import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { FirebaseContext } from './store/Context.jsx'
import Context from './store/Context.jsx'
import { auth, db } from './firebase/config.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FirebaseContext.Provider value={{ auth, db }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </StrictMode>,
)

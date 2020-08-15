import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { useAuth } from './hooks/authHook'
import { NavBar } from './component/NavBar'
import { Loading } from './component/Loading'
import { AuthContext } from './Context/authContext'
import 'materialize-css'

function App() {
  const { login, logout, token, userId, ready } = useAuth();
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loading />
  }

  return (
    <AuthContext.Provider value={{ token, userId, login, logout, isAuthenticated }} >
      <Router>
        {isAuthenticated && <NavBar />}
        <div className="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;

import React from 'react';
import 'materialize-css'
import { BrowserRouter as Router } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/authHook';
import { AuthContext } from './Context/authContext';
import { NavBar } from './component/NavBar';

function App() {
  const { login, logout, token, userId } = useAuth();
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated);
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

import './App.css';
import SignupPage from './pages/SignupPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import RootPage from './pages/RootPage';
import LoginPage from './pages/LoginPage';
import { useContext } from 'react';
import userContext from './context/userContext/UserContext';
import NotFound from './pages/NotFound';
import AuthGuard from './authGuard/AuthGuard';

function App() {
  const [userState] = useContext(userContext)

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootPage />} />

          <Route path="/home" element={<AuthGuard />}>
            <Route path='/home' element={<HomePage />} />
          </Route>

          <Route path="/log-in" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignupPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

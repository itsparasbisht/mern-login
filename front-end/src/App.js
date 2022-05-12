import "./App.css";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import useAuth from "./hooks/useAuth";
import { ThemeProvider } from "@mui/material";
import theme from "./muiTheme/theme";

function App() {
  const [auth, error] = useAuth();
  console.log(">>>", auth, error);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={auth.isAuthenticated ? <HomePage /> : <LoginPage />}
            />

            {auth.isAuthenticated && (
              <Route path="/home" element={<HomePage />} />
            )}

            <Route path="/log-in" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

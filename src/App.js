import Login from "./components/Login";
import Register from "./components/Register"
import Home from "./components/Home";
import "./style.scss"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

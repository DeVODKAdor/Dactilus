import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import TraducaoLibras from "./pages/traducao-libras/TraducaoLibras";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />}/>
          <Route path="/traducao-libras" exact element={<TraducaoLibras />} />
          <Route path="/login" exact element={<Login />}/>
          <Route path="/registro" exact element={<Register/>}/>
          <Route path="/chat" exact element={<Chat/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

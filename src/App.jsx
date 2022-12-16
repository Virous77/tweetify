import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Menubar, Sidebar } from "./components/layout/index";
import { HomePage } from "./pages/index";

const App = () => {
  return (
    <section className="App">
      <Menubar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Sidebar />
      <ToastContainer />
    </section>
  );
};

export default App;

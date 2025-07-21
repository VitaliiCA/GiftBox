import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GiftBoxCatalog from "./components/GiftBoxCatalog";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GiftBoxCatalog />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import ItemListPage from "./pages/ItemListPage";
import ItemCreatePage from "./pages/ItemCreatePage";

import NpcListPage from "./pages/NpcListPage";
import NpcCreatePage from "./pages/NpcCreatePage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/items" element={<ItemListPage />} />
        <Route path="/items/new" element={<ItemCreatePage />} />
        <Route path="/npcs" element={<NpcListPage />} />
        <Route path="/npcs/new" element={<NpcCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
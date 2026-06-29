
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";

import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";

import ItemListPage from "./pages/item/ItemListPage";
import ItemCreatePage from "./pages/item/ItemCreatePage";
import ItemEditPage from "./pages/item/ItemEditPage";

import NpcListPage from "./pages/npc/NpcListPage";
import NpcCreatePage from "./pages/npc/NpcCreatePage";
import NpcEditPage from "./pages/npc/NpcEditPage";

import SoldbyCreatePage from "./pages/soldby/SoldbyCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/items" element={<ItemListPage />} />
        <Route path="/items/new" element={<ItemCreatePage />} />
        <Route path="/items/edit/:id" element={<ItemEditPage />} />
        <Route path="/npcs" element={<NpcListPage />} />
        <Route path="/npcs/new" element={<NpcCreatePage />} />
        <Route path="/npcs/edit/:id" element={<NpcEditPage />} />
        <Route path="/soldby/new" element={<SoldbyCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
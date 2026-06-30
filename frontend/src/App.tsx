
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import ProtectedRoute from "./components/ProtectedRoute";

import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";

import ItemListPage from "./pages/item/ItemListPage";
import ItemCreatePage from "./pages/item/ItemCreatePage";
import ItemEditPage from "./pages/item/ItemEditPage";

import NpcListPage from "./pages/npc/NpcListPage";
import NpcCreatePage from "./pages/npc/NpcCreatePage";
import NpcEditPage from "./pages/npc/NpcEditPage";

import SoldbyCreatePage from "./pages/soldby/SoldbyCreatePage";

import ScrollToTopButton from "./components/ScrollToTopButton";
import BackButton from "./components/BackButton";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/items" element={<ItemListPage />} />
        <Route path="/npcs" element={<NpcListPage />} />
        <Route path="/items/new" element={<ProtectedRoute><ItemCreatePage /></ProtectedRoute>} />
        <Route path="/npcs/new" element={<ProtectedRoute><NpcCreatePage /></ProtectedRoute>} />
        <Route path="/soldby/new" element={<ProtectedRoute><SoldbyCreatePage /></ProtectedRoute>} />
        <Route path="/items/edit/:id" element={<ProtectedRoute><ItemEditPage /></ProtectedRoute>} />
        <Route path="/npcs/edit/:id" element={<ProtectedRoute><NpcEditPage /></ProtectedRoute>} />
      </Routes>
      <BackButton />
      <ScrollToTopButton />
    </BrowserRouter>
  );
}

export default App;
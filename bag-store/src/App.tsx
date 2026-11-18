import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { CartProvider } from "./cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Catalog from "./pages/Catalog";
import Login from "./pages/Login";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Catalog />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;

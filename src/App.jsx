import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetail from "./pages/ProductDetail";
import Purchases from "./pages/Purchases";
import MyNav from "./components/Nav";
import LoadingScreen from "./components/LoadingScreen";
import { useDispatch, useSelector } from "react-redux";
import { getProductListThunk } from "./store/slices/productList.slice";
import { useEffect } from "react";
import ProtectedRoutes from "./components/ProtectedRoutes";
import CartSidebar from "./components/CartSidebar";

function App() {
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListThunk());
  }, []);

  return (
    <HashRouter>
      <MyNav />
      {isLoading && <LoadingScreen />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/purchase" element={<Purchases />} />
          <Route path="/sidebar" element={<CartSidebar />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;

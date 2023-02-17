import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Menus from "./pages/Menus";
import Categories from "./pages/Categories";
import Products from "./pages/Products";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="menus" element={<Menus />} />
          <Route path="categories" element={<Categories />} />
          <Route path="products" element={<ProductList />}></Route>
          <Route path="product" element={<Product />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

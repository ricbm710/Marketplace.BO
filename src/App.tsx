//rd
import { Route, Routes } from "react-router-dom";
//Layout
import Layout from "./Layout";
//pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewProduct from "./pages/NewProduct";
import MyProducts from "./pages/MyProducts";
import MyProductEdit from "./pages/MyProductEdit";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="product/:id" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/new" element={<NewProduct />}></Route>
          <Route path="/my-products" element={<MyProducts />}></Route>
          <Route
            path="/my-products/edit/:id"
            element={<MyProductEdit />}
          ></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

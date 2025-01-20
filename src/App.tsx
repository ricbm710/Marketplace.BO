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
        </Route>
      </Routes>
    </>
  );
};

export default App;

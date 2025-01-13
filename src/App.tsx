//rd
import { Route, Routes } from "react-router-dom";
//Layout
import Layout from "./Layout";
//pages
import Home from "./pages/Home";
import Product from "./pages/Product";
import Login from "./pages/Login";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />}></Route>
          <Route path="product/:id" element={<Product />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;

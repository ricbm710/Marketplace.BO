//rd
import { Route, Routes } from "react-router-dom";
//Layout
import Layout from "./Layout";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
      </Routes>
    </>
  );
};

export default App;

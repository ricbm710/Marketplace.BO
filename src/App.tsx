import { Route, Routes } from "react-router-dom";

const App = () => {
  const basePath = import.meta.env.VITE_BASE_PATH;
  return (
    <>
      <Routes>
        <Route path={basePath} element={<div>Marketplace.BO</div>}></Route>
      </Routes>
    </>
  );
};

export default App;

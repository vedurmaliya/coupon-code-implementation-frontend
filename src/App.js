import { useState } from "react";
import CouponList from "./CouponList";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./Cart";

function App() {
  console.log("first");
  const [reload, setReload] = useState(false);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <CouponList reload={reload} setReload={setReload} />
            </div>
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <div className="App">
              <Cart></Cart>
            </div>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

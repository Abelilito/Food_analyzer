import { useState } from "react";
import "./App.scss";
import SearchProduct from "./components/SearchProduct";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchProduct />
    </>
  );
}

export default App;

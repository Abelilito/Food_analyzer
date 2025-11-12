import { useState } from "react";
import "./App.scss";
import SearchFood from "./components/SearchFood";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <SearchFood />
    </>
  );
}

export default App;

import "./App.scss";
import LegalNotice from "./components/LegalNotice";
import SearchProduct from "./components/SearchProduct";

function App() {
  return (
    <div className="flex flex-col justify-between w-full h-screen">
      <SearchProduct /> 
      <LegalNotice />
    </div>
  );
}

export default App;

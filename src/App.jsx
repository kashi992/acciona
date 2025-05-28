import { useLocation } from "react-router-dom";
import Navbar from "./layout/navbar/navbar";
import Routers from "./router/routers";

function App() {
  const location = useLocation();

  return (
    <section className={`${location.pathname !== "/dashboard" ? 'mainWraper' : ''} `}>
      <Navbar />
      <Routers />
    </section>
  )
}

export default App

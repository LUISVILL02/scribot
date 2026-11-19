import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PointsProvider } from "./lib/PointsContext";
import Inicio from "./pages/Inicio";
import Mision1 from "./pages/Mision1";
import Mision2 from "./pages/Mision2";
import Mision3 from "./pages/Mision3";

function App() {
  return (
    <PointsProvider>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/mision-1" element={<Mision1 />} />
        <Route path="/mision-2" element={<Mision2 />} />
        <Route path="/mision-3" element={<Mision3 />} />
      </Routes>
    </BrowserRouter>
    </PointsProvider>
  );
}

export default App;

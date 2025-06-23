import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Pagina/Home";
import { EditTask } from "./Pagina/editTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

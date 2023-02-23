import "./App.css";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;

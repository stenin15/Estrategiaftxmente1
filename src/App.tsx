import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import Entrega from './pages/Entrega';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/entrega" element={<Entrega />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App


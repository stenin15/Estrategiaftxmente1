import { HelmetProvider } from "react-helmet-async";
import LandingPage from './components/LandingPage'

function App() {
  return (
    <HelmetProvider>
      <LandingPage />
    </HelmetProvider>
  )
}

export default App


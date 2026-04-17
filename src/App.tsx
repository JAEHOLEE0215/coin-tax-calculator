import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Simulator from './pages/Simulator';
import Guide from './pages/Guide';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-text font-sans">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulator" element={<Simulator />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

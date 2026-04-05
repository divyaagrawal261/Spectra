import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Documentation from './Documentation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Documentation />} />
      </Routes>
    </Router>
  );
}

export default App;

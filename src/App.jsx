import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login';
import Workspace from './pages/Workspace';
import About from './pages/About';
import Projects from './pages/Projects';
import Organization from './pages/Organization';
import Templates from './pages/Templates';
import Profile from './pages/Profile';

import './App.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Workspace />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/projects" element={<Projects />} />
        <Route exact path="/organization" element={<Organization />} />
        <Route exact path="/templates" element={<Templates />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;

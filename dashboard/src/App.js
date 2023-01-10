import Topbar from './components/topbar/Topbar'
import Sidebar from './components/sidebar/Sidebar'
import './app.css'
import Home from './pages/home/Home'
import ServerList from './pages/serverList/ServerList'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {
  return (
  // <div className="App">
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home /> } />
            <Route path="/serverlist" element={<ServerList /> } />
          </Routes>
      </div>
    </Router>
  )
}
export default App;

import { Routes, Route, Link } from "react-router-dom"; 
import Home from "./pages/Home";
import Search from "./pages/Search";

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">User Behavior Data</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/search">Search Through Dataset</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-5 pt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

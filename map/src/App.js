import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
    <div className="container dark">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>  
    </Router>
  );
}

export default App;

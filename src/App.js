import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/create' element={<Create />}/>
          <Route path='/update' element={<Update />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TaskDetails from "./components/TaskDetails";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Home}></Route>
          <Route exact path="/task" element={<TaskDetails />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;

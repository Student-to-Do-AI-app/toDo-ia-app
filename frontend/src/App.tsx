import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TasksPage from "./pages/TasksPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks" />} />
        <Route path="/tasks" element={<TasksPage />} />
        {/* Aquí puedes agregar más páginas en el futuro */}
      </Routes>
    </Router>
  );
};

export default App;

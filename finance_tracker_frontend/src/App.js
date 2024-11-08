import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Startup from "./pages/startup screen/startup";
import "./App.css";
import Signup from "./pages/Signup/signup";
import Login from "./pages/login/login";
import SplashLoading from "./pages/splash/splashLoading";
import Dashboard from "./pages/dashboard/dashboard";
import IncomeForm from "./pages/incomeform/incomeForm";
import ExpenseForm from "./pages/expenseform/expenseForm";
import EditEntrie from "./pages/editEntries/editEntrie";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Startup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/splashLoading" element={<SplashLoading />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incomeForm" element={<IncomeForm />} />
          <Route path="/expenseForm" element={<ExpenseForm />} />
          <Route path="/editEntrie" element={<EditEntrie />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// <nav>
//   <ul className="flex space-x-4">
//     <li>
//       <Link to="/">Home</Link>
//     </li>
//     <li>
//       <Link to="/about">About</Link>
//     </li>
//     <li>
//       <Link to="/contact">Contact</Link>
//     </li>
//   </ul>
// </nav>
// <Route path="/about" element={<About />} />
// <Route path="/contact" element={<Contact />} />

// <Routes>
//   <Route path="/" element={<Home />} />
// </Routes>

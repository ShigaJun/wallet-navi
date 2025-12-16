import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";

export default function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>{" | "}
        <Link to="/transactions">Transactions</Link>{" | "}
        <Link to="/accounts">Accounts</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </div>
  );
}

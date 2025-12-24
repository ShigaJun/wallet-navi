import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import Accounts from "./pages/Accounts";

export default function App() {
  return (
    <>
      <Header />

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/accounts" element={<Accounts />} />
        </Routes>
      </div>
    </>
  );
}

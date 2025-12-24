import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/">ホーム</Link>
      {" | "}
      <Link to="/transactions">取引</Link>
      {" | "}
      <Link to="/accounts">口座</Link>
    </nav>
  );
}

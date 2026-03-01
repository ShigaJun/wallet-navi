import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <Link to="/">ホーム</Link>
      {" | "}
      {/* <Link to="/accounts">家計簿</Link> */}
      {" | "}
      <Link to="/transactions">家計簿</Link>
      {" | "}
      {/* <Link to="/menu">メニュー</Link> */}
    </nav>
  );
}

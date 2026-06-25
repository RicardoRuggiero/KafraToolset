
import { Link } from "react-router-dom";

function HomeButton() {
  return (
    <Link
      to="/"
      className="btn frutiger-btn mb-3"
    >
      🏠 Início 🍑
    </Link>
  );
}

export default HomeButton;
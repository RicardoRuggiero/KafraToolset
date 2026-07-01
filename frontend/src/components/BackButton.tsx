import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "../style/back-button.css";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.history.length > 1);
  }, [location.pathname]);

  const handleClick = () => {
    if (!enabled) {
      return;
    }

    navigate(-1);
  };

  if (location.pathname === "/") {
    return null;
  }

  return (
    <button className={enabled ? "back-button enabled" : "back-button disabled"} onClick={handleClick}>
      ←
    </button>
  );
}

export default BackButton;


import { useEffect, useState } from "react";

import "../style/scroll-to-top.css";

function ScrollToTopButton() {
  const [enabled, setEnabled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setEnabled(
        window.scrollY > 0
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  const handleClick = () => {
    if (!enabled) {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={
        enabled
          ? "scroll-top-button enabled"
          : "scroll-top-button disabled"
      }
      onClick={handleClick}
    >
      ↑
    </button>
  );
}

export default ScrollToTopButton;
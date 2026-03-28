import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import styled from "styled-components";

export const THEME_STATES = {
  DARK: "dark",
  LIGHT: "light",
};

export default function ToggleTheme() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === THEME_STATES.DARK) {
      setIsDark(true);
      document.documentElement.classList.add(THEME_STATES.DARK);
    } else {
      localStorage.setItem("theme", THEME_STATES.LIGHT);
      setIsDark(false);
    }
  }, []);

  function toggleDark() {
    if (isDark) {
      document.documentElement.classList.remove(THEME_STATES.DARK);
      localStorage.setItem("theme", THEME_STATES.LIGHT);
      setIsDark(false);
    } else {
      document.documentElement.classList.add(THEME_STATES.DARK);
      localStorage.setItem("theme", THEME_STATES.DARK);
      setIsDark(true);
    }
  }
  return (
    <FloatingButton
      onClick={toggleDark}
      className="rotate"
      onAnimationEnd={(event) => event.currentTarget.classList.remove("rotate")}
    >
      {isDark ? <Moon size="15" /> : <Sun size="15" />}
    </FloatingButton>
  );
}

const FloatingButton = styled.button`
  background: var(--dark-mode);
  color: var(--dark-mode-bg);
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  z-index: 999;
  transition: all 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
  &.rotate {
    animation: spin 0.5s ease;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg) scale(1);
    }
    to {
      transform: rotate(360deg) scale(1.1);
    }
  }
  &.rotate {
    animation: spin 0.5s ease;
  }
`;

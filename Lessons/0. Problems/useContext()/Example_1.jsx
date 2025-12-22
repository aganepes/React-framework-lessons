/*
1. Theme Toggler (Light/Dark Mode)
This is the most common use case. It allows any component in the app to know whether the theme is light or dark and change it.
*/

import { createContext, useContext, useState } from 'react';

// 1. Create the Context
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{ 
        backgroundColor: theme === 'light' ? '#fff' : '#333', 
        color: theme === 'light' ? '#000' : '#fff',
        minHeight: '100vh' 
      }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

// 2. A deep child component
function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <nav>
      <span>Current Theme: {theme}</span>
      <button onClick={toggleTheme}>Switch Theme</button>
    </nav>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <h1>Hello Context!</h1>
    </ThemeProvider>
  );
}
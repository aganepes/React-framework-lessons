/*
2. User Authentication (Auth Status)
Manage whether a user is logged in or out across your entire application without passing user data manually to every page.
*/
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function UserProfile() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Please log in.</p>;

  return (
    <div>
      <p>Welcome, {user.name}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

function LoginForm() {
  const { login } = useContext(AuthContext);
  return <button onClick={() => login('JohnDoe')}>Login as John</button>;
}

export default function AuthApp() {
  return (
    <AuthProvider>
      <UserProfile />
      <LoginForm />
    </AuthProvider>
  );
}
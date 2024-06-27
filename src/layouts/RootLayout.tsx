import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div>
      <nav>
        <h1>React Redux Shop</h1>
      </nav>
      <Outlet />
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}

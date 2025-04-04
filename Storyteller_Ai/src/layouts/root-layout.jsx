import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RootLayout() {
  return (
    <>
      <header className="header">
      
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-grow">
    <Outlet />
    <ToastContainer />
      </main>
    <Footer />
    </div>
  </>
  )
}

export default MainLayout;
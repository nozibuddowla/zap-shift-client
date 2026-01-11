import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen px-4 md:px-6">
        <header>
          <Navbar />
        </header>
        <main className="flex-1 py-6">
          <Outlet></Outlet>
        </main>
        <footer className='mt-auto'>
          <Footer />
        </footer>
      </div>
    );
};

export default RootLayout;
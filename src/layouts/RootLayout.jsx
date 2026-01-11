import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const RootLayout = () => {
    return (
      <div className="max-w-7xl mx-auto flex flex-col min-h-screen">
        <header>
          <Navbar />
        </header>
        <main className="flex-1">
          <Outlet></Outlet>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
};

export default RootLayout;
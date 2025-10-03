import React from 'react';
import { Outlet } from 'react-router-dom';
import { InternalNavbar } from '../components/InternalNavbar';
import { DesktopSidebar } from '../components/DesktopSidebar';

export const InternalLayout: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-white)' }}>
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Mobile Navbar */}
      <div className="lg:hidden">
        <InternalNavbar />
      </div>
      
      {/* Main Content */}
      <main className="lg:ml-64">
        <Outlet />
      </main>
    </div>
  );
};

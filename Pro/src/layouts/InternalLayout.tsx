import React from 'react';
import { Outlet } from 'react-router-dom';
import { InternalNavbar } from '../components/InternalNavbar';

export const InternalLayout: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-white)' }}>
      <InternalNavbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

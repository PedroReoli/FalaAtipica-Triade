import React from 'react';
import { Outlet } from 'react-router-dom';

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-white)' }}>
      <Outlet />
    </div>
  );
};

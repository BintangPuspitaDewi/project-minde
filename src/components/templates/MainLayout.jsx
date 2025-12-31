import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#242424] text-white flex flex-col items-center justify-center p-8 text-center">
      <main className="max-w-2xl w-full">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;

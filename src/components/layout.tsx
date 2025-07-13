import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container min-h-screen mx-auto">
      <div className='flex'>
        <div className='w-[256px]'>
          side bar goes here
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};
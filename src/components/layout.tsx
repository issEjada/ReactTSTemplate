import React from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container min-h-screen mx-auto">
        {children}
    </div>
  );
};
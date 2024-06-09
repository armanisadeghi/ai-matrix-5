"use client";
import React from "react";


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {


  return (
    <div className="flex h-full grow relative">
      <main className={`flex-1 flex flex-col transition-margin duration-300`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;

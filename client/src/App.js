import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import { AuthProvider } from './services/Auth'
import './index.css';
const App = () => {
  return (
    <AuthProvider>
      <div className="flexible-content">
        {/* <TopNavigation /> */}
        {/* <SideNavigation /> */}
        <main id="content" className="p-xl-5 p-lg-4 p-3">
          <Routes />
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;

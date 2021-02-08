import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import { AuthProvider, useAuth } from './services/Auth'
import './index.css';
import { auth } from './services/base';
 
const MainApp = () => {
  const { currentUser } = useAuth()
  return (
    currentUser ?
      <div className="flexible-content">
        <TopNavigation />
        <SideNavigation />
        <main id="content" className="p-xl-5 p-lg-4 p-3">
          <Routes />
        </main>
      </div> :
      <main className="vh-100">
        <Routes />
      </main>
  )
}
const App = () => {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
export default App;
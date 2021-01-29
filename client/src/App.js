import React, { Component } from 'react';
import Routes from '../src/components/Routes';
import TopNavigation from './components/topNavigation';
import SideNavigation from './components/sideNavigation';
import './index.css';

class App extends Component {
  
  render() {
    return (
        <div className="flexible-content">
          <TopNavigation />
          <SideNavigation />
          <main id="content" className="p-xl-5 p-lg-4 p-3">
            <Routes />
          </main>
        </div>
    );
  }
}

export default App;

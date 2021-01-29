import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import ServicesPage from './pages/ServicesPage';
import EditServicePage from './pages/EditServicePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path='/' exact component={DashboardPage} />
        <Route path='/dashboard' component={DashboardPage} />
        <Route path='/settings' component={SettingsPage} />
        <Route path='/users' component={UsersPage} />
        <Route path='/services' component={ServicesPage} />
        <Route path='/edit_service' component={EditServicePage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/forgot-password' component={ForgotPasswordPage} />
      </Switch>
    );
  }
}

export default Routes;

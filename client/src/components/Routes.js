import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import ServicesPage from './pages/ServicesPage';
import EditServicePage from './pages/EditServicePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmptyPage from './pages/EmptyPage';
import { AuthProvider } from '../services/Auth'
import PrivateRoute from './PrivateRoute';
class Routes extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={DashboardPage} />
          <PrivateRoute path='/dashboard' component={DashboardPage} />
          <PrivateRoute path='/settings' component={SettingsPage} />
          <PrivateRoute path='/users' component={UsersPage} />
          <PrivateRoute path='/services' component={ServicesPage} />
          <PrivateRoute path='/edit_service' component={EditServicePage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/forgot-password' component={ForgotPasswordPage} />
          <Route path="*" component={EmptyPage} />
        </Switch>
      </AuthProvider>
    );
  }
}

export default Routes;

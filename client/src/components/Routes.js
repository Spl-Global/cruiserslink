import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import SettingsPage from './pages/SettingsPage';
import UsersPage from './pages/UsersPage';
import ServicesPage from './pages/ServicesPage';
import EditServicePage from './pages/EditServicePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import EmptyPage from './pages/EmptyPage';
// import { AuthProvider } from '../services/Auth'
import PrivateRoute from './PrivateRoute';
import TipsAndTricksPage from './pages/TipsAndTricksPage';
import RatingsAndCommentsPage from './pages/RatingsAndCommentsPage';
import { useAuth } from '../services/Auth';
import OpenRoute from './OpenRoute';
const Routes = () => {
  // const { currentUser } = useAuth()
  // const history = useHistory()
  // useEffect(() => {
  //   if (currentUser) {
  //     history.push('/')
  //   } else {
  //     history.push('login')
  //   }
  // }, [currentUser])
  return (
    // <AuthProvider>
    <Switch>
      <OpenRoute exact path='/login' component={LoginPage} />
      <OpenRoute path='/forgot-password' component={ForgotPasswordPage} />
      <PrivateRoute exact path='/' component={DashboardPage} />
      {/* <PrivateRoute path='/dashboard' component={DashboardPage} /> */}
      <PrivateRoute path='/settings' component={SettingsPage} />
      <PrivateRoute path='/users' component={UsersPage} />
      <PrivateRoute path='/services' component={ServicesPage} />
      <PrivateRoute path='/edit_service' component={EditServicePage} />
      <PrivateRoute path='/tipsandtricks' component={TipsAndTricksPage} />
      <PrivateRoute path='/ratingsandcomments' component={RatingsAndCommentsPage} />
      <Route path="*" component={EmptyPage} />
    </Switch>
    // </AuthProvider>
  );
}

export default Routes;

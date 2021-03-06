import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import ClaimsPage from './pages/ClaimsPage';
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
import EditUserPage from './pages/EditUserPage';
import EditTipAndTrick from './pages/EditTipAndTrickPage';
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
      <PrivateRoute path='/claims' component={ClaimsPage} />
      <PrivateRoute path='/tipsandtricks' component={TipsAndTricksPage} />
      <PrivateRoute path='/ratingsandcomments/:type/:id' component={RatingsAndCommentsPage} />

      <PrivateRoute path='/edit_service/:id' component={EditServicePage} />
      <PrivateRoute path='/edit_users/:id' component={EditUserPage} />
      <PrivateRoute path='/edit_tipandtrick/:id' component={EditTipAndTrick} />
      <Route path="*" component={EmptyPage} />
    </Switch>
    // </AuthProvider>
  );
}

export default Routes;

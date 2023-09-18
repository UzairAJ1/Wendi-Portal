import { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, setUser } from './redux/slices/auth';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import ForgotPassword from './pages/ForgotPassword';
import PaymentDetailsPage from './pages/PaymentDetailsPage';
import SupportFeedback from './pages/SupportFeedback';
import ReportAnalytics from './pages/ReportAnalytics';
import NewUser from './pages/NewUser';
import UserDetail from './pages/UserDetail';
import UserPayment from './pages/UserPayment';
import UserSubscriptionDetails from './pages/UserSubscriptionDetails';
import Reports from './pages/Reports';
import PaymentsFour from './pages/PaymentsFour';
import PaymentGateway from './pages/PaymentGateway';
import PaymentPlans from './pages/PaymentPlans';
import PremiumFeatures from './pages/PremiumFeatures';
import Supportfour from './pages/SupportFour';
import FeedbackManagement from './pages/FeedbackManagement';
import ZodiacMachine from './pages/ZodiacMachine';

import Likes from './pages/Likes';
import Home from './pages/Home';

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      console.log('YEYEYWY');
      if (performance.navigation.type === 1) {
        console.log('ok');
      } else {
        if (!remember) {
          console.log('IM HERE ON REMEMBER =======', remember);
          dispatch(setUser(null));
        }
      }
      return;
    };

    // Add the event listener when the component mounts
    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const { isAuthenticated } = useSelector(getAuth);
  const { userData } = useSelector((state) => state.auth);
  const { remember } = useSelector((state) => state.remember);
  const routes = useRoutes([
    !userData
      ? { path: '/', element: <LoginPage />, index: true }
      : {
          path: '/dashboard',
          
          element: <DashboardLayout />,
          children: [
            // { element: <Navigate to="/dashboard/app" />, index: true },
            { path: 'home', element: <Home />, index: true },
            { path: 'app', element: <DashboardAppPage /> },
            { path: 'user', element: <UserPage /> },
            { path: 'products', element: <ProductsPage /> },
            { path: 'blog', element: <BlogPage /> },
            { path: 'payments', element: <PaymentsFour /> },
            { path: 'supportfeedback', element: <SupportFeedback /> },
            { path: 'reportandanalytics', element: <ReportAnalytics /> },
            { path: 'supportfour', element: <Supportfour /> },
          ],
        },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: '/forgotpassword',
      element: <ForgotPassword />,
    },
    {
      path: '/newuser',
      element: <NewUser />,
    },
    {
      path: '/userpayment',
      element: <UserPayment />,
    },
    {
      path: '/usersubscriptiondetails',
      element: <UserSubscriptionDetails />,
    },
    { path: 'reports', element: <Reports /> },
    {
      path: '/userdetails',
      element: <UserDetail />,
    },
    {
      path: '/subscribers',
      element: <PaymentDetailsPage />,
    },
    {
      path: '/paymentgateway',
      element: <PaymentGateway />,
    },
    {
      path: '/paymentplans',
      element: <PaymentPlans />,
    },
    {
      path: '/premiumfeatures',
      element: <PremiumFeatures />,
    },
    {
      path: '/supportandfeedback',
      element: <SupportFeedback />,
    },
    {
      path: '/feedbackmanagement',
      element: <FeedbackManagement />,
    },
  ]);

  return routes;
}

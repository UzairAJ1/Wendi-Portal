import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './redux/slices/auth';
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

export default function Router() {
  const { userData } = useSelector((state) => state.auth);
  console.log('Users:', userData);
  return (
    <Routes>
      <Route path="/">
        {!userData ? (
          <Route path="/" element={<LoginPage />} />
        ) : (
          <>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="home" element={<Home />} index />
              <Route path="app" element={<DashboardAppPage />} />
              <Route path="user" element={<UserPage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="payments" element={<PaymentsFour />} />
              <Route path="supportfeedback" element={<SupportFeedback />} />
              <Route path="reportandanalytics" element={<ReportAnalytics />} />
              <Route path="supportfour" element={<Supportfour />} />
            </Route>
            <Route element={<SimpleLayout />}>
              <Route path="/" element={<Navigate to="/dashboard/home" />} />
              <Route path="404" element={<Page404 />} />
              <Route path="*" element={<Navigate to="/404" />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/newuser" element={<NewUser />} />
              <Route path="/userpayment/:_id" element={<UserPayment />} />
              <Route path="/usersubscriptiondetails" element={<UserSubscriptionDetails />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/userdetails/:_id" element={<UserDetail />} />
              <Route path="/subscribers" element={<PaymentDetailsPage />} />
              <Route path="/paymentgateway" element={<PaymentGateway />} />
              <Route path="/paymentplans" element={<PaymentPlans />} />
              <Route path="/premiumfeatures" element={<PremiumFeatures />} />
              <Route path="/supportandfeedback" element={<SupportFeedback />} />
              <Route path="/feedbackmanagement" element={<FeedbackManagement />} />
            </Route>
          </>
        )}
        <Route path="404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
}

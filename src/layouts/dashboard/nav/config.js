// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'), 
  // },
  { 
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user management',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Reporting and Analytic',
    path: '/dashboard/reportandanalytics',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'product',
  //   path: '/dashboard/products',
  //   icon: icon('ic_cart'),
  // },
  // {
  //   title: 'blog',
  //   path: '/dashboard/blog',
  //   icon: icon('ic_blog'),
  // },


  {
    title: 'Support And Feedback',
    path: '/dashboard/supportfeedback',
    icon: icon('ic_disabled'),
  },
  {
    title: 'Payments',
    path: '/dashboard/paymentdetailspage',
    icon: icon('ic_lock'),
  },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
  // {
  //   title: 'Forgot Password',
  //   path: '/forgot-password',
  //   icon: icon(''),
  // },
];

export default navConfig;

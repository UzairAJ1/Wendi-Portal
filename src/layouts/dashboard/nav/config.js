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
    title: 'Zodiac Machine',
    path: '/dashboard/zodiacmachine',
    icon: <img src="/assets/icons/navbar/imported_icons/lever.png" alt="Support and Feedback" />,
  },
  {
    title: 'Likes',
    path: '/dashboard/likes',
    icon: <img style={{width:"20px", height:"20px"}}  src="/assets/icons/navbar/imported_icons/likes.svg" alt="Support and Feedback" />,
  },
  { 
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user management',
    path: '/dashboard/user',
    icon: <img style={{width:"20px", height:"20px"}}  src="/assets/icons/navbar/imported_icons/manage.svg" alt="Support and Feedback" />,
  },
  {
    title: 'Reporting and Analytic',
    path: '/dashboard/reportandanalytics',
    icon: icon('ic_notification_mail'),
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
    path: '/dashboard/supportfour',
    icon: <img style={{width:"20px", height:"20px"}}  src="/assets/icons/navbar/imported_icons/fdback.svg" alt="Support and Feedback" />,
  },
  {
    title: 'Payments',
    path: '/dashboard/payments',
    icon: <img style={{width:"20px", height:"20px"}}  src="/assets/icons/navbar/imported_icons/payment.svg" alt="Support and Feedback" />,
  },

  
];

export default navConfig;

// component
import SvgColor from '../../../components/svg-color';
import ManSvg from '../../../assets/man.avif';
// ----------------------------------------------------------------------
import Home from '../../../assets/house.svg';
import Dashboard from '../../../assets/dashboard.png';
import Report from '../../../assets/report.svg';
import Support from '../../../assets/support.png';
import Payment from '../../../assets/payments.jpeg';
import User from '../../../assets/user.png';

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  {
    title: 'Home',
    path: '/dashboard/home',
    icon: <img style={{ width: '20px', height: '20px' }} src={Home} alt="Support and Feedback" />,
  },
  //   {
  //   title: 'Zodiac Machine',
  //   path: '/dashboard/zodiacmachine',
  //   icon: <img src="/assets/icons/navbar/imported_icons/lever.png" alt="Support and Feedback" />,
  // },
  // {
  //   title: 'Likes',
  //   path: '/dashboard/likes',
  //   icon: <img style={{width:"20px", height:"20px"}}  src="/assets/icons/navbar/imported_icons/likes.svg" alt="Support and Feedback" />,
  // },
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <img style={{ width: '20px', height: '20px' }} src={Dashboard} alt="Support and Feedback" />,
  },
  {
    title: 'user management',
    path: '/dashboard/user',
    icon: <img style={{ width: '20px', height: '20px' }} src={User} alt="Support and Feedback" />,
  },
  {
    title: 'Reporting and Analytics',
    path: '/dashboard/reportandanalytics',
    icon: <img style={{ width: '20px', height: '20px' }} src={Report} alt="Support and Feedback" />,
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
    icon: <img style={{ width: '20px', height: '20px' }} src={Support} alt="Support and Feedback" />,
  },
  {
    title: 'Payments',
    path: '/dashboard/payments',
    icon: <img style={{ width: '20px', height: '20px' }} src={Payment} alt="Support and Feedback" />,
  },
];

export default navConfig;

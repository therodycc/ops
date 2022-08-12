// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = name => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Menu',
    items: [
      { title: 'Carrito', path: '/checkout/', icon: ICONS.cart },
      { title: 'Ordenes', path: '/orders/', icon: ICONS.ecommerce },
      { title: 'Productos', path: '/products/', icon: ICONS.dashboard }
      // { title: 'Three', path: '/dashboard/three', icon: ICONS.analytics }
    ]
  }

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/dashboard/user',
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'Four', path: '/dashboard/user/four' },
  //         { title: 'Five', path: '/dashboard/user/five' },
  //         { title: 'Six', path: '/dashboard/user/six' }
  //       ]
  //     }
  //   ]
  // }
];

export default sidebarConfig;

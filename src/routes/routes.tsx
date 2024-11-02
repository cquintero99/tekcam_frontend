import { RouteObject } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

import ECommerce from '../pages/Dashboard/ECommerce';

import Inventario from '../pages/Inventario/Inventario';
import RegistrarProducto from '../pages/Inventario/registrar/RegistrarProducto';

const routes: RouteObject[] = [
  {
    path: '/admin/',
    element: (
      <>
        <PageTitle title="eCommerce Dashboard | IT Solutions NYC" />
        <ECommerce />
      </>
    ),
  },
  // {
  //   path: '/admin/calendar',
  //   element: (
  //     <>
  //       <PageTitle title="Calendar | IT Solutions NYC" />
  //       <Calendar />
  //     </>
  //   ),
  // },
  {
    path: '/admin/inventario',
    element: (
      <>
        <PageTitle title="Inventario " />
        <Inventario />
      </>
    ),
  },
  {
    path: '/admin/inventario/registrar',
    element: (
      <>
        <PageTitle title="Inventario Registrar Producto" />
        <RegistrarProducto />
      </>
    ),
  },
  // {
  //   path: '/admin/profile',
  //   element: (
  //     <>
  //       <PageTitle title="Profile | IT Solutions NYC" />
  //       <Profile />
  //     </>
  //   ),
  // },
  // {
  //   path: '/admin/forms/form-elements',
  //   element: (
  //     <>
  //       <PageTitle title="Form Elements | IT Solutions NYC" />
  //       <FormElements />
  //     </>
  //   ),
  // },
  // {
  //   path: '/admin/forms/form-layout',
  //   element: (
  //     <>
  //       <PageTitle title="Form Layout | IT Solutions NYC" />
  //       <FormLayout />
  //     </>
  //   ),
  // },
  // {
  //   path: '/admin/tables',
  //   element: (
  //     <>
  //       <PageTitle title="Tables | IT Solutions NYC" />
  //       <Tables />
  //     </>
  //   ),
  // },
  // {
  //   path: '/admin/settings',
  //   element: (
  //     <>
  //       <PageTitle title="Settings | IT Solutions NYC" />
  //       <Settings />
  //     </>
  //   ),
  // },
  // {
  //   path: '/admin/chart',
  //   element: (
  //     <>
  //       <PageTitle title="Basic Chart | IT Solutions NYC" />
  //       <Chart />
  //     </>
  //   ),
  // },
  // {
  //   path: '/admin/ui/alerts',
  //   element: (
  //     <>
  //       <PageTitle title="Alerts | IT Solutions NYC" />
  //       <Alerts />
  //     </>
  //   ),
  // },
  // {
  //   path: '/admin/ui/buttons',
  //   element: (
  //     <>
  //       <PageTitle title="Buttons | IT Solutions NYC" />
  //       <Buttons />
  //     </>
  //   ),
  // },

];

export default routes;

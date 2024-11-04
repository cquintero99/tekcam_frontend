import { RouteObject } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

import ECommerce from '../pages/Dashboard/ECommerce';

import Inventario from '../pages/Inventario/Inventario';
import RegistrarProducto from '../pages/Inventario/registrar/RegistrarProducto';
import EditarProducto from '../pages/Inventario/editar/EditarProducto';
import InformacionProducto from '../pages/Inventario/informacion/InformacionProducto';
import Profile from '../pages/Profile';
import Usuarios from '../pages/Usuarios/Usuarios';
import RegistrarUsuario from '../pages/Usuarios/registrar/RegistrarUsuario';
import EditarUsuario from '../pages/Usuarios/editar/EditarUsuario';

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
  {
    path: '/admin/inventario/:id/editar',
    element: (
      <>
        <PageTitle title="Inventario Registrar Producto" />
        <EditarProducto />
      </>
    ),
  },
  {
    path: '/admin/inventario/:id/informacion',
    element: (
      <>
        <PageTitle title="Inventario Registrar Producto" />
        <InformacionProducto />
      </>
    ),
  },
  {
    path: '/admin/usuarios',
    element: (
      <>
        <PageTitle title="Perfil" />
        <Usuarios />
      </>
    ),
  },
  {
    path: '/admin/usuarios/registrar',
    element: (
      <>
        <PageTitle title="Perfil" />
        <RegistrarUsuario />
      </>
    ),
  },
  {
    path: '/admin/usuarios/:id/editar',
    element: (
      <>
        <PageTitle title="Perfil" />
        <EditarUsuario />
      </>
    ),
  },

  {
    path: '/admin/perfil',
    element: (
      <>
        <PageTitle title="Perfil" />
        <Profile />
      </>
    ),
  },
];

export default routes;

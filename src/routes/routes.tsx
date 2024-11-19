import { RouteObject } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

import ECommerce from '../pages/Dashboard/ECommerce';

import Inventario from '../pages/stock/Stock';
import RegistrarProducto from '../pages/stock/registrar/RegistrarProducto';
import EditarProducto from '../pages/stock/editar/EditarProducto';
import InformacionProducto from '../pages/stock/informacion/InformacionProducto';

import Vendedores from '../pages/Vendedor/Vendedores';
import RegistrarVendedor from '../pages/Vendedor/registrar/RegistrarVendedor';
import EditarVendedor from '../pages/Vendedor/editar/EditarVendedor';
import Perfil from '../pages/Perfil';
import Inicio from '../pages/Cliente/Inicio';
import Login from '../pages/Authentication/Login';
import Productos from '../pages/Cliente/Productos/Productos';
import InfoProductoCliente from '../pages/Cliente/Productos/informacion/InfoProductoCliente';
import ResetPassword from '../pages/Authentication/ResetPassword';

const routes: RouteObject[] = [
  {
    path: '/admin/',
    element: (
      <>
        <PageTitle title="TEKCAM eCommerce Dashboard " />
        <ECommerce />
      </>
    ),
  },

  {
    path: '/admin/stock',
    element: (
      <>
        <PageTitle title="Stock " />
        <Inventario />
      </>
    ),
  },
  {
    path: '/admin/stock/registrar',
    element: (
      <>
        <PageTitle title="Stock Registrar Producto" />
        <RegistrarProducto />
      </>
    ),
  },
  {
    path: '/admin/stock/:id/editar',
    element: (
      <>
        <PageTitle title="Stock Registrar Producto" />
        <EditarProducto />
      </>
    ),
  },
  {
    path: '/admin/stock/:id/informacion',
    element: (
      <>
        <PageTitle title="Stock Registrar Producto" />
        <InformacionProducto />
      </>
    ),
  },
  {
    path: '/admin/vendedores',
    element: (
      <>
        <PageTitle title="Perfil" />
        <Vendedores />
      </>
    ),
  },
  {
    path: '/admin/vendedores/registrar',
    element: (
      <>
        <PageTitle title="Perfil" />
        <RegistrarVendedor />
      </>
    ),
  },
  {
    path: '/admin/vendedores/:id/editar',
    element: (
      <>
        <PageTitle title="Perfil" />
        <EditarVendedor />
      </>
    ),
  },

  {
    path: '/admin/perfil',
    element: (
      <>
        <PageTitle title="Perfil" />
        <Perfil />
      </>
    ),
  },
  {
    path: '/vendedor/',
    element: (
      <>
        <PageTitle title="eCommerce Dashboard " />
        <ECommerce />
      </>
    ),
  },

  {
    path: '/vendedor/stock',
    element: (
      <>
        <PageTitle title="Stock " />
        <Inventario />
      </>
    ),
  },
  {
    path: '/vendedor/stock/registrar',
    element: (
      <>
        <PageTitle title="Stock Registrar Producto" />
        <RegistrarProducto />
      </>
    ),
  },
  {
    path: '/vendedor/stock/:id/editar',
    element: (
      <>
        <PageTitle title="Stock Registrar Producto" />
        <EditarProducto />
      </>
    ),
  },
  {
    path: '/vendedor/stock/:id/informacion',
    element: (
      <>
        <PageTitle title="Stock Registrar Producto" />
        <InformacionProducto />
      </>
    ),
  },

  {
    path: '/vendedor/perfil',
    element: (
      <>
        <PageTitle title="Perfil" />
        <Perfil />
      </>
    ),
  },
 
  {
    path: '/cliente/',
    element: (
      <>
        <PageTitle title="TEKCAM eCommerce " />
        <Inicio />
      </>
    ),
  },
  {
    path: '/cliente/login',
    element: (
      <>
        <PageTitle title="TEKCAM Login " />
        <Login />
      </>
    ),
  },
  {
    path: '/cliente/reset-password',
    element: (
      <>
        <PageTitle title="TEKCAM Login " />
        <ResetPassword />
      </>
    ),
  },
  {
    path: '/cliente/productos',
    element: (
      <>
        <PageTitle title="TEKCAM Login " />
        <Productos />
      </>
    ),
  },
  {
    path: '/cliente/producto/:id/informacion',
    element: (
      <>
        <PageTitle title="TEKCAM Login " />
        <InfoProductoCliente />
      </>
    ),
  },
];

export default routes;

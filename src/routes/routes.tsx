import { RouteObject } from 'react-router-dom';
import PageTitle from '../components/PageTitle';

import ECommerce from '../pages/Dashboard/ECommerce';

import Inventario from '../pages/Inventario/Inventario';
import RegistrarProducto from '../pages/Inventario/registrar/RegistrarProducto';
import EditarProducto from '../pages/Inventario/editar/EditarProducto';
import InformacionProducto from '../pages/Inventario/informacion/InformacionProducto';

import Vendedores from '../pages/Vendedor/Vendedores';
import RegistrarVendedor from '../pages/Vendedor/registrar/RegistrarVendedor';
import EditarVendedor from '../pages/Vendedor/editar/EditarVendedor';
import Perfil from '../pages/Perfil';
import Inicio from '../pages/Cliente/Inicio';
import SignIn from '../pages/Authentication/SignIn';
import Productos from '../pages/Cliente/Productos/Productos';
import InfoProductoCliente from '../pages/Cliente/Productos/informacion/InfoProductoCliente';

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
    path: '/vendedor/inventario',
    element: (
      <>
        <PageTitle title="Inventario " />
        <Inventario />
      </>
    ),
  },
  {
    path: '/vendedor/inventario/registrar',
    element: (
      <>
        <PageTitle title="Inventario Registrar Producto" />
        <RegistrarProducto />
      </>
    ),
  },
  {
    path: '/vendedor/inventario/:id/editar',
    element: (
      <>
        <PageTitle title="Inventario Registrar Producto" />
        <EditarProducto />
      </>
    ),
  },
  {
    path: '/vendedor/inventario/:id/informacion',
    element: (
      <>
        <PageTitle title="Inventario Registrar Producto" />
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
        <SignIn />
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

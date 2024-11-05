import { ReactNode } from 'react';
import BannerCliente from '../components/Banner/BannerCliente';
import FooterCliente from '../components/Footer/FooterCliente';
import NavbarCliente from '../components/Navbar/NavbarCliente';
import { ClienteProvider } from '../Context/ClienteContext';

const ClienteLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="dark:bg-slate-900 dark:text-bodydark">
        <ClienteProvider>
      <BannerCliente />
      <NavbarCliente/>
      <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
        {children}
      </div>

      <FooterCliente    />
      </ClienteProvider>
    </main>
  );
};

export default ClienteLayout;

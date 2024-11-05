import { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useColorMode from '../../hooks/useColorMode';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const NavbarCliente = () => {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) path with your path
  const navigation = [
    { title: 'Inicio', path: '/' },
    // { title: 'Categorías', path: '/cliente#categorias' },
    { title: 'Productos', path: '/cliente/productos' },
    { title: 'Login', path: '/cliente/login' },
  ];
  const [colorMode, setColorMode] = useColorMode();
  return (
    <nav className="bg-white w-full border-b md:border-0   md:static  dark:bg-slate-900 dark:border-t dark:border-b">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <div className="flex items-center gap-2">
            <img
              src="/src/images/logo/tekcam.png"
              width={30}
              height={50}
              alt="Tekcam Logo"
            />
            <strong className="font-bold text-blue-900 text-2xl">TEKCAM</strong>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? 'block' : 'hidden'
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li
                  key={idx}
                  className="text-dark  hover:text-indigo-900 font-medium hover:underline"
                >
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="hidden md:inline-block">
          <div className="flex items-center gap-2">
            <button
              className="bg-slate-900 text-white rounded-md shadow py-3 px-4 hover:bg-blue-700"
              title="Carrito"
            >
              <FaShoppingBag />
            </button>
            <div
              onClick={() => {
                if (typeof setColorMode === 'function') {
                  setColorMode(colorMode === 'light' ? 'dark' : 'light');
                }
              }}
            >
              {colorMode === 'dark' ? <MdLightMode /> : <MdDarkMode />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCliente;

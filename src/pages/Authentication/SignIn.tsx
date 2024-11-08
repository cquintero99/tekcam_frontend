import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Brand from '../../Global/Brand';
import { useClienteContext } from '../../Context/ClienteContext';
import { Carousel } from 'react-responsive-carousel';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { categorias } = useClienteContext();
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        email,
        password,
      });
      console.log(response);
      const authorizationHeader = response.headers['authorization']; // Suponiendo que el token se envía en el encabezado "Authorization"

      if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.replace('Bearer ', ''); // Elimina el prefijo "Bearer "
        localStorage.setItem('token', token);
        const rol = parseToken(token);
        console.log(rol);
        navigate('/' + rol);
      } else {
        setError('Error al iniciar sesión. Por favor, inténtelo de nuevo.');
      }
    } catch (err) {
      console.error(err);
      setError('Email o contraseña incorrecta. Por favor, inténtelo de nuevo.');
    }
  };

  const parseToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      return payload?.rol?.nombre?.toLowerCase();
    } catch (error) {
      console.error('Failed to parse token:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap items-center">
        <div className="hidden w-full xl:block xl:w-1/2">
          <div className="py-17.5 px-26 text-center">
            <Carousel
              autoPlay
             
              infiniteLoop
              className="rounded-lg"
            >
              {categorias?.map((categoria: any, idx: number) => (
                <div key={idx}>
                   <h3 className="text-center text-xl font-bold dark:text-white underline">
                    {categoria.nombre}
                  </h3>
                  <img
                    src={categoria.imagen}
                    alt={`${categoria.nombre} - ${idx + 1}`}
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                 
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
          <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <span className="mb-1.5 block font-medium">TEKCAM</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
              Iniciar Sesión
            </h2>

            {error && <div className="mb-4 text-red-500">{error}</div>}

            <form onSubmit={handleSignIn}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2.5 block font-medium text-black dark:text-white">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="6+ Characters, 1 Capital letter"
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    required
                  />
                </div>
              </div>

              <div className="mb-5">
                <input
                  type="submit"
                  value="Sign In"
                  className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

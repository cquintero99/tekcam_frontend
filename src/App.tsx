import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useRoutes,
} from 'react-router-dom';

import Loader from './common/Loader';
import routes from './routes/routes';
import DefaultLayout from './layout/DefaultLayout';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const routing = useRoutes(routes);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route
        path="/admin/*"
        element={<DefaultLayout> {routing}</DefaultLayout>}
      />
       <Route
        path="/vendedor/*"
        element={<DefaultLayout> {routing}</DefaultLayout>}
      />
      <Route path="/login" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

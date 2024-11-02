import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import axios from 'axios';
import { Categoria } from '../types/Categoria';
import { Marca } from '../types/Marca';

// Define el tipo para el contexto del producto
type ProductoContextType = {
  token: string | null;
  categorias: Categoria[] | null;
  setCategorias: React.Dispatch<React.SetStateAction<Categoria[] | null>>;
  marcas: Marca[] | null;
  setMarcas: React.Dispatch<React.SetStateAction<Marca[] | null>>;
  fetchCategoriasYMarcas: () => void;
};
// Crea el contexto
const ProductoContext = createContext<ProductoContextType | undefined>(
  undefined,
);

// Hook para usar el contexto
export const useProductoContext = (): ProductoContextType => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error(
      'useProductoContext must be used within a ProductoProvider',
    );
  }
  return context;
};

// Proveedor del contexto del producto
export const ProductoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const token = localStorage.getItem('token');
  const [categorias, setCategorias] = useState<Categoria[] | null>([]);
  const [marcas, setMarcas] = useState<Marca[] | null>([]);

  const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;

  // Función para obtener las categorías y marcas
  const fetchCategoriasYMarcas = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };
      console.log(token)
      // Solicitud para obtener las categorías
      const categoriasResponse = await axios.get(`${BASE_URL}detalles/categoria/all`, {
        headers,
      });
      console.log(categoriasResponse);
      setCategorias(categoriasResponse.data.data);

      // Solicitud para obtener las marcas
      const marcasResponse = await axios.get(`${BASE_URL}detalles/marca/all`, {
        headers,
      });
      setMarcas(marcasResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategoriasYMarcas();
    }
  }, [token]);

  return (
    <ProductoContext.Provider
      value={{ token, categorias,
        setCategorias,
         marcas,setMarcas, fetchCategoriasYMarcas }}
    >
      {children}
    </ProductoContext.Provider>
  );
};

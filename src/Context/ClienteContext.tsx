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
import { Catalogo } from '../types/Catalogo';
import { Producto } from '../types/producto';

// Define el tipo para el contexto del producto
type ClienteContextType = {
  categorias: Categoria[] | null;
  marcas: Marca[] | null;
  fetchCategoriasYMarcas: () => void;
  catalogos: Catalogo[] | null;
  fetchCatalogos: () => void;
  productos: Producto[] | null;
  fetchProductos: () => void;
};
// Crea el contexto
const ClienteContext = createContext<ClienteContextType | undefined>(
  undefined,
);

// Hook para usar el contexto
export const useClienteContext = (): ClienteContextType => {
  const context = useContext(ClienteContext);
  if (!context) {
    throw new Error(
      'useProductoContext must be used within a ProductoProvider',
    );
  }
  return context;
};

// Proveedor del contexto del producto
export const ClienteProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categorias, setCategorias] = useState<Categoria[] | null>([]);
  const [marcas, setMarcas] = useState<Marca[] | null>([]);
  const [catalogos, setCatalogos] = useState<Catalogo[] | null>([]);
  const [productos,setProductos] = useState<Producto[] | null>([]);
  const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;

  // Función para obtener las categorías y marcas
  const fetchCategoriasYMarcas = async () => {
    try {
    
      // Solicitud para obtener las categorías
      const categoriasResponse = await axios.get(
        `${BASE_URL}detalles/categoria/cliente`,
       
      );
      setCategorias(categoriasResponse.data.data);

      // Solicitud para obtener las marcas
      const marcasResponse = await axios.get(`${BASE_URL}detalles/marca/cliente`, {
      
      });
      setMarcas(marcasResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchCatalogos = async () => {
    try {
     
      // Solicitud para obtener los catalogos
      const catalogosResponse = await axios.get(`${BASE_URL}catalogo/cliente`, {
       
      });
      setCatalogos(catalogosResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchProductos= async()=>{
    try {
      const headers= {
        'Content-Type': 'application/json',
      };
      // Solicitud para obtener los productos
      const productosResponse = await axios.get(`${BASE_URL}producto/cliente`, {
        headers,
      });
      console.log(productosResponse.data.data)
      setProductos(productosResponse.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
  
      fetchCategoriasYMarcas();
      fetchCatalogos()
       fetchProductos();
    
  }, []);

  return (
    <ClienteContext.Provider
      value={{
        categorias,
        marcas,
        fetchCategoriasYMarcas,
        catalogos,
        fetchCatalogos,
        productos,
        fetchProductos
      }}
    >
      {children}
    </ClienteContext.Provider>
  );
};

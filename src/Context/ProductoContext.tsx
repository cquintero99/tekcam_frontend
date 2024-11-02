import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define el tipo para el contexto del usuario
type ProductoContextType = {
  token: string | null;
};

// Crea el contexto y define el tipo que puede ser UserContextType o undefined
const ProductoContext = createContext<ProductoContextType | undefined>(undefined);

// Hook para usar el contexto
export const useProductoContext = (): ProductoContextType => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Proveedor del contexto del usuario
export const ProductoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  
  return (
    <ProductoContext.Provider value={{ token,  }}>
      {children}
    </ProductoContext.Provider>
  );
};

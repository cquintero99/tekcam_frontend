import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Define el tipo para el contexto del usuario
type UserContextType = {
  token: string | null;
  modulo: string | null;
  user: any; // Cambia 'any' por un tipo específico si sabes la estructura de 'user'
};

// Crea el contexto y define el tipo que puede ser UserContextType o undefined
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook para usar el contexto
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// Proveedor del contexto del usuario
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [modulo, setModulo] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Supone que el token se almacena en localStorage
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      parseToken(storedToken);
    }
  }, []);

  const parseToken = (token: string) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log(payload);
      setModulo(payload?.rol?.nombre?.toLowerCase());
      setUser(payload);
    } catch (error) {
      console.error('Failed to parse token:', error);
    }
  };

  return (
    <UserContext.Provider value={{ token, modulo, user }}>
      {children}
    </UserContext.Provider>
  );
};

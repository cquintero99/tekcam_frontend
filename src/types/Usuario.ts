import { Rol } from "./Rol";

export interface Usuario {
    id?: number;
    nombre: string;
    apellido: string;
    email: string;
    celular: string;
    password: string;
    cedula: string;
    rol: Rol;
  }
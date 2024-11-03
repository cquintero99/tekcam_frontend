import React, { useState } from 'react';
import axios from 'axios';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
import { useUserContext } from '../../../Context/UserContext';
import { useUsuariosContext } from '../../../Context/UsuariosContext';

const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;
const token = localStorage.getItem('token');

type FormData = {
  nombre: string;
  email: string;
  cedula: string;
  celular: string;
  direccion: string;
  password: string;
  rolId: string;
};

const RegistrarUsuario: React.FC = () => {
  const { roles, fetchUsuarios } = useUsuariosContext();
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    cedula: '',
    celular: '',
    direccion: '',
    password: '',
    rolId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${BASE_URL}/usuario/save`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Usuario registrado:', response.data);
      fetchUsuarios();
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Registrar Usuario" lastPage="usuarios" />
      <div className="w-full max-w-5xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
              <label className="block text-sm font-medium mb-1">Rol</label>
              <select
                name="rolId"
                value={formData.rolId}
                onChange={handleChange}
                className="w-full rounded border p-2"
                required
              >
                <option value="">Seleccione un rol</option>
                {roles?.map((rol) => (
                  <option key={rol.id} value={rol.id}>
                    {rol.nombre}
                  </option>
                ))}
              </select>
            </div>
            {[
              { label: 'Nombre', name: 'nombre', type: 'text' },
              { label: 'Email', name: 'email', type: 'email' },
              { label: 'Cédula', name: 'cedula', type: 'text' },
              { label: 'Celular', name: 'celular', type: 'text' },
              { label: 'Dirección', name: 'direccion', type: 'text' },
              { label: 'Password', name: 'password', type: 'password' },
            ].map(({ label, name, type }) => (
              <div key={name} className="w-full">
                <label className="block text-sm font-medium mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name as keyof FormData]}
                  onChange={handleChange}
                  className="w-full rounded border p-2"
                  required
                />
              </div>
            ))}
          
          </div>
          <div className="flex items-center gap-2 mt-4">
            <button
              type="submit"
              className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrarUsuario;

import React, { useState } from 'react';
import * as Dialog from "@radix-ui/react-dialog";
import { Categoria } from '../../types/Categoria';
import { SubCategoria } from '../../types/SubCategoria';
import { Marca } from '../../types/Marca';

const ECommerce = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [marcas, setMarcas] = useState<Marca[]>([]);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [entityType, setEntityType] = useState<string>('');

  const [nombre, setNombre] = useState<string>('');
  const [imagen, setImagen] = useState<File | null>(null); // Actualizamos a tipo File para recibir una imagen
  const [categoriaId, setCategoriaId] = useState<number | undefined>();

  const handleOpenModal = (type: string) => {
    setEntityType(type);
    setModalOpen(true);
    setNombre('');
    setImagen(null); // Reiniciamos el archivo de imagen
    setCategoriaId(undefined);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]); // Guardamos el archivo en el estado
    }
  };

  const handleGuardarEntidad = () => {
    if (entityType === 'categoria') {
      const nuevaCategoria: Categoria = { nombre,  }; // Guardamos la imagen como File
      setCategorias([...categorias, nuevaCategoria]);
    } else if (entityType === 'subCategoria') {
      const categoria = categorias.find((cat) => cat.id === categoriaId);
      if (categoria) {
        const nuevaSubCategoria: SubCategoria = { nombre, categoria };
        setSubCategorias([...subCategorias, nuevaSubCategoria]);
      }
    } else if (entityType === 'marca') {
      const nuevaMarca: Marca = { nombre };
      setMarcas([...marcas, nuevaMarca]);
    }
    setModalOpen(false);
  };

  return (
    <div className="ecommerce-container p-6">
      <h2 className="text-2xl font-bold mb-4">E-Commerce Management</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Entidades</h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleOpenModal('categoria')}
            className="rounded bg-primary p-3 text-white"
          >
            Registrar Categoría
          </button>
          <button
            onClick={() => handleOpenModal('subCategoria')}
            className="rounded bg-primary p-3 text-white"
          >
            Registrar SubCategoría
          </button>
          <button
            onClick={() => handleOpenModal('marca')}
            className="rounded bg-primary p-3 text-white"
          >
            Registrar Marca
          </button>
        </div>
      </div>

      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            <div className="bg-white rounded-md shadow-lg px-4 py-6">
              <Dialog.Title className="text-lg font-medium text-gray-800 text-center mb-4">
                {entityType === 'categoria' && 'Registrar Categoría'}
                {entityType === 'subCategoria' && 'Registrar SubCategoría'}
                {entityType === 'marca' && 'Registrar Marca'}
              </Dialog.Title>

              <div className="space-y-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Nombre</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full rounded border p-2"
                  />
                </div>

                {entityType === 'categoria' && (
                  <div className="mb-4">
                    <label className="mb-3 block text-black dark:text-white">
                      Agregar Imagen
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange} // Manejador del cambio de imagen
                      className="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                    />
                  </div>
                )}

                {entityType === 'subCategoria' && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Categoría</label>
                    <select
                      value={categoriaId}
                      onChange={(e) => setCategoriaId(parseInt(e.target.value))}
                      className="w-full rounded border p-2"
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Dialog.Close asChild>
                  <button className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border outline-none ring-offset-2 ring-indigo-600 focus:ring-2">
                    Cancelar
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleGuardarEntidad}
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                >
                  Guardar
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Lista de Categorías</h3>
        <ul>
          {categorias.map((categoria, index) => (
            <li key={index} className="mb-1">
              {categoria.nombre} - {categoria.imagen ? categoria?.imagen : 'Sin Imagen'}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Lista de SubCategorías</h3>
        <ul>
          {subCategorias.map((subCategoria, index) => (
            <li key={index} className="mb-1">
              {subCategoria.nombre} - Categoría: {subCategoria.categoria.nombre}
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Lista de Marcas</h3>
        <ul>
          {marcas.map((marca, index) => (
            <li key={index} className="mb-1">
              {marca.nombre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ECommerce;

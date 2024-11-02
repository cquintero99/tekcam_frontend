import React, { useEffect, useState } from 'react';
import { useProductoContext } from '../../Context/ProductoContext';
import { Categoria } from '../../types/Categoria';
import * as Dialog from '@radix-ui/react-dialog';
import { FaEdit } from "react-icons/fa";

const CategoriasList = () => {
  const { categorias, marcas } = useProductoContext();
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [entityType, setEntityType] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoriaId, setCategoriaId] = useState<number | null>(null);

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setSelectedCategoria(categorias[0]); // Selecciona la primera categoría por defecto
    }
  }, [categorias]);

  const handleCategoriaClick = (categoria: Categoria) => {
    setSelectedCategoria(categoria);
  };

  const handleEditClick = (type: string, entity: any) => {
    setEntityType(type);
    setNombre(entity.nombre);
    setCategoriaId(entity.id);
    setModalOpen(true);
  };

  const handleGuardarEntidad = () => {
    // Lógica para guardar cambios en la entidad
    console.log(`Guardando ${entityType}:`, { nombre, categoriaId });
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col space-y-8 w-full">
      {/* Fila de categorías */}
      <div className="flex flex-wrap justify-center space-x-4 overflow-x-auto p-4 w-full border-b border-gray-300">
        {categorias?.map((categoria) => (
          <div key={categoria.id} className="flex flex-col items-center cursor-pointer">
            <div className="relative">
              <img
                src={categoria.imagen}
                alt={categoria.nombre}
                className={`w-16 h-16 rounded-full object-cover ${
                  selectedCategoria?.id === categoria.id ? 'border-4 border-blue-500' : ''
                }`}
                onClick={() => handleCategoriaClick(categoria)}
              />
              <FaEdit
                onClick={() => handleEditClick('categoria', categoria)}
                className="w-5 h-5 absolute top-0 right-0 text-gray-500 cursor-pointer"
              />
            </div>
            <p className="text-center mt-2 text-sm font-medium">{categoria.nombre}</p>
          </div>
        ))}
      </div>

      {/* Fila de tablas para subcategorías y marcas */}
      <div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-8 mt-4">
        {/* Tabla de subcategorías */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Subcategorías de {selectedCategoria?.nombre || ''}
            </h3>
          </div>
          <div className="p-7">
            {selectedCategoria && selectedCategoria.subCategorias ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2 dark:border-strokedark">ID</th>
                    <th className="border-b p-2 dark:border-strokedark">Nombre</th>
                    <th className="border-b p-2 dark:border-strokedark">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCategoria.subCategorias.map((subcategoria) => (
                    <tr key={subcategoria.id}>
                      <td className="border-b p-2 dark:border-strokedark">{subcategoria.id}</td>
                      <td className="border-b p-2 dark:border-strokedark">{subcategoria.nombre}</td>
                      <td className="border-b p-2 dark:border-strokedark">
                        <FaEdit
                          onClick={() => handleEditClick('subCategoria', subcategoria)}
                          className="w-5 h-5 text-gray-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay subcategorías disponibles.</p>
            )}
          </div>
        </div>

        {/* Tabla de marcas */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">Marcas</h3>
          </div>
          <div className="p-7">
            {marcas && marcas.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2 dark:border-strokedark">ID</th>
                    <th className="border-b p-2 dark:border-strokedark">Nombre</th>
                    <th className="border-b p-2 dark:border-strokedark">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {marcas.map((marca) => (
                    <tr key={marca.id}>
                      <td className="border-b p-2 dark:border-strokedark">{marca.id}</td>
                      <td className="border-b p-2 dark:border-strokedark">{marca.nombre}</td>
                      <td className="border-b p-2 dark:border-strokedark">
                        <FaEdit
                          onClick={() => handleEditClick('marca', marca)}
                          className="w-5 h-5 text-gray-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No hay marcas disponibles.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal para editar entidades */}
      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
          <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            <div className="bg-white rounded-md shadow-lg px-4 py-6">
              <Dialog.Title className="text-lg font-medium text-gray-800 text-center mb-4">
                {entityType === 'categoria' && 'Editar Categoría'}
                {entityType === 'subCategoria' && 'Editar SubCategoría'}
                {entityType === 'marca' && 'Editar Marca'}
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
                    <label className="mb-3 block text-black">Agregar Imagen</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => console.log('Nueva imagen seleccionada')}
                      className="w-full rounded-md border border-stroke p-3 outline-none"
                    />
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Dialog.Close asChild>
                  <button className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md border">
                    Cancelar
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleGuardarEntidad}
                  className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default CategoriasList;

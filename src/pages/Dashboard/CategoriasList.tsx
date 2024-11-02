import React, { useEffect, useState } from 'react';
import { useProductoContext } from '../../Context/ProductoContext';
import { Categoria } from '../../types/Categoria';

const CategoriasList = () => {
  const { categorias, marcas } = useProductoContext();
  const [selectedCategoria, setSelectedCategoria] = useState<Categoria | null>(
    null,
  );

  useEffect(() => {
    if (categorias && categorias.length > 0) {
      setSelectedCategoria(categorias[0]); // Selecciona la primera categoría por defecto
    }
  }, [categorias]);

  const handleCategoriaClick = (categoria: Categoria) => {
    setSelectedCategoria(categoria); // Actualiza la categoría seleccionada
  };

  return (
    <div className="flex flex-col space-y-8 w-full">
      {/* Fila de categorías */}
      <div className="flex flex-wrap justify-center space-x-4 overflow-x-auto p-4 w-full border-b border-gray-300">
        {categorias?.map((categoria) => (
          <div
            key={categoria.id}
            onClick={() => handleCategoriaClick(categoria)}
            className="flex flex-col items-center cursor-pointer"
          >
            <img
              src={categoria.imagen}
              alt={categoria.nombre}
              className={`w-16 h-16 rounded-full object-cover ${
                selectedCategoria?.id === categoria.id
                  ? 'border-4 border-blue-500'
                  : ''
              }`}
            />
            <p className="text-center mt-2 text-sm font-medium">
              {categoria.nombre}
            </p>
          </div>
        ))}
      </div>

      {/* Fila de tablas para subcategorías y marcas */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
        
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
                  </tr>
                </thead>
                <tbody>
                  {selectedCategoria.subCategorias.map((subcategoria) => (
                    <tr key={subcategoria.id}>
                      <td className="border-b p-2 dark:border-strokedark">{subcategoria.id}</td>
                      <td className="border-b p-2 dark:border-strokedark">{subcategoria.nombre}</td>
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
                  </tr>
                </thead>
                <tbody>
                  {marcas.map((marca) => (
                    <tr key={marca.id}>
                      <td className="border-b p-2 dark:border-strokedark">{marca.id}</td>
                      <td className="border-b p-2 dark:border-strokedark">{marca.nombre}</td>
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
    </div>
  );
};

export default CategoriasList;

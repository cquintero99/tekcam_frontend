import React, { useState, useMemo, useCallback } from "react";
import { useClienteContext } from "../../../Context/ClienteContext";
import { motion } from "framer-motion";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SidebarLinkGroup from "../../../components/Sidebar/SidebarLinkGroup";

const Productos: React.FC = () => {
  const { productos, categorias, marcas } = useClienteContext();

  // Estados para los filtros
  const [selectedCategoria, setSelectedCategoria] = useState<number | null>(null);
  const [selectedSubCategoria, setSelectedSubCategoria] = useState<number | null>(null);
  const [selectedMarca, setSelectedMarca] = useState<number | null>(null);

  // Productos filtrados usando useMemo para evitar cálculos innecesarios
  const filteredProductos = useMemo(() => {
    return productos?.filter((producto) => {
      const matchCategoria = selectedCategoria ? producto.subCategoria.categoria.id === selectedCategoria : true;
      const matchSubCategoria = selectedSubCategoria ? producto.subCategoria.id === selectedSubCategoria : true;
      const matchMarca = selectedMarca ? producto.marca.id === selectedMarca : true;
      return matchCategoria && matchSubCategoria && matchMarca;
    });
  }, [productos, selectedCategoria, selectedSubCategoria, selectedMarca]);

  // Funciones para actualizar los filtros
  const handleCategoriaChange = useCallback((categoriaId: number | null) => {
    setSelectedCategoria(categoriaId);
    setSelectedSubCategoria(null); // Reiniciar subcategoría al cambiar categoría
  }, []);

  const handleSubCategoriaChange = useCallback((subCategoriaId: number | null) => {
    setSelectedSubCategoria(subCategoriaId);
  }, []);

  const handleMarcaChange = useCallback((marcaId: number | null) => {
    setSelectedMarca(marcaId);
  }, []);

  const handleLimpiarFiltros = useCallback(() => {
    setSelectedCategoria(null);
    setSelectedSubCategoria(null);
    setSelectedMarca(null);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
        {/* Filtros (25% del ancho) */}
        <div className="w-full md:w-1/4 mr-3">
          <div className="space-y-6 bg-white p-4 rounded-lg shadow-md">
            {/* Filtro de Categoría */}
            <SidebarLinkGroup activeCondition={false}>
              {(handleClick, open) => (
                <>
                  <div
                    onClick={handleClick}
                    className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-200"
                  >
                    <span className="font-semibold text-gray-800">Categoría</span>
                    <svg
                      className={`transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className={`${!open && "hidden"} mt-2`}>
                    <ul className="space-y-2 pl-0 list-none">
                      <li className="cursor-pointer text-gray-700 hover:text-indigo-600" onClick={() => handleCategoriaChange(null)}>
                        Todas las categorías
                      </li>
                      {categorias?.map((categoria) => (
                        <li
                          key={categoria.id}
                          className={`cursor-pointer text-gray-700 hover:text-indigo-600 ${
                            selectedCategoria === categoria.id ? "text-indigo-600 font-semibold" : ""
                          }`}
                          onClick={() => handleCategoriaChange(categoria.id ?? null)}
                        >
                          {categoria.nombre}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </SidebarLinkGroup>

            {/* Filtro de Subcategoría */}
            {selectedCategoria && (
              <SidebarLinkGroup activeCondition={false}>
                {(handleClick, open) => (
                  <>
                    <div
                      onClick={handleClick}
                      className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-200"
                    >
                      <span className="font-semibold text-gray-800">Subcategoría</span>
                      <svg
                        className={`transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className={`${!open && "hidden"} mt-2`}>
                      <ul className="space-y-2 pl-0 list-none">
                        <li className="cursor-pointer text-gray-700 hover:text-indigo-600" onClick={() => handleSubCategoriaChange(null)}>
                          Todas las subcategorías
                        </li>
                        {categorias
                          ?.find((cat) => cat.id === selectedCategoria)
                          ?.subCategorias?.map((subCat) => (
                            <li
                              key={subCat.id}
                              className={`cursor-pointer text-gray-700 hover:text-indigo-600 ${
                                selectedSubCategoria === subCat.id ? "text-indigo-600 font-semibold" : ""
                              }`}
                              onClick={() => handleSubCategoriaChange(subCat.id ?? null)}
                            >
                              {subCat.nombre}
                            </li>
                          ))}
                      </ul>
                    </div>
                  </>
                )}
              </SidebarLinkGroup>
            )}

            {/* Filtro de Marca */}
            <SidebarLinkGroup activeCondition={false}>
              {(handleClick, open) => (
                <>
                  <div
                    onClick={handleClick}
                    className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-200"
                  >
                    <span className="font-semibold text-gray-800">Marca</span>
                    <svg
                      className={`transform transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className={`${!open && "hidden"} mt-2`}>
                    <ul className="space-y-2 pl-0 list-none">
                      <li className="cursor-pointer text-gray-700 hover:text-indigo-600" onClick={() => handleMarcaChange(null)}>
                        Todas las marcas
                      </li>
                      {marcas?.map((marca) => (
                        <li
                          key={marca.id}
                          className={`cursor-pointer text-gray-700 hover:text-indigo-600 ${
                            selectedMarca === marca.id ? "text-indigo-600 font-semibold" : ""
                          }`}
                          onClick={() => handleMarcaChange(marca.id ?? null)}
                        >
                          {marca.nombre}
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </SidebarLinkGroup>

            {/* Botón para limpiar filtros */}
            <button
              onClick={handleLimpiarFiltros}
              className="mt-4 w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
        {/* Productos (75% del ancho) */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {filteredProductos?.map((producto, index) => (
              <motion.div
                key={producto.id}
                className="relative overflow-hidden rounded-lg shadow-lg"
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                {producto.imagenes?.length > 0 ? (
                  <Carousel showThumbs={false} autoPlay infiniteLoop className="rounded-lg">
                    {producto.imagenes.map((imagen, idx) => (
                      <div key={idx}>
                        <img
                          src={imagen.imagen}
                          alt={`${producto.nombre} - ${idx + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    ))}
                  </Carousel>
                ) : (
                  <img
                    src="/placeholder.jpg"
                    alt={producto.nombre}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
                <div className="p-4">
                  <h3 className="mb-2 text-lg font-semibold">{producto.nombre}</h3>
                  <p className="mb-2 text-gray-600">{producto.marca.nombre}</p>
                  <p className="mb-2 text-gray-800">${producto.precioVenta}</p>
                  <button className="mt-2 w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700">
                    Ver Producto
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productos;

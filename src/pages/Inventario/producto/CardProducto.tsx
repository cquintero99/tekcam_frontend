import React from 'react';
import { useProductoContext } from '../../../Context/ProductoContext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { FaInfoCircle, FaEdit } from 'react-icons/fa';
import { useUserContext } from '../../../Context/UserContext';
import { Link } from 'react-router-dom';

const CardProducto = () => {
  const { productos } = useProductoContext();
  const { modulo } = useUserContext();

  return (
    <div className="flex flex-col md:flex-row md:flex-wrap gap-4 ">
      {productos &&
        productos.map((item, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 w-full md:w-1/3 lg:w-1/4 shadow-md"
          >
            <div className="flex justify-end items-center ">
              <Link
                to={`/${modulo}/inventario/${item.id}/informacion`}
                className="text-blue-500 hover:text-blue-700"
              >
                <FaInfoCircle size={20} />
              </Link>
              <Link
                to={`/${modulo}/inventario/${item.id}/editar`}
                className="text-orange-500 hover:text-orange-700 ml-4"
              >
                <FaEdit size={20} />
              </Link>
            </div>
            <Carousel
              showThumbs={false}
              
              infiniteLoop
              className="w-full h-36"
            >
              {item.imagenes.map((imagen, idx) => (
                <div key={idx}>
                  <img
                    src={imagen.imagen}
                    alt={`${item.nombre} - ${idx + 1}`}
                    className="w-full h-36 object-cover rounded-md"
                  />
                </div>
              ))}
            </Carousel>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">
                {item.nombre.length > 15
                  ? item.nombre.slice(0, 15) + '...'
                  : item.nombre}
              </h3>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Marca:</p>
                <p className="text-sm text-gray-600">{item.marca.nombre}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Stock:</p>
                <strong className="text-sm text-gray-600">{item.stock}</strong>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Precio de compra:</p>
                <p className="text-sm text-gray-600">${item.precioCompra}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Precio de venta:</p>
                <p className="text-sm text-gray-600">${item.precioVenta}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">Visible:</p>
                <p className="text-sm text-gray-600">{item.visible ? 'Sí' : 'No'}</p> 
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default CardProducto;

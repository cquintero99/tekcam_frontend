
import { useProductoContext } from '../../../Context/ProductoContext';

const CardProducto = () => {
    const { productos } = useProductoContext();

    return (
        <div className="flex flex-wrap gap-4">
            {productos && productos?.map((item) => (
                <div key={item.nombre} className="border border-gray-300 rounded-lg p-4 w-52 shadow-md">
                    <img src={item.imagenes[0]?.imagen} alt={item.nombre} className="w-full h-36 object-cover rounded-md" />
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">{item.nombre.length > 20 ? item.nombre.slice(0, 20) + '...' : item.nombre}</h3>
                        <p className="text-sm text-gray-600">Marca: {item.marca.nombre}</p>
                        <p className="text-sm text-gray-600">Precio: ${item.precioVenta}</p>
                        <p className="text-sm text-gray-600">Stock: {item.stock}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardProducto;

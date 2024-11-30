import * as Dialog from '@radix-ui/react-dialog'; 
import { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import clsx from 'clsx';

interface EstadoPedidoModalProps {
  estadosPosibles: string[];
  estadoActual: string;
  onActualizarEstado: (data: {
    estadoActual:string,
    estado: string;
    guia?: string;
    paginaSeguimiento?: string;
    descripcion: string;
  }) => void;
}

const EstadoPedidoModal: React.FC<EstadoPedidoModalProps> = ({
  estadosPosibles,
  estadoActual,
  onActualizarEstado,
}) => {
  const [estadoSeleccionado, setEstadoSeleccionado] =
    useState<string>(estadoActual);
  const [guia, setGuia] = useState<string>('');
  const [paginaSeguimiento, setPaginaSeguimiento] = useState<string>('');
  const [descripcion, setDescripcion] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleActualizarEstado = () => {
    if (estadoSeleccionado === 'ENVIADO' && (!guia || !paginaSeguimiento)) {
      setError(
        'Los campos "Guía" y "Página de seguimiento" son obligatorios para el estado "Enviado".',
      );
      return;
    }
    if (!descripcion) {
      setError('El campo "Descripción" es obligatorio.');
      return;
    }
    setError('');
    onActualizarEstado({estadoActual:estadoActual, estado: estadosSiguientes()[0], guia, paginaSeguimiento, descripcion });
    setIsModalOpen(false); // Close the modal after updating the state
  };

  const estadosSiguientes = () => {
    const estadosBase = ['RECIBIDO', 'PREPARACION', 'ENVIADO', 'ENTREGADO'];
    const indexActual = estadosBase.indexOf(estadoActual);
    if (indexActual >= 0 && indexActual < estadosBase.length - 1) {
      return [estadosBase[indexActual + 1]];
    }
    return [];
  };

  return (
    <Dialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
      <Dialog.Trigger asChild>
        <button className="btn btn-primary underline font-bold">
          Actualizar Estado
        </button>
      </Dialog.Trigger>
      <Dialog.Overlay className="fixed inset-0 bg-black/30" />
      <Dialog.Content
        className={clsx(
          'fixed p-6 bg-white rounded-lg shadow-md',
          'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          'w-full max-w-md',
        )}
      >
        <div className="flex justify-between items-center mb-4">
          <Dialog.Title className="text-lg font-bold">
            Actualizar Estado del Pedido
          </Dialog.Title>
          <Dialog.Close className="text-gray-500 hover:text-gray-800">
            <AiOutlineClose className="w-5 h-5" />
          </Dialog.Close>
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Próximo Estado</label>
          <select
            value={estadoSeleccionado}
            onChange={(e) => setEstadoSeleccionado(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {estadosSiguientes().map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
        </div>
        {estadoSeleccionado === 'ENVIADO' && (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Guía</label>
              <input
                type="text"
                value={guia}
                onChange={(e) => setGuia(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">
                Página de Seguimiento
              </label>
              <input
                type="text"
                value={paginaSeguimiento}
                onChange={(e) => setPaginaSeguimiento(e.target.value)}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </>
        )}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="flex justify-end gap-2">
          <Dialog.Close asChild>
            <button className="btn btn-secondary">Cancelar</button>
          </Dialog.Close>
          <button onClick={handleActualizarEstado} className="btn btn-primary">
            Actualizar
          </button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default EstadoPedidoModal;

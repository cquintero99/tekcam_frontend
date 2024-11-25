import React, { useState,} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import Loader from "../../common/Loader";
import { useUsuariosContext } from "../../Context/UsuariosContext";



const Preguntas: React.FC = () => {
  const { preguntas, fetchPreguntas } = useUsuariosContext();
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const [loading, setLoading] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentPregunta, setCurrentPregunta] = useState<Pregunta>({
    pregunta: "",
    respuesta: "",
    visible: false,
  });

  const BASE_URL = import.meta.env.VITE_URL_BACKEND_LOCAL;



  // Guardar o actualizar pregunta
  const handleSavePregunta = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentPregunta.id) {
        // Actualizar pregunta
        console.log(currentPregunta);
        const response = await axios.put(`${BASE_URL}pregunta/update`, currentPregunta,{
          headers,
        });
        console.log(response);
      } else {
        // Crear nueva pregunta
        const response = await axios.post(`${BASE_URL}pregunta/save`, currentPregunta,{
          headers,
        });
        console.log(response);
      
      }
      fetchPreguntas();
      setModalOpen(false);
    } catch (error) {
      console.error("Error al guardar la pregunta:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPregunta = (pregunta: Pregunta) => {
    setCurrentPregunta(pregunta);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto">
      {loading && <Loader />}

      <div className="mb-4">
        <button
          onClick={() => {
            setCurrentPregunta({
              pregunta: "",
              respuesta: "",
              visible: false,
            });
            setModalOpen(true);
          }}
          className="rounded bg-primary p-3 text-white"
        >
          Agregar Pregunta
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-6 py-2 border">Pregunta</th>
            <th className="px-6 py-2 border">Respuesta</th>
            <th className="px-6 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {preguntas?.map((pregunta) => (
            <tr key={pregunta.id}>
              <td className="px-6 py-2 border">{pregunta.pregunta}</td>
              <td className="px-6 py-2 border">{pregunta.respuesta}</td>
            
              <td className="px-6 py-2 border">
                <button
                  onClick={() => handleEditPregunta(pregunta)}
                  className="mr-2 text-blue-600"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog.Root open={modalOpen} onOpenChange={setModalOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50 w-full h-full" />
          <Dialog.Content className="fixed  top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
            <form onSubmit={handleSavePregunta} className="bg-white rounded-md shadow-lg px-4 py-6">
              <h2 className="text-lg mb-4">
                {currentPregunta?.id ? "Editar Pregunta" : "Nueva Pregunta"}
              </h2>
              <div className="mb-4">
                <label className="block mb-1">Pregunta</label>
                <textarea
                  value={currentPregunta?.pregunta || ""}
                  onChange={(e) =>
                    setCurrentPregunta({
                      ...currentPregunta,
                      pregunta: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Respuesta</label>
                <textarea
                  value={currentPregunta?.respuesta || ""}
                  onChange={(e) =>
                    setCurrentPregunta({
                      ...currentPregunta,
                      respuesta: e.target.value,
                    })
                  }
                  className="w-full border rounded p-2"
                  required
                />
              </div>
            
              <button type="submit" className="bg-blue-600 text-white px-4 py-2">
                Guardar
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="ml-2 bg-gray-400 text-white px-4 py-2"
              >
                Cancelar
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Preguntas;


import Categorias from "./Inicio/Categorias/Categorias"
import Hero from "./Inicio/Hero/Hero"
import MetodosDePago from "./Inicio/MetodosPago/MetodosPago"



export default function Inicio() {
 

  return (
    <>
         <Hero/>
         <MetodosDePago/>
         <div className="flex justify-center" >
         <Categorias/>
         </div>
        
 
    </>
  )
}
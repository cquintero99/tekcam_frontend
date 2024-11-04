
import Categorias from "./Inicio/Categorias/Categorias"
import Hero from "./Inicio/Hero/Hero"



export default function Inicio() {
 

  return (
    <>
         <Hero/>
         <div className="flex justify-center" >
         <Categorias/>
         </div>
        
 
    </>
  )
}